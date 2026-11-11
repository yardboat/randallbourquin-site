import Link from "next/link";
import Header from "@/components/Header";
import FrameLoop, { type Frame } from "@/components/v2/FrameLoop";
import MotionToggle from "@/components/v2/MotionToggle";
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
  const posters = (await Promise.all([...p.videos, ...(ex.videos ?? [])].map(posterFor))).filter((x): x is string => !!x);
  const all = [...p.images.slice(0, 1), ...posters.slice(0, 1), ...(ex.images ?? []), ...p.images.slice(1), ...posters.slice(1)];
  return [...new Set(all)].slice(0, 5);
}

const n2 = (i: number) => String(i + 1).padStart(2, "0");

export default async function Home() {
  const all = await Promise.all(
    projects.map(async (p, i) => ({ p, i, copy: indexCopy[p.slug], ex: extras[p.slug] ?? {}, stills: await stills(p) }))
  );
  const leads = LEADS.map((s) => all.find((x) => x.p.slug === s)!).filter(Boolean);

  const tiles = (dup: boolean) =>
    all.map(({ p, i, copy, stills }) => (
      <li key={p.slug + (dup ? "-b" : "")} aria-hidden={dup || undefined}>
        <Link href={`/work/${p.slug}`} className="v2-tile" tabIndex={dup ? -1 : undefined}>
          <span className="pic" style={{ ["--c" as string]: p.color }}>
            {stills[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...frame(stills[0], false)} sizes="(max-width: 860px) 72vw, 30vw" alt="" loading={i < 4 && !dup ? "eager" : "lazy"} className={stills[0].endsWith("#scope") ? "scope" : ""} />
            )}
          </span>
          <span className="cap">
            <span className="label n">{n2(i)}</span>
            <span className="t">{copy?.wall ?? p.title}</span>
            <span className="label k">{copy?.caption ?? p.tag}</span>
          </span>
        </Link>
      </li>
    ));

  return (
    <div className="v2">
      <a href="#leads" className="skip">Skip to the work</a>
      <Header current="work" />
      <main>
        {/* Name, then the work in motion */}
        <section className="v2-hero" aria-label="Randall Bourquin">
          <div className="v2-top">
            <span className="label">Work, {all.length} projects</span>
            <MotionToggle />
          </div>
          <h1 className="v2-name">
            <span><b>Randall</b></span> <span><b>Bourquin</b></span>
          </h1>
          <div className="v2-mq">
            <ul className="track">
              {tiles(false)}
              {tiles(true)}
            </ul>
          </div>
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
          <ol>
            {all.map(({ p, i, copy }) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`}>
                  <span className="label n">{n2(i)}</span>
                  <span className="t">{copy?.wall ?? p.title}</span>
                  <span className="label c">{p.client}</span>
                  <span className="label k">{copy?.caption ?? p.tag}</span>
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
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
