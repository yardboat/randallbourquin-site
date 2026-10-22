# STATE — Portfolio Redesign
_Updated 2026-10-21_

**Phase:** S1. The Brief is approved. Concept chosen: **The Index**. Art direction: **B — After Dark** (Randall, 2026-10-21).

## Done this session
- Interview, Brief and Gate A ("go", 2026-10-21).
- Video inventory pulled from the live site (`docs/` in the Claude Project).
- Concept rounds: v1 directions were rejected as "structural carbon copies." v2 concepts were Reel, Index and Light Table; **Index chosen**.
- Two Index art directions are on the canvas: A Broadsheet (newsprint, serif headlines, halftone lead story) and B After Dark (black, a full-bleed hover image, a condensed title wall).
- Scaffolded: Next.js app, structured content for all 15 projects, routes `/`, `/work/[slug]`, `/worker`.

- White-world redesign shipped to the preview (randallbourquin-site.vercel.app). QC pass done: all 16 routes return 200; the image-to-project mapping is verified; the touch preview bug is fixed; the keyboard focus order is fine.

## Next
1. **Randall picks an intro** (review at `/?intro=reel`, `/?intro=roll`, `/?intro=sheet`). Then set `DEFAULT_INTRO` in `lib/intro.ts` (it plays once per session and is skipped under reduced motion) and remove the review toolbar.
2. **Randall rewrites the Marriott case copy.** A reminder is scheduled for 2026-10-23 at 09:45 ET. This blocks launch.
3. Re-host imagery to Vercel Blob (it currently hot-links Zyro). This blocks the DNS cutover.
4. Independent QA-critic pass at 390px and 1440px.
5. Cut DNS over from Hostinger (needs Randall live).
