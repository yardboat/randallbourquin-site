// Palette review. Open any page with ?palette=<id>; the choice sticks for the browser session
// so case pages and Worker can be compared too. ?palette=signal returns to the default.
export const PALETTES = [
  { id: "signal", name: "Signal (current)", swatch: ["#faf8f4", "#141414", "#d23a1b"] },
  { id: "cobalt", name: "Cobalt", swatch: ["#f6f6f3", "#101218", "#2a3fd6"] },
  { id: "racing", name: "Racing green", swatch: ["#f5f2e9", "#14201a", "#1d6a43"] },
  { id: "oxblood", name: "Oxblood", swatch: ["#f3eee6", "#1b1515", "#8b1d2c"] },
] as const;
export type PaletteId = (typeof PALETTES)[number]["id"];

export const paletteBootScript = `(function(){try{
var ok=${JSON.stringify(PALETTES.map((p) => p.id))};
var q=new URLSearchParams(location.search).get('palette');
if(q&&ok.indexOf(q)>-1){ if(q==='signal'){sessionStorage.removeItem('rb-palette');sessionStorage.setItem('rb-palette-review','1');} else {sessionStorage.setItem('rb-palette',q);sessionStorage.setItem('rb-palette-review','1');} }
var p=sessionStorage.getItem('rb-palette');
if(p&&ok.indexOf(p)>-1) document.documentElement.setAttribute('data-palette',p);
}catch(e){}})();`;
