# ProLocalBuilder

Marketing site for [prolocalbuilder.com](https://prolocalbuilder.com) — websites for local businesses, $750 flat.

Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint with `next lint` |
| `npm run typecheck` | Type-check without emitting |

## Project structure

```
prolocalbuilder-web/
├── app/
│   ├── globals.css      # Tailwind + brand-bible component classes
│   ├── layout.tsx       # Root layout + fonts + metadata
│   └── page.tsx         # Home (assembles all sections)
├── components/          # One file per landing-page section
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── WhatWeBuild.tsx
│   ├── Pricing.tsx
│   ├── Honesty.tsx
│   ├── Process.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   └── MobilePhoneBar.tsx
├── lib/
│   └── site.ts          # Site constants, pricing tiers, FAQs, process steps
├── tailwind.config.ts   # Brand bible tokens (colors, type scale, spacing)
└── tsconfig.json
```

## Editing content

- **Phone, email, founder, service area** → `lib/site.ts`
- **Pricing tiers + features** → `lib/site.ts` (`tiers` export)
- **FAQ entries** → `lib/site.ts` (`faqs` export)
- **Process steps** → `lib/site.ts` (`processSteps` export)
- **Brand colors / type / spacing** → `tailwind.config.ts`

## Quote form (Resend email)

The free-quote form (`components/CTA.tsx`) posts to the server route
`app/api/quote/route.ts`, which emails each lead to our inbox via
[Resend](https://resend.com). The API key is server-only and never reaches the
browser.

**One-time setup:**

1. Create a Resend account at <https://resend.com>.
2. Add and verify the domain `prolocalbuilder.com`
   (<https://resend.com/domains> → add domain → add the DNS records it shows you
   to wherever the domain's DNS lives). Verification can take a few minutes to
   an hour for DNS to propagate.
3. Create an API key at <https://resend.com/api-keys> (starts with `re_`).
4. Locally: copy `.env.example` to `.env.local` and paste the key into
   `RESEND_API_KEY`. In production, set the same env var in your host (see below).

**Env vars** (documented in `.env.example`):

| Variable | Required | Default |
|---|---|---|
| `RESEND_API_KEY` | yes | — |
| `QUOTE_FROM_EMAIL` | no | `ProLocalBuilder <quotes@prolocalbuilder.com>` (must be on a verified domain) |
| `QUOTE_TO_EMAIL` | no | `hello@prolocalbuilder.com` |

**Testing before the domain is verified:** set
`QUOTE_FROM_EMAIL="ProLocalBuilder <onboarding@resend.dev>"` — Resend's shared
test sender, which only delivers to the email you signed up with.

## Deployment

> After deploying, set `RESEND_API_KEY` in the host's environment-variables
> settings (Vercel: Project → Settings → Environment Variables; Cloudflare:
> Pages project → Settings → Environment variables) and redeploy. Without it the
> quote form returns a 500 and tells visitors to call.

### Option A — Vercel (recommended, free tier)

1. Push this repo to GitHub
2. Go to <https://vercel.com/new>, import the repo
3. Vercel auto-detects Next.js — click **Deploy**
4. Add custom domain `prolocalbuilder.com` in Vercel → DNS records as instructed

### Option B — Cloudflare Pages (free tier)

1. Push this repo to GitHub
2. <https://pages.cloudflare.com/> → "Connect to Git" → select repo
3. Build settings: framework preset **Next.js**, build command `npm run build`, output `.next`
4. Add custom domain in the Pages dashboard

## Brand bible

Design tokens live in `tailwind.config.ts`. Don't hardcode colors, sizes, or spacing — extend the config instead. The full bible (with rationale and "never" rules) is at `../prolocalbuilder/brand-bible.md`.

## License

Proprietary. © 2026 ProLocalBuilder.
