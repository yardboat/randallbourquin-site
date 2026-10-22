// Palette review. Open any page with ?palette=<id>; the choice sticks for the browser session
// so case pages and Worker can be compared too. ?palette=ultramarine returns to the default. ?texture=off compares without grain.
export const PALETTES = [
  { id: "ultramarine", name: "Ultramarine", swatch: ["#f2ecdf", "#16151a", "#22379b"] },
  { id: "prussian", name: "Prussian", swatch: ["#f2ecdf", "#16151a", "#123a66"] },
  { id: "indigo", name: "Indigo", swatch: ["#f2ecdf", "#16151a", "#2b2c78"] },
] as const;
export type PaletteId = (typeof PALETTES)[number]["id"];

export const paletteBootScript = `(function(){try{
var ok=${JSON.stringify(PALETTES.map((p) => p.id))};
var q=new URLSearchParams(location.search).get('palette');
if(q&&ok.indexOf(q)>-1){ if(q==='ultramarine'){sessionStorage.removeItem('rb-palette');sessionStorage.setItem('rb-palette-review','1');} else {sessionStorage.setItem('rb-palette',q);sessionStorage.setItem('rb-palette-review','1');} }
var p=sessionStorage.getItem('rb-palette');
if(p&&ok.indexOf(p)>-1) document.documentElement.setAttribute('data-palette',p);
var t=new URLSearchParams(location.search).get('texture'); if(t){sessionStorage.setItem('rb-texture',t);sessionStorage.setItem('rb-palette-review','1');}
if(sessionStorage.getItem('rb-texture')==='off') document.documentElement.setAttribute('data-texture','off');
}catch(e){}})();`;
