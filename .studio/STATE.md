# STATE — Portfolio Redesign
_Updated 2026-10-27_

**Phase:** LIVE on randallbourquin.com (2026-10-27). Post-launch cleanup is below.

## Done this session
- Interview, Brief and Gate A ("go", 2026-10-21).
- Video inventory pulled from the live site (`docs/` in the Claude Project).
- Concept rounds: v1 directions were rejected as "structural carbon copies." v2 concepts were Reel, Index and Light Table; **Index chosen**.
- Two Index art directions are on the canvas: A Broadsheet (newsprint, serif headlines, halftone lead story) and B After Dark (black, a full-bleed hover image, a condensed title wall).
- Scaffolded: Next.js app, structured content for all 15 projects, routes `/`, `/work/[slug]`, `/worker`.

- White-world redesign shipped to the preview (randallbourquin-site.vercel.app). QC pass done: all 16 routes return 200; the image-to-project mapping is verified; the touch preview bug is fixed; the keyboard focus order is fine.

## Next
1. ~~Pick an intro~~: Roll call is shipped as the default.
2. **Randall rewrites the Marriott case copy.** A reminder is scheduled for 2026-10-23 at 09:45 ET. This blocks launch.
2b. ~~Palette~~: Prussian is locked and the switcher removed.
2c. ~~Crown Royal :30 poster~~: the clip was replaced with Stept's public Vimeo.
2d. The scavenger hunt is shipped (content/extras.ts); 53/53 case images load on prod. Still thin: Real Madrid, WSL, TNF and Oakley Surf need Randall's files or leads. Randall to confirm Mahomes "Skye" vs "Sterling" and the Marriott "Inside The Collection" episodes.
3. Re-host imagery to Vercel Blob (it currently hot-links Zyro). This blocks the DNS cutover.
4. Independent QA-critic pass at 390px and 1440px.
5. ~~Cut DNS over from Hostinger~~: done 2026-10-27 (see DECISIONS for rollback values).
6. Keep the Hostinger plan (it hosts email plus hot-linked Zyro images) until imagery is re-hosted. After that, the website-builder plan can be cancelled; keep email and the domain.
