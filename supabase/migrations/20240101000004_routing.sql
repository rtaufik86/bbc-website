-- LEAD ROUTING SYSTEM

CREATE TABLE lead_routing_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  product_type TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  strategy TEXT DEFAULT 'weighted_round_robin',
  fallback_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(org_id, product_type)
);

CREATE TABLE lead_routing_weights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  product_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  weight INTEGER NOT NULL DEFAULT 1 CHECK (weight > 0),
  is_active BOOLEAN DEFAULT true,
  max_leads_per_day INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(org_id, product_type, user_id)
);

CREATE INDEX idx_routing_weights_active ON lead_routing_weights(org_id, product_type, is_active);

CREATE TABLE lead_routing_counters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  product_type TEXT NOT NULL,
  user_id UUID NOT NULL,
  current_weight INTEGER DEFAULT 0,
  total_assigned INTEGER DEFAULT 0,
  assigned_today INTEGER DEFAULT 0,
  last_assigned_at TIMESTAMP WITH TIME ZONE,
  last_reset_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(org_id, product_type, user_id)
);

-- FUNCTIONS

CREATE OR REPLACE FUNCTION assign_lead_weighted(
  p_org_id UUID,
  p_lead_id UUID,
  p_product_type TEXT
) RETURNS UUID AS $$
DECLARE
  v_selected_user_id UUID;
  v_total_weight INTEGER := 0;
  v_sales_record RECORD;
  v_lock_key TEXT;
BEGIN
  -- Simple locking mechanism using advisory locks
  v_lock_key := p_org_id::TEXT || ':' || p_product_type;
  PERFORM pg_advisory_lock(hashtext(v_lock_key));

  -- Check if routing enabled
  IF NOT EXISTS (SELECT 1 FROM lead_routing_rules WHERE org_id = p_org_id AND product_type = p_product_type AND is_enabled = true) THEN
    PERFORM pg_advisory_unlock(hashtext(v_lock_key));
    RETURN NULL;
  END IF;

  -- Ensure counters exist
  INSERT INTO lead_routing_counters (org_id, product_type, user_id, current_weight)
  SELECT p_org_id, p_product_type, user_id, 0
  FROM lead_routing_weights
  WHERE org_id = p_org_id AND product_type = p_product_type AND is_active = true
  ON CONFLICT DO NOTHING;

  -- Increment current weights
  UPDATE lead_routing_counters c
  SET current_weight = current_weight + w.weight
  FROM lead_routing_weights w
  WHERE c.org_id = p_org_id AND c.product_type = p_product_type AND c.user_id = w.user_id
  AND w.org_id = p_org_id AND w.product_type = p_product_type AND w.is_active = true
  AND (w.max_leads_per_day IS NULL OR c.assigned_today < w.max_leads_per_day);

  -- Select user with highest weight
  SELECT user_id INTO v_selected_user_id
  FROM lead_routing_counters
  WHERE org_id = p_org_id AND product_type = p_product_type
  ORDER BY current_weight DESC LIMIT 1;

  IF v_selected_user_id IS NULL THEN
    -- Fallback
    SELECT fallback_user_id INTO v_selected_user_id
    FROM lead_routing_rules
    WHERE org_id = p_org_id AND product_type = p_product_type;
    
    PERFORM pg_advisory_unlock(hashtext(v_lock_key));
    
    IF v_selected_user_id IS NOT NULL THEN
       -- Assign fallback without adjusting counters
       UPDATE leads SET assigned_to = v_selected_user_id, updated_at = now() WHERE id = p_lead_id;
       RETURN v_selected_user_id;
    END IF;
    
    RETURN NULL;
  END IF;

  -- Calculate total weight to subtract
  SELECT COALESCE(SUM(weight), 0) INTO v_total_weight
  FROM lead_routing_weights
  WHERE org_id = p_org_id AND product_type = p_product_type AND is_active = true;

  -- Decrease weight for selected user
  UPDATE lead_routing_counters
  SET current_weight = current_weight - v_total_weight,
      total_assigned = total_assigned + 1,
      assigned_today = assigned_today + 1,
      last_assigned_at = now(),
      updated_at = now()
  WHERE org_id = p_org_id AND product_type = p_product_type AND user_id = v_selected_user_id;

  -- Assign lead
  UPDATE leads 
  SET assigned_to = v_selected_user_id, updated_at = now() 
  WHERE id = p_lead_id;
  
  -- Log activity
  INSERT INTO lead_activities (org_id, lead_id, type, title, payload_json, created_by)
  VALUES (p_org_id, p_lead_id, 'assignment', 'Lead assigned via weighted routing', jsonb_build_object('assigned_to', v_selected_user_id), v_selected_user_id);

  PERFORM pg_advisory_unlock(hashtext(v_lock_key));
  RETURN v_selected_user_id;
EXCEPTION WHEN OTHERS THEN
  PERFORM pg_advisory_unlock(hashtext(v_lock_key));
  RAISE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION reset_daily_assignments() RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE lead_routing_counters
  SET assigned_today = 0, last_reset_at = now()
  WHERE last_reset_at < CURRENT_DATE;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE lead_routing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_routing_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_routing_counters ENABLE ROW LEVEL SECURITY;
