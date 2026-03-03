-- Function to create org member on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_org_id UUID;
BEGIN
  -- Get the first organization (or create logic for multi-org)
  SELECT id INTO default_org_id
  FROM organizations
  WHERE slug = 'bbc-bintaro'
  LIMIT 1;
  
  -- Create org_member entry
  -- First user becomes owner, others become sales by default
  INSERT INTO org_members (org_id, user_id, role)
  VALUES (
    default_org_id,
    NEW.id,
    CASE 
      WHEN (SELECT COUNT(*) FROM org_members WHERE org_id = default_org_id) = 0 
      THEN 'owner'
      ELSE 'sales'
    END
  );
  
  -- Create sales_profile if role is sales
  INSERT INTO sales_profiles (org_id, user_id, display_name)
  VALUES (
    default_org_id,
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
