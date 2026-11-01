# Golden Hut Resort — Pilibhit Tiger Reserve

Static HTML, CSS and JavaScript website for Golden Hut Resort near Puranpur, Uttar Pradesh.

## Upload to GitHub

Open PowerShell in this folder and run:

```powershell
git init
git add .
git commit -m "Add Golden Hut Resort website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/golden-hut-resort.git
git push -u origin main
```

Replace the remote URL with your GitHub repository URL.

## Make it visible with Netlify

1. Push this folder to GitHub.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Select the repository. Netlify will read `netlify.toml`.
4. Confirm build command `npm run build` and publish directory `dist`.
5. Add the server-only variables from `.env.example` before enabling the contact form.

The site will be available at:

`https://YOUR-SITE.netlify.app/`

## Project structure

- `index.html`, `resort.html`, `safari.html`, `reserve.html`, `nearby.html`, `gallery.html`, `contact.html` — website pages
- `assets/` — all resort and Pilibhit images, grouped by purpose
- `dist/` — generated Netlify publish folder; do not edit it manually
- `netlify/functions/` — server-side contact form function
- `supabase/migrations/` — database schema for contact inquiries
- `scripts/build.mjs` — copies the root website files to `dist/` and generates SEO files
- `PRODUCTION.md` — deployment, Supabase, GA4 and Search Console notes

The enquiry form is wired for the Netlify Function, but it needs the Supabase variables in Netlify before it can store submissions.

## Image and research notes

- Resort photographs were supplied for the Golden Hut Resort presentation and delivered as web-ready enhanced JPEG/PNG assets under `assets/enhanced/`.
- Pilibhit Tiger Reserve photographs are openly licensed Wikimedia Commons files. Individual credits and license links are in `assets/reserve/CREDITS.md`, and the reserve page repeats credits beside the relevant photographs.
- Reserve copy is based on official District Pilibhit, Wildlife Institute of India and UP Eco-Tourism references. Verify current safari availability, entry rules and fees before publishing for real bookings.

Safari permits and entry are regulated by the Forest Department. Verify current dates, fees and rules using the official UP Eco-Tourism portal before confirming guest travel.
