-- LEADS & CRM SCHEMA

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  product_type TEXT NOT NULL, -- references products(slug)
  stage TEXT DEFAULT 'new' CHECK (stage IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost', 'junk')),
  lead_score INTEGER DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
  assigned_to UUID REFERENCES auth.users(id),
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  timeline TEXT,
  budget_range TEXT,
  company_name TEXT,
  source_json JSONB DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID,
  updated_by UUID,
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_leads_dedup ON leads(org_id, whatsapp, product_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_leads_crm_filter ON leads(org_id, stage, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_leads_sales_workload ON leads(assigned_to, stage) WHERE deleted_at IS NULL AND stage NOT IN ('won', 'lost', 'junk');
CREATE INDEX idx_leads_priority ON leads(org_id, lead_score DESC) WHERE deleted_at IS NULL;

CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('note', 'call', 'email', 'whatsapp', 'meeting', 'status_change', 'assignment', 'product_change', 'score_change', 'conversation_linked', 'returned_visitor')),
  title TEXT NOT NULL,
  description TEXT,
  payload_json JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_lead_activities_lead_time ON lead_activities(lead_id, created_at DESC);
CREATE INDEX idx_lead_activities_org_type ON lead_activities(org_id, type, created_at DESC);

-- FUNCTIONS

CREATE OR REPLACE FUNCTION check_lead_duplicate(
  p_org_id UUID,
  p_whatsapp TEXT,
  p_product_type TEXT
) RETURNS UUID AS $$
DECLARE
  v_lead_id UUID;
  v_dedup_days INTEGER;
BEGIN
  -- Get dedup window for product
  SELECT dedup_window_days INTO v_dedup_days
  FROM products
  WHERE org_id = p_org_id AND slug = p_product_type;
  
  -- Default to 7 days if not found
  IF v_dedup_days IS NULL THEN v_dedup_days := 7; END IF;

  -- Normalize logic should be handled by caller/app, but simple cleanup here
  -- Check for existing lead
  SELECT id INTO v_lead_id
  FROM leads
  WHERE org_id = p_org_id
    AND whatsapp = p_whatsapp -- Exact match expected on normalized number
    AND product_type = p_product_type
    AND deleted_at IS NULL
    AND created_at > (now() - (v_dedup_days || ' days')::INTERVAL);
    
  RETURN v_lead_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION calculate_lead_score(p_lead_id UUID) RETURNS INTEGER AS $$
DECLARE
  v_lead RECORD;
  v_score INTEGER := 0;
BEGIN
  SELECT * INTO v_lead FROM leads WHERE id = p_lead_id;
  IF NOT FOUND THEN RETURN 0; END IF;

  -- Base Scoring Rules
  IF v_lead.whatsapp IS NOT NULL THEN v_score := v_score + 30; END IF;
  IF v_lead.email IS NOT NULL THEN v_score := v_score + 10; END IF;
  IF v_lead.company_name IS NOT NULL THEN v_score := v_score + 15; END IF;
  IF length(COALESCE(v_lead.notes, '')) > 50 THEN v_score := v_score + 10; END IF;
  
  -- Timeline
  CASE v_lead.timeline
    WHEN 'immediate' THEN v_score := v_score + 25;
    WHEN '1-4_weeks' THEN v_score := v_score + 20;
    WHEN '1-3_months' THEN v_score := v_score + 10;
    WHEN 'exploring' THEN v_score := v_score + 5;
    ELSE NULL;
  END CASE;

  -- Product Priority
  CASE v_lead.product_type
    WHEN 'serviced_office' THEN v_score := v_score + 20;
    WHEN 'virtual_office' THEN v_score := v_score + 15;
    WHEN 'legal' THEN v_score := v_score + 15;
    WHEN 'meeting_room' THEN v_score := v_score + 10;
    ELSE NULL;
  END CASE;

  -- Cap at 100
  IF v_score > 100 THEN v_score := 100; END IF;
  
  -- Update lead
  UPDATE leads SET lead_score = v_score WHERE id = p_lead_id;
  
  RETURN v_score;
END;
$$ LANGUAGE plpgsql;

-- TRIGGERS

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Auto score on insert
CREATE OR REPLACE FUNCTION trigger_calc_score() RETURNS TRIGGER AS $$
BEGIN
  PERFORM calculate_lead_score(NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_lead_insert_score
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_calc_score();

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
