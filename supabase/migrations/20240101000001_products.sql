CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  dedup_window_days INTEGER NOT NULL DEFAULT 7,
  pricing_tiers_json JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(org_id, slug)
);

CREATE UNIQUE INDEX idx_products_org_slug_unique 
ON products(org_id, slug) 
WHERE deleted_at IS NULL;

CREATE INDEX idx_products_org_active_order 
ON products(org_id, is_active, display_order);

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Seed Data for BBC Bintaro
DO $$
DECLARE
  v_org_id UUID;
BEGIN
  SELECT id INTO v_org_id FROM organizations WHERE slug = 'bbc-bintaro' LIMIT 1;

  IF v_org_id IS NOT NULL THEN
    INSERT INTO products (org_id, name, slug, dedup_window_days, pricing_tiers_json, display_order) VALUES
    (
      v_org_id, 
      'Serviced Office', 
      'serviced_office', 
      14,
      '[{"duration": "1_month", "price": 3000000}, {"duration": "3_months", "price": 8500000}, {"duration": "6_months", "price": 16000000}, {"duration": "12_months", "price": 30000000}]'::jsonb,
      1
    ),
    (
      v_org_id, 
      'Virtual Office', 
      'virtual_office', 
      7,
      '[{"duration": "1_month", "price": 500000}, {"duration": "3_months", "price": 1400000}, {"duration": "6_months", "price": 2700000}, {"duration": "12_months", "price": 5000000}]'::jsonb,
      2
    ),
    (
      v_org_id, 
      'Meeting Room', 
      'meeting_room', 
      3,
      '[{"duration": "hourly", "price": 150000}, {"duration": "half_day", "price": 500000}, {"duration": "full_day", "price": 900000}]'::jsonb,
      3
    ),
    (
      v_org_id, 
      'Legal Services', 
      'legal', 
      30,
      '[{"duration": "pt_setup", "price": 5000000}, {"duration": "cv_setup", "price": 3000000}, {"duration": "domicile", "price": 500000}]'::jsonb,
      4
    );
  END IF;
END $$;
