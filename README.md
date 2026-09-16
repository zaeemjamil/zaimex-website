# ZAIMEX — Website

Marketing website for ZAIMEX — *Data. AI. Automation. Built for Business.* Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Tech stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — centralized design tokens in `src/app/globals.css`
- **Framer Motion** — entrance/scroll animations, respects `prefers-reduced-motion`
- **lucide-react** — icon set
- **Resend** — contact form email delivery (optional; see "Contact form & email delivery" below)
- Fonts (Inter, Manrope, JetBrains Mono) are self-hosted via `@fontsource/*` packages rather than `next/font/google`, so the site has no runtime dependency on `fonts.googleapis.com`.

No database is used. All content lives in plain TypeScript config files under `src/config/`.

---

## 1. Local setup

**Requirements:** Node.js 20+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables and fill in real values (optional for local dev — see below)
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

The site runs at `http://localhost:3000`.

### Other commands

```bash
npm run build   # production build
npm run start   # serve the production build locally (run `build` first)
npm run lint     # ESLint
```

---

## 2. Environments: Development, Staging & Production

**Development** — your machine, day to day.
- `npm run dev`, reading from `.env.local` (gitignored — never commit real secrets).
- No environment variables are required to run the site. Every value has a safe, clearly-a-placeholder fallback (see section 3), so `npm install && npm run dev` works immediately with zero setup.
- Runs at `http://localhost:3000`. Canonical URLs, the sitemap, and JSON-LD all correctly reflect `localhost` here — never a fake production domain.

**Staging / Preview** — optional, for testing a branch before it goes live.
- If deployed on Vercel, every pull request / non-production branch automatically gets its own **Preview** deployment with its own real, unique URL — no setup required.
- In Vercel → **Settings → Environment Variables**, each variable can be scoped to Production / Preview / Development independently. Use this to point `CONTACT_INBOX_EMAIL` (and optionally a separate `RESEND_API_KEY`) at a test inbox for Preview deployments, so test submissions never land in the real business inbox.
- Leave `NEXT_PUBLIC_SITE_URL` **unset** for Preview — it then automatically resolves to that deployment's own `*.vercel.app` URL (see section 3) instead of the production domain.

**Production** — the live site.
- The real custom domain and real contact/WhatsApp/Resend values, set under the **Production** environment in Vercel (section 5).
- `npm run build && npm run start` is the production build/serve pair; on Vercel this runs automatically on every deploy to the production branch — you only need to run it manually to test a production build locally.

---

## 3. Environment variables

All variables are **optional in development** — see `.env.example` for the full list and the sensible defaults each one falls back to (defined in `src/config/site.ts` and `src/config/socials.ts`). Set real values in your Vercel project's **Settings → Environment Variables** before going live.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL — used in metadata, canonical tags, the sitemap, and structured data. No domain has been confirmed for ZAIMEX yet, so this is unset by default; it falls back to Vercel's own deployment URL automatically (never to an assumed/invented domain), then to `localhost` in local dev. **Set this once a real domain exists.** |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email shown in the footer, contact page, and legal pages. Defaults to the real confirmed address, `zaimexteam@gmail.com` — override only for a different environment (e.g. staging). |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number in international format, digits only. Single source of truth used by the floating WhatsApp button, footer, and contact page. Defaults to the real confirmed number, `923287768285`. |
| `NEXT_PUBLIC_LINKEDIN_URL` | Defaults to the real confirmed public company page, `https://www.linkedin.com/company/zaimex/?viewAsMember=true`. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Defaults to the real confirmed profile, `https://www.instagram.com/zaimex.official/`. |
| `NEXT_PUBLIC_GITHUB_URL` | Not yet provided. Leave unset — the footer icon stays hidden rather than linking to a placeholder `#`. |
| `RESEND_API_KEY` | Resend API key used to send contact form notifications. Leave unset in development to keep submissions server-logged only. |
| `CONTACT_INBOX_EMAIL` | Where contact form submissions are delivered. Required alongside `RESEND_API_KEY` for real email delivery. |
| `CONTACT_FROM_EMAIL` | Optional. The "from" address contact emails are sent from, e.g. `"ZAIMEX Website <noreply@yourdomain.com>"`. Requires a verified sending domain in Resend — see "Contact form" below. Falls back to Resend's shared sandbox sender if unset. |

No API keys or secrets are hardcoded anywhere in the codebase.

---

## 4. Editing content

The whole site is driven by config files — you should not need to touch component code to update copy, services, projects, or contact details:

