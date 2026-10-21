import type { Project, Video } from "@/content/projects";

/** Poster for a video. YouTube is deterministic; Vimeo is resolved via oEmbed at build time. */
export async function posterFor(v: Video): Promise<string | null> {
  if (v.provider === "youtube") return `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;
  try {
    const r = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${v.id}`)}&width=1920`,
      { next: { revalidate: 86400 } }
    );
    if (!r.ok) return null;
    const j = (await r.json()) as { thumbnail_url?: string };
    return j.thumbnail_url ?? null;
  } catch {
    // Fail soft: no poster means the project falls back to its color field.
    return null;
  }
}

/** Hero image: the first still if there is one, otherwise the first video's poster. */
export async function heroFor(p: Project): Promise<string | null> {
  if (p.images[0]) return p.images[0];
  if (p.videos[0]) return posterFor(p.videos[0]);
  return null;
}

export function embedUrl(v: Video): string {
  return v.provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`
    : `https://player.vimeo.com/video/${v.id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`;
}
