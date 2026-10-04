# Guest article comments

The static site uses Supabase's Data API for guest comment submissions and approved-comment reads. New comments are private to moderators until their status is changed to `approved`.

## One-time Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor**, paste in `supabase/schema.sql`, and run it.
3. Open **Project Settings → API** and copy the Project URL and the public anon/publishable key. Never put a `service_role` or secret key in the website.
4. Set these variables in `.env.local` for local testing:

   ```text
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
   ```

5. Add the same two variables to the static-site build environment in the hosting provider, then rebuild and deploy.

The public anon key is intended for browser use. Row Level Security and the column grants in the SQL file limit visitors to reading approved comments and submitting comments whose status defaults to `pending`.

## Moderate comments

In Supabase **Table Editor → article_comments**, review pending rows. Change `status` to `approved` to publish a comment, or `rejected` to keep it hidden. Never change the browser client to use a service-role key.

This basic guest form has no built-in rate limiting or automated spam detection. Review submissions before approval. If spam becomes a problem, add a server-side verification/rate-limit layer before granting public writes.
