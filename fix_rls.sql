-- FIX RLS POLICY (Critical)
-- The application cannot read your membership data because RLS is enabled but no policy exists allowing you to read it.

-- 1. Create policy to allow users to read their own membership
DROP POLICY IF EXISTS "users_can_view_own_membership" ON org_members;
CREATE POLICY "users_can_view_own_membership" ON org_members
FOR SELECT USING (
  auth.uid() = user_id
);

-- 2. Verify data exists (just to be safe)
DO $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_count FROM org_members WHERE user_id = '06411bf2-e2d2-44ef-869b-9c16a412d066';
  IF v_count = 0 THEN
      RAISE NOTICE 'WARNING: User still not linked. Re-running link script...';
      -- Re-run link script logic here if needed, but strictly the policy is the likely culprit.
      INSERT INTO org_members (org_id, user_id, role, is_active)
      VALUES ((SELECT id FROM organizations WHERE slug = 'bbc-bintaro' LIMIT 1), '06411bf2-e2d2-44ef-869b-9c16a412d066', 'owner', true)
      ON CONFLICT (org_id, user_id) DO NOTHING;
  END IF;
END $$;
