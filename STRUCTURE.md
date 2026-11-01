# Golden Hut Resort file structure

The project is intentionally separated into editable source, generated output, server code and database files.

```text
golden-hut-resort-git-package/
├── src/                  # Edit website content here
│   ├── index.html
│   ├── resort.html
│   ├── safari.html
│   ├── reserve.html
│   ├── nearby.html
│   ├── gallery.html
│   ├── contact.html
│   ├── styles.css
│   ├── script.js
│   ├── favicon.svg
├── assets/               # All website images, logo and credits
├── dist/                 # Generated deploy folder
├── netlify/functions/    # Server-only contact API
├── supabase/migrations/  # Contact inquiry table and permissions
├── scripts/              # Build and SEO tooling
├── package.json
├── netlify.toml
└── .env.example
```

Run `npm run build` after changing anything in `src/`. This refreshes `dist/` for Netlify deployment.
