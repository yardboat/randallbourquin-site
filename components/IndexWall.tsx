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

type Props = { items: WallItem[]; manifesto: string[]; clients: string };

// The Index: every project on one wall, plus "Philosophy" as the emphasized last entry.
// Text never sits on images: the wall is on paper, the media lives in its own panel.
export default function IndexWall({ items, manifesto, clients }: Props) {
  const PHILO = items.length;
  const [active, setActive] = useState(PHILO);
  const router = useRouter();
  const cur = active === PHILO ? null : items[active];

  // Touch has no hover: first tap previews, second tap opens the case.
  function onTap(e: React.MouseEvent<HTMLAnchorElement>, i: number) {
    const touch = (e.nativeEvent as PointerEvent).pointerType === "touch";
    if (i === PHILO || (touch && i !== active)) {
      e.preventDefault();
      setActive(i);
    }
  }

  const n = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div className="index">
      <section className="wall" aria-labelledby="wall-h">
        <h2 id="wall-h" className="sr">All work</h2>
        <ol>
          {items.map((it, i) => (
            <li key={it.slug}>
              <Link
                href={`/work/${it.slug}`}
                className={i === active ? "on" : ""}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={(e) => onTap(e, i)}
              >
                <sup>{n(i)}</sup>
                {it.wall}
              </Link>
              <span className="sl" aria-hidden="true">/</span>
            </li>
          ))}
          <li>
            <a
              href="#philosophy"
              className={`philo${active === PHILO ? " on" : ""}`}
              onMouseEnter={() => setActive(PHILO)}
              onFocus={() => setActive(PHILO)}
              onClick={(e) => onTap(e, PHILO)}
            >
              Philosophy
            </a>
          </li>
        </ol>
        <p className="clients label">{clients}</p>
      </section>

      <aside className="panel" aria-live="polite">
        {cur ? (
          <>
            <div className="frame" style={{ ["--c" as string]: cur.color }}>
              {items.map((it, i) =>
                it.hero ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={it.slug}
                    src={it.hero}
                    alt={i === active ? it.wall : ""}
                    className={i === active ? "on" : ""}
                    loading={i < 4 ? "eager" : "lazy"}
                    decoding="async"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                  />
                ) : null
              )}
            </div>
            <div className="info">
              <div className="label meta">
                {n(active)} / {items.length} · {cur.client}
              </div>
              <div className="label">{cur.caption}</div>
              <p className="teaser">{cur.teaser}</p>
              <button className="pill" onClick={() => router.push(`/work/${cur.slug}`)}>
                {cur.cta} →
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="philosophy" id="philosophy">
              <div className="label meta" style={{ marginBottom: 12 }}>Philosophy · what I believe</div>
              <ol>
                {manifesto.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ol>
            </div>
            <div className="info">
              <p className="teaser" style={{ fontStyle: "italic" }}>
                “Advertisers are the interpreters of our dreams.”
              </p>
              <div className="label" style={{ color: "var(--dim)" }}>E.B. White, 1936</div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
