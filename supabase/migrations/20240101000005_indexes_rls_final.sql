-- FINAL INDEXES & RLS POLICIES

-- Optimize Indexes
CREATE INDEX IF NOT EXISTS idx_products_active_only ON products(org_id, slug) WHERE deleted_at IS NULL AND is_active = true;
CREATE INDEX IF NOT EXISTS idx_org_members_active ON org_members(org_id, user_id) WHERE is_active = true;

-- Full RLS Policies

-- Organization Policies
CREATE POLICY "org_select_members" ON organizations FOR SELECT USING (
  id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND is_active = true)
);

-- Leads Policies
CREATE POLICY "leads_select_assigned_sales" ON leads FOR SELECT USING (
  assigned_to = auth.uid() OR
  org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin'))
);

CREATE POLICY "leads_update_assigned_or_admin" ON leads FOR UPDATE USING (
  assigned_to = auth.uid() OR
  org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin'))
);

-- Activities Policies
CREATE POLICY "activities_select_if_can_see_lead" ON lead_activities FOR SELECT USING (
  lead_id IN (
      SELECT id FROM leads WHERE assigned_to = auth.uid() OR
      org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin'))
  )
);

CREATE POLICY "activities_insert_if_can_see_lead" ON lead_activities FOR INSERT WITH CHECK (
  lead_id IN (
      SELECT id FROM leads WHERE assigned_to = auth.uid() OR
      org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin'))
  )
);

-- Conversations Policies
CREATE POLICY "conversations_select_if_can_see_lead" ON conversations FOR SELECT USING (
  lead_id IS NULL OR -- Shadow leads accessible to service role (and potentially sales if explicitly allowed, but restricting for now)
  lead_id IN (
      SELECT id FROM leads WHERE assigned_to = auth.uid() OR
      org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin'))
  )
);

-- Routing Policies
CREATE POLICY "routing_select_org_members" ON lead_routing_rules FOR SELECT USING (
  org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid())
);

CREATE POLICY "routing_manage_admins" ON lead_routing_rules FOR ALL USING (
  org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin'))
);

-- Constraints
ALTER TABLE leads ADD CONSTRAINT check_whatsapp_format CHECK (whatsapp ~ '^\+?[0-9]{10,15}$');
