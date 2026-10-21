# randallbourquin-site

Randall Bourquin's portfolio (randallbourquin.com). Studio-coo project; state lives in `.studio/`.

## Stack
- Next.js (App Router) + TypeScript, static. Deployed on Vercel from `main`.
- No backend, no env vars, no forms.
- Fonts: self-host via `next/font/local` (next/font/google can't fetch in the agent sandbox).

## Content
- `content/projects.ts`: all 15 projects in Randall's **locked** priority order. Copy is his, verbatim (typo fixes only).
- `content/worker.ts`: Worker page copy and the 35mm photo list.
- Images currently hot-link the old Hostinger/Zyro CDN. Re-host to Vercel Blob before the DNS cutover.

## Routes
- `/` the Index (all 15 projects at a glance)
- `/work/[slug]` case pages (video plays behind a poster facade; no autoplay with sound)
- `/worker` about

## Rules
- Never reorder projects or rewrite Randall's copy without logging it in `.studio/DECISIONS.md`.
- Video: Vimeo/YouTube embeds load only on click (privacy-enhanced youtube-nocookie).
- Reduced motion: no autoplay loops, no kinetic type.
