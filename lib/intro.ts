// Homepage intro. Three concepts under review: open /?intro=reel | roll | sheet.
// After Randall picks, set DEFAULT_INTRO and it plays once per browser session.
export const INTRO_MODES = ["reel", "roll", "sheet"] as const;
export type IntroMode = (typeof INTRO_MODES)[number];
export const DEFAULT_INTRO: IntroMode | null = "roll"; // Randall, 2026-10-22

export const INTRO_LABELS: Record<IntroMode, string> = {
  reel: "A · Reel",
  roll: "B · Roll call",
  sheet: "C · Contact sheet",
};

// Runs before paint so the finished Index never flashes ahead of the intro.
export const introBootScript = `(function(){try{
var q=new URLSearchParams(location.search).get('intro');
var ok=${JSON.stringify(INTRO_MODES)};
var m=ok.indexOf(q)>-1?q:null;
var d=${JSON.stringify(DEFAULT_INTRO)};
if(!m){ if(q==='none'||!d) return; if(sessionStorage.getItem('rb-intro')) return; m=d; }
if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
document.documentElement.setAttribute('data-intro',m);
}catch(e){}})();`;

/** Route remote images through Vercel's optimizer (q must be 75 on Next 16 defaults). */
export const opt = (src: string, w = 1200) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
