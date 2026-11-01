import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.resolve(process.env.SOURCE_ROOT || path.join(packageRoot, "src"));
const siteRoot = path.resolve(process.env.SITE_ROOT || path.join(packageRoot, "dist"));
const siteUrl = (process.env.SITE_URL || "https://golden-hut-resort-puranpur.virtuousgallery2022.chatgpt.site").replace(/\/+$/, "");
const imageUrl = `${siteUrl}/assets/enhanced/hero-pool-enhanced.png`;

const pages = [
  ["index.html", "/", "Golden Hut Resort near Pilibhit Tiger Reserve", "Stay at Golden Hut Resort near Puranpur: thatched cottages, a private pool, simple rooms and safari planning for Pilibhit Tiger Reserve."],
  ["resort/index.html", "/resort/", "Stay at Golden Hut Resort", "See Golden Hut Resort rooms, cottages, gardens, pool and the two room choices: Standard and Premium."],
  ["safari/index.html", "/safari/", "Pilibhit Safari Planning", "Plan a Pilibhit Tiger Reserve safari from Golden Hut Resort with clear, simple steps."],
  ["reserve/index.html", "/reserve/", "Pilibhit Tiger Reserve Guide", "A simple guide to the forest, water, wildlife and travel ideas around Pilibhit Tiger Reserve."],
  ["nearby/index.html", "/nearby/", "Nearby Places near Puranpur", "Explore Chuka Beach, Sharda Sagar, Bifurcation, Mahof and other nearby places around Pilibhit."],
  ["gallery/index.html", "/gallery/", "Golden Hut Resort Gallery", "See Golden Hut Resort rooms, pool, gardens and Pilibhit landscapes."],
  ["contact/index.html", "/contact/", "Contact Golden Hut Resort", "Contact Golden Hut Resort for room availability, safari planning and group stays."],
];

const schema = (url, title, description, isHome) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": isHome ? "Resort" : "WebPage",
      "@id": `${url}#page`,
      name: title,
      description,
      url,
      image: imageUrl,
      ...(isHome ? {
        telephone: "+91 89547 97115",
        email: "goldenhutresort@gmail.com",
        address: { "@type": "PostalAddress", addressLocality: "Puranpur", addressRegion: "Uttar Pradesh", addressCountry: "IN" }
      } : {})
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Golden Hut Resort", item: `${siteUrl}/` }, ...(isHome ? [] : [{ "@type": "ListItem", position: 2, name: title, item: url }])]
    }
  ]
});

if (sourceRoot !== siteRoot) {
  await fs.rm(siteRoot, { recursive: true, force: true });
  await fs.cp(sourceRoot, siteRoot, { recursive: true, force: true });
}

for (const [relativePath, route, title, description] of pages) {
  const file = path.join(siteRoot, relativePath);
  let html = await fs.readFile(file, "utf8");
  const canonical = `${siteUrl}${route}`;
  html = html
    .replace(/\s*<link rel="canonical"[^>]*>/gi, "")
    .replace(/\s*<meta property="og:[^"]+"[^>]*>/gi, "")
    .replace(/\s*<meta name="twitter:[^"]+"[^>]*>/gi, "")
    .replace(/\s*<script type="application\/ld\+json" data-seo-schema>[\s\S]*?<\/script>/gi, "");
  const seo = `\n<link rel="canonical" href="${canonical}">\n<meta property="og:type" content="website">\n<meta property="og:title" content="${title}">\n<meta property="og:description" content="${description}">\n<meta property="og:url" content="${canonical}">\n<meta property="og:image" content="${imageUrl}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${title}">\n<meta name="twitter:description" content="${description}">\n<meta name="twitter:image" content="${imageUrl}">\n<script type="application/ld+json" data-seo-schema>${JSON.stringify(schema(canonical, title, description, route === "/"))}</script>`;
  html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${description}">`).replace(/<img\b(?![^>]*\bdecoding=)[^>]*>/gi, (tag) => tag.replace(/\s*\/?>$/, ` decoding="async">`)).replace("</head>", `${seo}\n</head>`);
  html = html.replace(/(href="(?:\.\.\/)?(?:resort|safari|reserve|nearby|gallery|contact))\/index\.html"/g, "$1/\"");
  await fs.writeFile(file, html);
}

const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([, route]) => `  <url><loc>${siteUrl}${route}</loc></url>`).join("\n")}\n</urlset>\n`;
await fs.writeFile(path.join(siteRoot, "robots.txt"), robots);
await fs.writeFile(path.join(siteRoot, "sitemap.xml"), sitemap);
console.log(`SEO metadata generated for ${pages.length} pages at ${siteRoot}`);
