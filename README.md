# Chanda product site

Public website for Chanda (চান্দা), an offline-first donations and expenses manager. Static Astro site, plain CSS, no backend.

## Stack

Astro (static output, TypeScript strict), plain CSS custom properties, Markdown docs in a zod-validated content collection, self-hosted fonts (`@fontsource`), vanilla JS for the menu, theme toggle and docs search only. Deployed on Vercel.

## Local development

```
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/
npm run check     # astro check (types)
npm run links     # internal link and anchor check (run after build)
npm run images    # regenerate public/og-image.png and apple-touch-icon.png
```

Node 20.19 or newer (LTS).

## Editing docs

Docs live in `src/content/docs/*.md`. Frontmatter is validated (`src/content.config.ts`):

```
title: Page title
description: One sentence, used for SEO and search
order: 3            # position in the sidebar and prev/next
group: Start        # Start | Teams | More
```

The search index (`/search.json`) and sidebar are built from these files. Say "festival", never "programme".

## Publishing a release

1. Upload the APK to a public GitHub Release on the app's repo. The asset URL downloads directly from this site (GitHub redirects to its file CDN), so visitors stay on the page. Never commit an APK (`*.apk` is gitignored; it is also over 100 MB).
2. Edit `src/config/site.ts`: bump `version`, add a new entry at the top of `releases[]`, set `apkUrl` (and `apkSizeMb`).
3. Commit and redeploy. The version, download button, footer and release notes update everywhere.

## Deploying to Vercel

Create a new Vercel project from this repo. Framework preset: Astro. Build command `npm run build`, output `dist`. `vercel.json` sets clean URLs, cache headers, security headers and a strict CSP. Do not host the app itself here; it stays on the URL in `webAppUrl`.

For a custom domain, change `url` in `src/config/site.ts`.

## Config fields still unset or to confirm (`src/config/site.ts`)

| Field | State |
| --- | --- |
| `apkUrl` | Unset. The Android button shows "APK link coming soon". |
| `contactEmail` | Unset. Contact links are hidden. |
| `url` | Placeholder `chanda-product.vercel.app`. Set to the real domain. |
| `releases[0].date` | Unset. The date is hidden. |
| `apkSizeMb` | 113 (size of the supplied APK). |
| `androidMin` | "7.0". Matches the supplied APK (minSdk 24). |

No `/privacy` page exists until privacy text is provided. The phone mock is CSS with sample data; replace it with real screenshots when available.
