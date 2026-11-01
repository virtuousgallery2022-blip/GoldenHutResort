# Golden Hut Resort production audit

## Framework and structure

The actual Golden Hut website is a buildless static site: HTML pages, one shared CSS file, one browser JavaScript file and local image assets. It is not Next.js, React or Vite. The larger workspace contains other unrelated Next.js projects, so those root-level files must not be used to deploy Golden Hut.

The deployable package is `golden-hut-resort-git-package/`:

- editable pages: `index.html`, `resort.html`, `safari.html`, `reserve.html`, `nearby.html`, `gallery.html`, `contact.html`
- editable shared front end source: `styles.css`, `script.js`
- Netlify public build output: `dist/`
- images: `assets/` (copied into `dist/assets/` during the build)
- Netlify config: `netlify.toml`
- serverless API: `netlify/functions/contact.cjs`
- database migration: `supabase/migrations/`
- SEO generator: `scripts/build-seo.mjs`

## Implemented production protections

- Server-side validation for every contact field.
- HTML stripping, allowlisted select values and length limits.
- JavaScript honeypot field for simple bot filtering.
- IP hashing with a server-only salt; raw visitor IPs are not stored.
- Supabase-backed rate-limit check before insert.
- Supabase RLS enabled with public, anonymous and authenticated table access revoked.
- Service-role key is read only inside the Netlify Function.
- Client-side loading, success, error and rate-limit states.
- No credentials or real service IDs added to the repository.

## SEO and crawlability

The build generates canonical URLs, Open Graph and Twitter metadata, JSON-LD Resort/WebPage and BreadcrumbList data, `robots.txt`, and `sitemap.xml`. Set `SITE_URL` before deployment so the final domain is used. Existing folder URLs are descriptive and redirected from their short forms.

All seven pages have one primary `h1`, descriptive image `alt` text, local assets, and lazy loading where appropriate. The SEO build adds asynchronous image decoding for better mobile rendering.

## Verification status

Local build, JavaScript syntax checks, function smoke tests, page heading/canonical checks, image-alt checks and local-link checks pass. Netlify, Supabase, GA4 and Search Console are not claimed as configured until the owner creates those services and adds the environment values described in `PRODUCTION.md`.
