-- FIX LOGIN SCRIPT
-- Copy ALL of this and run in Supabase SQL Editor

DO $$
DECLARE
  v_org_id UUID;
  v_user_email TEXT := 'rtaufik86@gmail.com'; -- TARGET EMAIL
  v_user_id UUID;
BEGIN
  -- 1. Ensure Organization Exists
  INSERT INTO public.organizations (name, slug)
  VALUES ('BBC Bintaro', 'bbc-bintaro')
  ON CONFLICT (slug) DO NOTHING;

  -- 2. Get Org ID
  SELECT id INTO v_org_id FROM public.organizations WHERE slug = 'bbc-bintaro';

  -- 3. Get User ID from Auth System
  SELECT id INTO v_user_id FROM auth.users WHERE email = v_user_email;

  -- 4. Create Link (Org Member)
  IF v_user_id IS NOT NULL THEN
    -- Insert or Update Member
    INSERT INTO public.org_members (org_id, user_id, role, is_active)
    VALUES (v_org_id, v_user_id, 'owner', true)
    ON CONFLICT (org_id, user_id) DO UPDATE SET role = 'owner', is_active = true;
    
    -- Create Sales Profile
    INSERT INTO public.sales_profiles (org_id, user_id, display_name, is_active)
    VALUES (v_org_id, v_user_id, 'Admin', true)
    ON CONFLICT (org_id, user_id) DO NOTHING;
    
    RAISE NOTICE 'SUCCESS: User % linked to BBC Bintaro as Owner.', v_user_email;
  ELSE
    RAISE EXCEPTION 'ERROR: User % not found. Please Sign Up first.', v_user_email;
  END IF;
END $$;
