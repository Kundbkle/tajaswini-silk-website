# Secure Supabase setup for Tajaswini Silk

1. Create a Supabase project at https://supabase.com/dashboard and save its database password privately.
2. In SQL Editor, run `supabase/schema.sql` from this branch. Note: sample catalogue rows are included; remove the optional seed section if you do not want demo products.
3. Under Authentication > Users, create/invite your owner account. Disable public signups in Authentication settings. Enable MFA for the owner where supported.
4. Copy your owner's **Auth user UUID** from Authentication > Users. In SQL Editor run:

```sql
INSERT INTO public.admin_users (user_id)
VALUES ('REPLACE_WITH_OWNER_AUTH_USER_UUID')
ON CONFLICT DO NOTHING;
```

5. In Vercel project Settings > Environment Variables, add:
   - `VITE_SUPABASE_URL` = Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = Supabase publishable/anon key
   These values are intended for browser use. **Never add the service_role/secret key to VITE_ variables or GitHub.**
6. Redeploy Vercel so Vite picks up the variables. Sign in at `https://www.tajaswinisilkpune.com/admin`.
7. Verify: public catalogue loads in an incognito window; owner can create/edit/upload; a different signed-in user cannot change records or images; unconfigured demo login is blocked.

Important: This branch is not deployed until merged. Existing starter catalogue entries are illustrative; verify all products, prices and claims before publishing.
