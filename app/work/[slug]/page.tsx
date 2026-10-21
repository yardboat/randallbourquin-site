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
  const hero = await heroFor(p);
  const posters = await Promise.all(p.videos.map(posterFor));
  const gallery = p.images.slice(p.images.length > 1 ? 1 : 0);

  return (
    <main>
      <Header current="work" />
      <section className="case-hero" style={{ backgroundColor: p.color }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {hero ? <img src={hero} alt="" /> : null}
        <div className="veil" />
        <div className="label" style={{ color: "var(--accent)" }}>
          {String(i + 1).padStart(2, "0")} / {projects.length} · {p.client}
        </div>
        <h1>{p.title}</h1>
      </section>

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

      {p.videos.length ? (
        <section className={`media${p.videos.length > 1 ? " two" : ""}`} aria-label="Films">
          {p.videos.map((v, k) => (
            <div key={v.id}>
              <VideoFacade src={embedUrl(v)} poster={posters[k]} title={`${p.title}${v.label ? ` — ${v.label}` : ""}`} />
              {v.label ? <div className="label vlabel">{v.label}</div> : null}
            </div>
          ))}
        </section>
      ) : null}

      {gallery.length ? (
        <section className={`media${gallery.length > 1 ? " two" : ""}`} aria-label="Stills">
          {gallery.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`${p.title} still`} loading="lazy" />
          ))}
        </section>
      ) : null}

      <Link href={`/work/${next.slug}`} className="next">
        <span className="label" style={{ color: "var(--dim)" }}>Next · {String(((i + 1) % projects.length) + 1).padStart(2, "0")}</span>
        <span className="t">{indexCopy[next.slug]?.wall ?? next.title} →</span>
      </Link>
    </main>
  );
}
