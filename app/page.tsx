import Header from "@/components/Header";
import IndexWall, { type WallItem } from "@/components/IndexWall";
import { projects, manifesto, quote } from "@/content/projects";
import { indexCopy } from "@/content/index-copy";
import { heroFor } from "@/lib/media";

export default async function Home() {
  const items: WallItem[] = await Promise.all(
    projects.map(async (p) => {
      const c = indexCopy[p.slug];
      return {
        slug: p.slug,
        wall: c?.wall ?? p.title,
        client: p.client,
        caption: c?.caption ?? p.tag,
        teaser: c?.teaser ?? p.body[0],
        color: p.color,
        hero: await heroFor(p),
        cta: p.videos.length ? "Play film" : "See the work",
      };
    })
  );

  const tickerText = manifesto.join("  ✦  ");

  return (
    <>
      <a href="#work" className="skip">Skip to the work</a>
      <main id="work" className="index">
        <Header current="work" />
        <IndexWall items={items} initial={3} />
      </main>
      <div className="ticker" aria-hidden="true">
        <div>
          <span>{tickerText}</span>
          <span>{tickerText}</span>
        </div>
      </div>
      <section aria-label="Beliefs" className="quote" style={{ fontStyle: "normal", maxWidth: "40ch", paddingBottom: 24 }}>
        {manifesto.join(" ")}
      </section>
      <blockquote className="quote" style={{ margin: 0 }}>
        “{quote.text}”
        <footer className="label" style={{ fontStyle: "normal", marginTop: 16, color: "var(--dim)" }}>— {quote.by}</footer>
      </blockquote>
    </>
  );
}
