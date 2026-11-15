import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import VideoFacade from "@/components/VideoFacade";
import { projects } from "@/content/projects";
import { extras } from "@/content/extras";
import { indexCopy } from "@/content/index-copy";
import { embedUrl, heroFor, posterFor } from "@/lib/media";
import { opt } from "@/lib/intro";
import "@/app/v2.css";
import "@/app/case.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const hero = await heroFor(p);
  return { title: p.title, description: p.body[0], openGraph: { title: p.title, images: hero ? [hero] : [] } };
}

const n2 = (k: number) => String(k + 1).padStart(2, "0");

// Widths must be ones Next's optimizer allows (its deviceSizes), or it answers 400.
const WIDTHS = [828, 1200, 1920];
const srcSet = (raw: string) => WIDTHS.map((w) => `${opt(raw, w)} ${w}w`).join(", ");

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const x = extras[p.slug] ?? {};
  const nextI = (i + 1) % projects.length;
  const next = projects[nextI];

  const videos = [...p.videos, ...(x.videos ?? [])];
  const images = [...p.images, ...(x.images ?? [])];
  const raw = await Promise.all(videos.map(posterFor));
  // A private or unlisted Vimeo may return no thumbnail: fall back to a sibling poster or the first still.
  const fallback = raw.find(Boolean) ?? images[0] ?? null;
  const posters = raw.map((r) => r ?? fallback);
  // With films, the lead film is the hero; otherwise the first still is.
  const hero = videos.length ? null : images[0] ?? null;
  // When a film has no poster of its own, a still stands in for it — so don't show that still twice.
  const leadFromStill = !!videos.length && !raw[0] && !!images[0] && fallback === images[0];
  const gallery = videos.length ? (leadFromStill ? images.slice(1) : images) : images.slice(1);
  const [lead, ...more] = videos;
  const caption = indexCopy[p.slug]?.caption;
  const scope = caption && caption !== p.tag ? caption : null;
  // The award says it better: drop any part of the proof line the award already carries (e.g. "Silver Clio").
  const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const proof = p.tag
    .split("·")
    .map((t) => t.trim())
    .filter((t) => t && !(x.award && norm(x.award).includes(norm(t))))
    .join(" · ");

  return (
    <div className="v2 v2-case">
      <a href="#case" className="skip">Skip to the case</a>
      <Header current="work" />
      <main id="case">
        <section className="c-head">
          <p className="c-eyebrow label">
            <Link href="/">← All work</Link>
            <span className="n">{n2(i)} <i>/ {n2(projects.length - 1)}</i></span>
            <span>{p.client}</span>
          </p>
          <h1>{p.title}</h1>
          <div className="c-metarow">
            {proof ? <p className="c-proof label">{proof}</p> : null}
            {x.award ? <p className="c-award label">★ {x.award}</p> : null}
          </div>
        </section>

        {lead ? (
          <section className="c-stage" aria-label="Lead film" data-reveal>
            <VideoFacade src={embedUrl(lead)} poster={posters[0]} title={`${p.title}${lead.label ? `: ${lead.label}` : ""}`} />
            {lead.label ? <div className="vlabel label">{lead.label}</div> : null}
          </section>
        ) : hero ? (
          <section className="c-stage" aria-label="Lead image" data-reveal>
            <div className="c-frame c-still" style={{ ["--c" as string]: p.color }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={opt(hero.replace(/#scope$/, ""), 1920)} alt={p.title} />
            </div>
          </section>
        ) : null}

        <section className="c-body" data-reveal>
          <dl className="c-side label">
            <div>
              <dt>Client</dt>
              <dd>{p.client}</dd>
            </div>
            {scope ? (
              <div>
                <dt>Scope</dt>
                <dd>{scope}</dd>
              </div>
            ) : null}
            {videos.length ? (
              <div>
                <dt>Films</dt>
                <dd>{videos.length}</dd>
              </div>
            ) : null}
            {gallery.length ? (
              <div>
                <dt>Stills</dt>
                <dd>{gallery.length}</dd>
              </div>
            ) : null}
          </dl>
          <div className="c-copy">
            {p.body.map((t, k) => (
              <p key={k}>{t}</p>
            ))}
          </div>
        </section>

        {x.quote ? (
          <figure className="c-pull" data-reveal>
            <blockquote>“{x.quote.text.replace(/^[“"]|[”"]$/g, "")}”</blockquote>
            <figcaption className="label">
              <a href={x.quote.url} target="_blank" rel="noopener noreferrer">
                {x.quote.by}
                {x.quote.role ? `, ${x.quote.role}` : ""} ↗
              </a>
            </figcaption>
          </figure>
        ) : null}

        {more.length ? (
          <section className="c-media" aria-label="More films" data-reveal>
            <h2 className="c-kicker label">More film</h2>
            <div className={`c-grid${more.length > 1 ? " two" : ""}`}>
              {more.map((v, k) => (
                <div key={v.id}>
                  <VideoFacade src={embedUrl(v)} poster={posters[k + 1]} title={`${p.title}${v.label ? `: ${v.label}` : ""}`} />
                  {v.label ? <div className="vlabel label">{v.label}</div> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {gallery.length ? (
          <section className="c-media" aria-label="Stills" data-reveal>
            <h2 className="c-kicker label">Stills</h2>
            <div className={`c-grid${gallery.length > 1 ? " two" : ""}`}>
              {gallery.map((src, k) => (
                <span key={src} className={`c-shot${src.endsWith("#scope") ? " scope" : ""}`} style={{ ["--c" as string]: p.color }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={opt(src.replace(/#scope$/, ""), 1920)}
                    srcSet={srcSet(src.replace(/#scope$/, ""))}
                    sizes={gallery.length > 1 ? "(max-width: 860px) 100vw, 50vw" : "100vw"}
                    alt={`${p.title}, still ${k + 1}`}
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {x.press?.length ? (
          <section className="c-press" aria-label="Press" data-reveal>
            <h2 className="c-kicker label">In the press</h2>
            <ul>
              {x.press.map((pr) => (
                <li key={pr.url}>
                  <a href={pr.url} target="_blank" rel="noopener noreferrer">
                    <span className="o label">{pr.outlet}</span>
                    <span className="t">{pr.title}</span>
                    <span className="arr" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <Link href={`/work/${next.slug}`} className="c-next">
          <span className="k label">Next · {n2(nextI)}</span>
          <span className="t">{indexCopy[next.slug]?.wall ?? next.title} →</span>
        </Link>
      </main>
      <footer className="v2-foot label">
        <span>Randall Bourquin</span>
        <nav aria-label="Footer"><Link href="/">Work</Link><Link href="/worker">Worker</Link></nav>
      </footer>
    </div>
  );
}
