import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import VideoFacade from "@/components/VideoFacade";
import { projects } from "@/content/projects";
import { indexCopy } from "@/content/index-copy";
import { embedUrl, heroFor, posterFor } from "@/lib/media";

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
  const next = projects[(i + 1) % projects.length];
  const raw = await Promise.all(p.videos.map(posterFor));
  // A private or unlisted Vimeo may return no thumbnail: fall back to a sibling poster or the first still.
  const fallback = raw.find(Boolean) ?? p.images[0] ?? null;
  const posters = raw.map((x) => x ?? fallback);
  // With films, the poster is the hero; otherwise the first still is.
  const hero = p.videos.length ? null : await heroFor(p);
  const gallery = p.videos.length ? p.images : p.images.slice(1);
  const n = (k: number) => String(k + 1).padStart(2, "0");

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
            <img src={hero} alt={`${p.title}`} />
          </div>
        ) : null}

        {p.videos.length ? (
          <section className={`media${p.videos.length > 1 ? " two" : ""}`} aria-label="Films" style={{ paddingTop: 0 }}>
            {p.videos.map((v, k) => (
              <div key={v.id}>
                <VideoFacade src={embedUrl(v)} poster={posters[k]} title={`${p.title}${v.label ? `: ${v.label}` : ""}`} />
                {v.label ? <div className="label vlabel">{v.label}</div> : null}
              </div>
            ))}
          </section>
        ) : null}

        <section className="case-body">
          <div className="side label">
            <div>{p.client}</div>
            <div>{p.tag}</div>
            {indexCopy[p.slug]?.caption && indexCopy[p.slug].caption !== p.tag ? <div>{indexCopy[p.slug].caption}</div> : null}
          </div>
          <div className="copy">
            {p.body.map((t, k) => (
              <p key={k}>{t}</p>
            ))}
          </div>
        </section>

        {gallery.length ? (
          <section className={`media${gallery.length > 1 ? " two" : ""}`} aria-label="Stills">
            {gallery.map((src, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={`${p.title}, still ${k + 1}`} loading="lazy" />
            ))}
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