| File | Controls |
|---|---|
| `src/config/site.ts` | Company name, tagline, description, contact email, WhatsApp number/message, country, CTA labels |
| `src/config/socials.ts` | LinkedIn / Instagram / GitHub links |
| `src/config/navigation.ts` | Navbar, mobile menu, and footer links |
| `src/config/services.ts` | All 9 service pages (`/services/[slug]`) — hero copy, problem/approach/deliverables, FAQ, related services |
| `src/config/solutions.ts` | The 5 cards on `/solutions` and the homepage Solutions section |
| `src/config/projects.ts` | Portfolio cards and case studies (`/portfolio/[slug]`). Each project has `verifiedClientWork: boolean` — leave `false` (shows an "Example Project" label) until it's confirmed, attributable client work. |
| `src/config/testimonials.ts` | Testimonials — currently empty on purpose (see below); add real ones as they become available |
| `src/config/seo.ts` | Per-page `<title>` / meta description for static pages |

Adding a new service or project is just adding a new object to the relevant array — the routes, cards, sitemap, and metadata all update automatically. To add a genuinely new **route** (e.g. a 10th service), duplicate one of the folders under `src/app/services/` and add a matching entry to `src/config/services.ts`.

### Images

Local placeholder cover art for portfolio and service cards lives under `public/images/{projects,services}/`. These are generated, abstract "data network" SVGs (no stock photography, no fabricated screenshots) — see `scripts/generate-covers.mjs`. Replace any file at those paths with real imagery whenever it's available; filenames match each project/service `slug`, so no code changes are needed. (`public/images/brand/` is different — it holds the real Open Graph image generated from ZAIMEX's actual logo, not placeholder art; see "Icons & Open Graph image" below.)

### Testimonials

`src/config/testimonials.ts` is intentionally empty — no testimonials were fabricated. The `<Testimonials>` component automatically shows a "Client feedback will appear here." placeholder until you add real, verified entries to that file.

### Logo assets

The official ZAIMEX logo (two approved variants — blue mark for light backgrounds, white mark for dark backgrounds) lives under `public/brand/`:

```
public/brand/
├── source/                        # untouched originals, kept for re-processing — never edited directly
│   ├── zaimex-logo-source-light.png
│   └── zaimex-logo-source-dark.png
├── zaimex-logo-light.png          # blue mark, transparent background — used on light surfaces
├── zaimex-logo-dark.png           # white mark, transparent background — used on dark surfaces
└── zaimex-logo-square.png         # white mark on an opaque blue tile — favicon/app-icon source only
```

`<LogoMark>` (`src/components/layout/LogoMark.tsx`) renders both variants and shows/hides each with `dark:` classes matching the site's theme system, so the correct mark appears automatically in the navbar, mobile menu, and footer with no JavaScript needed for the swap. The artwork itself (shape, colours, proportions) is never redrawn — `scripts/process-logo.py` only crops the source files to a tight bounding box and removes the flat background colour to transparency (with proper anti-aliased edges, not a hard cutout), so the mark sits cleanly on whatever surface it's placed on instead of carrying a mismatched background tile. Re-run it after replacing either file in `source/`:

```bash
python3 scripts/process-logo.py
```

### Icons & Open Graph image

The favicon (`src/app/favicon.ico`), app icons (`src/app/icon.png`, `src/app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`), and the Open Graph preview image (`public/images/brand/og-cover.png`) are all generated from the real logo above — not placeholder art. Icons are resized directly from `zaimex-logo-square.png` (an opaque tile, since favicons/app icons are always rendered as opaque squares by the OS); the OG image is composited with `scripts/generate-og-image.py` using the dark-variant mark plus the wordmark and tagline. PNG is used rather than SVG for both because several social platforms (X/Twitter, Facebook, LinkedIn, iMessage) don't reliably render an SVG `og:image`.

To regenerate after changing the logo or square icon:

```bash
python3 -c "
from PIL import Image
src = Image.open('public/brand/zaimex-logo-square.png').convert('RGB')
for path, size in [('/tmp/icon-16.png',16), ('/tmp/icon-32.png',32), ('/tmp/icon-48.png',48),
                    ('src/app/apple-icon.png',180), ('public/icon-192.png',192), ('public/icon-512.png',512)]:
    src.resize((size, size), Image.LANCZOS).save(path)
"
convert /tmp/icon-16.png /tmp/icon-32.png /tmp/icon-48.png src/app/favicon.ico
cp /tmp/icon-32.png src/app/icon.png
python3 scripts/generate-og-image.py
```

(Requires ImageMagick + Pillow — `apt-get install imagemagick` / `pip install pillow`.)

### Contact form & email delivery (Resend)

The `/contact` form (`src/components/forms/ContactForm.tsx`) posts to `src/app/api/contact/route.ts`, which:

