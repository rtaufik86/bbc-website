-- 1. Ensure the Organization exists (Critical for the trigger to work)
INSERT INTO public.organizations (name, slug)
VALUES ('BBC Bintaro', 'bbc-bintaro')
ON CONFLICT (slug) DO NOTHING;

-- 2. Delete the specific user from auth.users
-- Replace with your email if different
DELETE FROM auth.users WHERE email = 'rtaufik86@gmail.com';

-- OR, if you want to wipe ALL users to start fresh:
-- DELETE FROM auth.users;
