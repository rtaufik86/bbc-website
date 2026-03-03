-- CHECK PRODUCTS & RLS

-- 1. Check if ANY products exist for this org
SELECT id, name, org_id FROM products;

-- 2. If products exist, check if the current user can see them (simulated)
-- (We cannot simulate auth.uid() easily here, but we can check policies)
-- Check if policy exists
SELECT * FROM pg_policies WHERE tablename = 'products';

-- 3. If NO products exist, insert Seed Data
INSERT INTO products (org_id, name, slug, description, pricing_tiers_json, display_order)
SELECT 
  id as org_id,
  'Serviced Office',
  'serviced_office',
  'Fully furnished private offices',
  '[{"duration": "1_month", "price": 3000000}, {"duration": "12_months", "price": 30000000}]'::jsonb,
  1
FROM organizations WHERE slug = 'bbc-bintaro'
ON CONFLICT (org_id, slug) DO NOTHING;

-- Insert Virtual Office
INSERT INTO products (org_id, name, slug, description, pricing_tiers_json, display_order)
SELECT 
  id as org_id,
  'Virtual Office',
  'virtual_office',
  'Prestigious business address & mail handling',
  '[{"duration": "12_months", "price": 5000000}]'::jsonb,
  2
FROM organizations WHERE slug = 'bbc-bintaro'
ON CONFLICT (org_id, slug) DO NOTHING;

-- Insert Meeting Room
INSERT INTO products (org_id, name, slug, description, pricing_tiers_json, display_order)
SELECT 
  id as org_id,
  'Meeting Room',
  'meeting_room',
  'Professional meeting spaces',
  '[{"duration": "hourly", "price": 150000}]'::jsonb,
  3
FROM organizations WHERE slug = 'bbc-bintaro'
ON CONFLICT (org_id, slug) DO NOTHING;

-- 4. FIX RLS if missing (Allow authenticated users to view products of their org)
DROP POLICY IF EXISTS "org_members_view_products" ON products;
CREATE POLICY "org_members_view_products" ON products
FOR SELECT USING (
  org_id IN (
    SELECT org_id FROM org_members WHERE user_id = auth.uid()
  )
);

-- Also allow public to view active products (for Landing Page)
DROP POLICY IF EXISTS "public_view_active_products" ON products;
CREATE POLICY "public_view_active_products" ON products
FOR SELECT USING (
  is_active = true
);

GRANT SELECT ON products TO authenticated, anon;