- Validates and sanitizes every field server-side (independent of the client-side validation)
- Rejects the request if honeypot field `website` is filled in (silently returns success to the bot, so it never learns the field is a trap)
- Sends an email via [Resend](https://resend.com) when configured, with the visitor's address set as `replyTo` so you can just hit reply
- HTML-escapes every user-supplied field before it's placed in the email body, so a submission can never inject markup into the notification email
- Returns `{ ok: false }` — never a false `{ ok: true }` — if Resend fails or is unreachable, so the UI shows a real error state instead of a fake success message

**Without any configuration**, submissions are still validated and accepted (`{ ok: true, delivered: false }`), but only logged server-side — nothing is silently lost, but nothing is emailed either. This is intentional so the form is fully testable before you have a Resend account.

**To enable real email delivery:**

1. Create a free account at [resend.com](https://resend.com).
2. Dashboard → **API Keys** → **Create API Key**. Copy it into `RESEND_API_KEY`.
3. Set `CONTACT_INBOX_EMAIL` to the address that should receive project requests.
4. For real production traffic, verify your own sending domain: Dashboard → **Domains** → **Add Domain**, then follow Resend's DNS instructions (SPF/DKIM records at your DNS provider). Once verified, set `CONTACT_FROM_EMAIL` to an address on that domain, e.g. `"ZAIMEX Website <noreply@yourdomain.com>"`.
   - Until a domain is verified, leaving `CONTACT_FROM_EMAIL` unset falls back to Resend's shared sandbox sender (`onboarding@resend.dev`), which Resend restricts to delivering only to the email address on your Resend account — it will not reach real site visitors' inboxes as the recipient, and is only useful for testing that the integration itself works.
5. Add all three variables in Vercel under **Settings → Environment Variables** (Production, and Preview if you want to test there too) and redeploy.

None of these are ever exposed to the browser: they're read only inside `route.ts`, a server-only file, and none use the `NEXT_PUBLIC_` prefix that Next.js requires before inlining a variable into client code.

### Legal pages

`/privacy` and `/terms` contain a reasonable starting template, clearly flagged in-page as pending legal review. Have them reviewed by qualified counsel before launch and update the "Last updated" date.

---

## 5. Deploying to Vercel

1. **Push this project to a GitHub/GitLab/Bitbucket repo.**
2. In [Vercel](https://vercel.com), click **Add New → Project** and import the repo. Vercel auto-detects Next.js — no build configuration is required.
3. Before the first deploy (or any time after, under **Settings → Environment Variables**), add the variables listed in section 3 above for the **Production** environment. At minimum, set `NEXT_PUBLIC_SITE_URL` to your real domain once you have one — every other variable already defaults to ZAIMEX's real, confirmed contact details.
4. Click **Deploy**.

Every push to your production branch redeploys automatically.

### Custom domain

1. In the Vercel project, go to **Settings → Domains** and add your domain (e.g. `yourdomain.com` and `www.yourdomain.com` — substitute ZAIMEX's actual confirmed domain once one is registered).
2. Vercel will show the DNS records to add at your domain registrar (typically an `A`/`ALIAS` record for the apex domain and a `CNAME` for `www`).
3. Once DNS propagates, Vercel provisions an SSL certificate automatically.
4. Update `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy so canonical URLs, the sitemap, and structured data all point to the right place.

This project is not currently deployed anywhere — the instructions above are for deploying this codebase, and Vercel is a recommendation, not a claim about existing hosting.

---

## 6. SEO & technical notes

- `src/app/sitemap.ts` and `src/app/robots.ts` generate `/sitemap.xml` and `/robots.txt` dynamically from the same config used to render the site, so they can't drift out of sync with real routes.
- Organization, Service, and Breadcrumb JSON-LD structured data are included (`src/lib/structuredData.ts`).
- Every page sets unique metadata via `src/lib/metadata.ts`; service and portfolio pages generate metadata from their own config entry.
- `prefers-reduced-motion` is respected globally (`globals.css`) and per-animation in components using Framer Motion's `useReducedMotion`.
- Dark mode is the default theme; the toggle persists the visitor's choice in `localStorage` and applies it before first paint (see the inline script in `src/components/layout/ThemeProvider.tsx`) to avoid a flash of the wrong theme.

---

## 7. Before launch checklist

- [ ] Set `RESEND_API_KEY` and `CONTACT_INBOX_EMAIL` in Vercel so contact form submissions actually get emailed (see "Contact form & email delivery" above) — without these, the form still works but only logs submissions server-side
- [ ] Verify a sending domain in Resend and set `CONTACT_FROM_EMAIL` once you have one, so contact emails don't rely on the shared sandbox sender
- [ ] Add a GitHub URL if/when ZAIMEX has a public org (`NEXT_PUBLIC_GITHUB_URL`) — the footer icon stays hidden until then, which is correct as-is, not broken
- [ ] Replace placeholder cover art in `public/images/` with real project/service imagery as it becomes available
- [ ] Add real testimonials to `src/config/testimonials.ts` once available
- [ ] Have `/privacy` and `/terms` reviewed by legal counsel
- [ ] If the logo is ever updated, replace the files in `public/brand/source/` and re-run `python3 scripts/process-logo.py` — see "Logo assets" below
- [ ] Set `NEXT_PUBLIC_SITE_URL` once a real production domain is confirmed (do not assume `zaimex.com` — it is not confirmed as owned/active)
