"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type WallItem = {
  slug: string;
  wall: string;
  client: string;
  caption: string;
  teaser: string;
  color: string;
  hero: string | null;
  cta: string;
};

export default function IndexWall({ items, initial = 3 }: { items: WallItem[]; initial?: number }) {
  const [active, setActive] = useState(initial);
  const router = useRouter();
  const cur = items[active];

  // Touch: first tap previews (no hover on phones), second tap opens the case.
  function onTap(e: React.MouseEvent<HTMLAnchorElement>, i: number) {
    const touch = (e.nativeEvent as PointerEvent).pointerType === "touch";
    if (touch && i !== active) {
      e.preventDefault();
      setActive(i);
    }
  }

  return (
    <>
      <div className="stage" aria-hidden="true">
        <div className="field" style={{ backgroundColor: cur.color }} />
        {items.map((it, i) =>
          it.hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={it.slug} src={it.hero} alt="" className={i === active ? "on" : ""} loading={i < 4 ? "eager" : "lazy"} decoding="async" />
          ) : null
        )}
        <div className="veil" />
      </div>

      <section className="wall" aria-label="All work">
        <h2 className="label" style={{ position: "absolute", left: -9999 }}>All work</h2>
        <p>
          {items.map((it, i) => (
            <span key={it.slug}>
              <Link
                href={`/work/${it.slug}`}
                className={i === active ? "on" : ""}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={(e) => onTap(e, i)}
              >
                <sup>{String(i + 1).padStart(2, "0")}</sup>
                {it.wall}
              </Link>
              {i < items.length - 1 ? <span className="sl" aria-hidden="true">/</span> : null}
            </span>
          ))}
        </p>
      </section>

      <div className="foot" aria-live="polite">
        <div>
          <div className="label meta">
            {String(active + 1).padStart(2, "0")} / {items.length} · {cur.client} · {cur.caption}
          </div>
          <p className="teaser">{cur.teaser}</p>
        </div>
        <button className="pill" onClick={() => router.push(`/work/${cur.slug}`)}>
          {cur.cta} →
        </button>
      </div>
    </>
  );
}
