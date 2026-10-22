import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import VideoFacade from "@/components/VideoFacade";
import { projects } from "@/content/projects";
import { extras } from "@/content/extras";
import { indexCopy } from "@/content/index-copy";
import { embedUrl, heroFor, posterFor } from "@/lib/media";
import { opt } from "@/lib/intro";

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

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const x = extras[p.slug] ?? {};
  const next = projects[(i + 1) % projects.length];

  const videos = [...p.videos, ...(x.videos ?? [])];
  const images = [...p.images, ...(x.images ?? [])];
  const raw = await Promise.all(videos.map(posterFor));
  // A private or unlisted Vimeo may return no thumbnail: fall back to a sibling poster or the first still.
  const fallback = raw.find(Boolean) ?? images[0] ?? null;
  const posters = raw.map((r) => r ?? fallback);
  // With films, the lead film is the hero; otherwise the first still is.
  const hero = videos.length ? null : images[0] ?? null;
  const gallery = videos.length ? images : images.slice(1);
  const [lead, ...more] = videos;
  const n = (k: number) => String(k + 1).padStart(2, "0");
  const caption = indexCopy[p.slug]?.caption;

  return (
    <>
      <Header current="work" />
      <main>
        <section className="case-head">
          <div className="label k">
            {n(i)} / {projects.length} · {p.client}
          </div>
          <h1>{p.title}</h1>
          <Link href="/" className="label back">← All work</Link>
        </section>

        {hero ? (
          <div className="case-hero" style={{ ["--c" as string]: p.color }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={opt(hero, 1920)} alt={p.title} />
          </div>
        ) : null}

        {lead ? (
          <section className="media" aria-label="Lead film" style={{ paddingTop: 0 }}>
            <div>
              <VideoFacade src={embedUrl(lead)} poster={posters[0]} title={`${p.title}${lead.label ? `: ${lead.label}` : ""}`} />
              {lead.label ? <div className="label vlabel">{lead.label}</div> : null}
            </div>
          </section>
        ) : null}

        <section className="case-body">
          <div className="side label">
            <div>{p.client}</div>
            <div>{p.tag}</div>
            {caption && caption !== p.tag ? <div>{caption}</div> : null}
          </div>
          <div className="copy">
            {p.body.map((t, k) => (
              <p key={k}>{t}</p>
            ))}
          </div>
        </section>

        {x.quote ? (
          <figure className="pull">
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
          <section className={`media${more.length > 1 ? " two" : ""}`} aria-label="More films">
            {more.map((v, k) => (
              <div key={v.id}>
                <VideoFacade src={embedUrl(v)} poster={posters[k + 1]} title={`${p.title}${v.label ? `: ${v.label}` : ""}`} />
                {v.label ? <div className="label vlabel">{v.label}</div> : null}
              </div>
            ))}
          </section>
        ) : null}

        {gallery.length ? (
          <section className={`media${gallery.length > 1 ? " two" : ""}`} aria-label="Stills">
            {gallery.map((src, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={opt(src, 1920)} alt={`${p.title}, still ${k + 1}`} loading="lazy" />
            ))}
          </section>
        ) : null}

        {x.award || x.press?.length ? (
          <section className="press" aria-label="Recognition and press">
            {x.award ? <p className="award label">★ {x.award}</p> : null}
            {x.press?.length ? (
              <>
                <h2 className="label">In the press</h2>
                <ul>
                  {x.press.map((pr) => (
                    <li key={pr.url}>
                      <a href={pr.url} target="_blank" rel="noopener noreferrer">
                        <span className="label">{pr.outlet}</span>
                        <span className="t">{pr.title} ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>
        ) : null}

        <Link href={`/work/${next.slug}`} className="next">
          <span className="label" style={{ color: "var(--dim)" }}>Next · {n((i + 1) % projects.length)}</span>
          <span className="t">{indexCopy[next.slug]?.wall ?? next.title} →</span>
        </Link>
      </main>
    </>
  );
}
