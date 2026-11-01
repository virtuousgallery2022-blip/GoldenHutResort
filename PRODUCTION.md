# Golden Hut Resort production checklist

## What this project is

The website is a buildless static HTML/CSS/JavaScript site. It is not Next.js, React or Vite. Editable pages and assets live at the package root; the build script copies them into `dist/`, generates SEO files, and Netlify publishes `dist/`.

## Netlify deployment

1. Create a new Netlify site and connect this repository.
2. Set the build command to `npm run build` and publish directory to `dist`. `netlify.toml` already contains these settings.
3. Add the environment variables listed in `.env.example` in Netlify Site configuration. Do not commit `.env`, service-role keys or database passwords.
4. Set `SITE_URL` to the final HTTPS Netlify URL or custom domain and redeploy. This generates canonical URLs, Open Graph URLs, `robots.txt` and `sitemap.xml`.
5. Keep the Netlify Function deployed from `netlify/functions/contact.cjs`.

## Supabase setup

1. Create a Supabase project and run `supabase/migrations/202610290001_create_contact_inquiries.sql` in the SQL Editor or through Supabase CLI migrations.
2. Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and a long random `RATE_LIMIT_SALT` to Netlify environment variables only.
3. Never put the service-role key in browser JavaScript, HTML, Git, or a public `.env` file.
4. The table has RLS enabled and no public `anon` or `authenticated` policies. Only the server-side function uses the service role.

## Local checks

```bash
npm run build
```

For a local Netlify Function preview, install the Netlify CLI separately and run `netlify dev` after setting local values in an untracked `.env` file. Do not use production credentials for casual local testing.

## Google Analytics 4 and Search Console

GA4 and Search Console are intentionally not claimed as configured. After the owner creates the properties:

- GA4: add the Google-provided `gtag.js` snippet to the `<head>` of each page, or add it through a consent-aware tag manager. Do not add a guessed measurement ID.
- Search Console: verify the final domain using DNS or the HTML meta-tag method provided by Google. Then submit `/sitemap.xml` and inspect the canonical URLs.

## Final production checks

- Test the contact form with valid, invalid, honeypot and repeated submissions.
- Confirm a row is created in Supabase without exposing `ip_hash` or service credentials to the browser.
- Test the site on a narrow mobile viewport, run Lighthouse, check all navigation links, and confirm `robots.txt`, `sitemap.xml`, canonical tags and social previews use the final domain.
