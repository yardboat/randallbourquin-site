import Header from "@/components/Header";
import IndexWall, { type WallItem } from "@/components/IndexWall";
import { projects, manifesto, clients } from "@/content/projects";
import { indexCopy } from "@/content/index-copy";
import { heroFor } from "@/lib/media";
import { introBootScript } from "@/lib/intro";

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

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      <a href="#work" className="skip">Skip to the work</a>
      <Header current="work" />
      <main id="work">
        <IndexWall items={items} manifesto={manifesto} clients={clients} />
      </main>
    </>
  );
}
