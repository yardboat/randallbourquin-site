import Link from "next/link";
import Header from "@/components/Header";
import FrameLoop, { type Frame } from "@/components/v2/FrameLoop";
import MotionToggle from "@/components/v2/MotionToggle";
import Ring, { type RingItem } from "@/components/v2/Ring";
import WorkIndex, { type Row } from "@/components/v2/WorkIndex";
import { projects, manifesto, clients, quote, type Project } from "@/content/projects";
import { extras } from "@/content/extras";
import { indexCopy } from "@/content/index-copy";
import { posterFor } from "@/lib/media";
import { opt } from "@/lib/intro";
import "./v2.css";

// v2 homepage (2026-11-10). Five lead cases get depth; all 14 stay visible in Randall's order.
const LEADS = ["ford-bronco", "chobani-world-cup-2026", "gold-peak-golden-hour-lens", "crown-royal-triple-nickel", "got-milk-gonna-need-milk"];

const frame = (raw: string, big: boolean): Frame => {
  const scope = raw.endsWith("#scope");
  const src = raw.replace(/#scope$/, "");
  if (/\.gif($|\?)/.test(src)) return { src, scope }; // animated: leave untouched
  const ws = big ? [828, 1200, 1920] : [640, 828];
  return { src: opt(src, ws[ws.length - 1]), srcSet: ws.map((w) => `${opt(src, w)} ${w}w`).join(", "), scope };
};

async function stills(p: Project): Promise<string[]> {
  const ex = extras[p.slug] ?? {};
  // Posters that arrive letterboxed get the same crop as the #scope film frames.
  const boxed = ["ford-bronco"].includes(p.slug);
  const posters = (await Promise.all([...p.videos, ...(ex.videos ?? [])].map(posterFor))).filter((x): x is string => !!x).map((x) => (boxed ? x + "#scope" : x));
  const all = [...p.images.slice(0, 1), ...posters.slice(0, 1), ...(ex.images ?? []), ...p.images.slice(1), ...posters.slice(1)];
  return [...new Set(all)].slice(0, 5);
}

const n2 = (i: number) => String(i + 1).padStart(2, "0");

export default async function Home() {
  const all = await Promise.all(
    projects.map(async (p, i) => ({ p, i, copy: indexCopy[p.slug], ex: extras[p.slug] ?? {}, stills: await stills(p) }))
  );
  const leads = LEADS.map((s) => all.find((x) => x.p.slug === s)!).filter(Boolean);

  // Ring and index: exactly the 14 projects, in the locked order, one tile each.
  const ringItems: RingItem[] = all.map((x) => {
    const f = x.stills[0] ? frame(x.stills[0], true) : undefined;
    return { href: `/work/${x.p.slug}`, n: n2(x.i), title: x.copy?.wall ?? x.p.title, client: x.p.client, tag: x.copy?.caption ?? x.p.tag, color: x.p.color, src: f?.src, srcSet: f?.srcSet, scope: f?.scope };
  });
  const rows: Row[] = all.map((x, k) => {
    const f = x.stills[0] ? frame(x.stills[0], false) : undefined;
    return { ...ringItems[k], src: f?.src, scope: f?.scope };
  });

  return (
    <div className="v2">
      <a href="#leads" className="skip">Skip to the work</a>
      <Header current="work" />
      <main>
        {/* Name, then the work in motion */}
        <section className="v2-hero" aria-label="Randall Bourquin">
          <h1 className="v2-name">
            <span><b>Randall</b></span> <span><b>Bourquin</b></span>
          </h1>
          <Ring items={ringItems} />
          <div className="v2-hint label"><span>Drag, or use ← →</span><MotionToggle /><a href="#leads">Scroll for the work ↓</a></div>
        </section>

        {/* Five lead cases */}
        <section id="leads" className="v2-leads" aria-label="Lead cases">
          {leads.map(({ p, i, copy, ex, stills }, k) => (
            <article key={p.slug} className={"v2-lead" + (k % 2 ? " flip" : "")} data-reveal>
              <Link href={`/work/${p.slug}`} className="media" style={{ ["--c" as string]: p.color }} aria-label={`${p.title}: open the case`}>
                <FrameLoop frames={stills.map((s) => frame(s, true))} alt={p.title} sizes="(max-width: 860px) 100vw, 60vw" eager={k === 0} />
              </Link>
              <div className="txt">
                <p className="label meta"><span>{n2(i)}</span> {p.client}</p>
                <h2><Link href={`/work/${p.slug}`}>{copy?.wall ?? p.title}</Link></h2>
                <p className="teaser">{copy?.teaser}</p>
                <p className="label proof">{ex.award ?? p.tag}</p>
                {ex.quote && (
                  <blockquote>
                    “{ex.quote.text}”
                    <footer className="label">
                      <a href={ex.quote.url} target="_blank" rel="noreferrer">{ex.quote.by}{ex.quote.role ? `, ${ex.quote.role}` : ""} ↗</a>
                    </footer>
                  </blockquote>
                )}
                <Link href={`/work/${p.slug}`} className="pill">{p.videos.length || ex.videos?.length ? "Watch the film" : "See the work"}</Link>
              </div>
            </article>
          ))}
        </section>

        {/* The full index, in order */}
        <section className="v2-index" aria-label="All work" data-reveal>
          <h2 className="label">All work</h2>
          <WorkIndex rows={rows} />
          <p className="clients">{clients}</p>
        </section>

        {/* Philosophy */}
        <section className="v2-philo" aria-label="Philosophy" data-reveal>
          <h2>Philosophy</h2>
          <ol>
            {manifesto.map((m) => <li key={m}>{m}</li>)}
          </ol>
          <blockquote>
            “{quote.text}”
            <footer className="label">{quote.by}</footer>
          </blockquote>
        </section>
      </main>
      <footer className="v2-foot label">
        <span>Randall Bourquin</span>
        <nav aria-label="Footer"><Link href="/">Work</Link><Link href="/worker">Worker</Link></nav>
      </footer>
    </div>
  );
}
