"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { INTRO_LABELS, INTRO_MODES, opt, type IntroMode } from "@/lib/intro";

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
type Phase = "off" | "load" | "run" | "land" | "out";

// Contact sheet: the order tiles pop in (deterministic scatter across the 5×3 grid).
const SCATTER = [6, 0, 11, 3, 13, 8, 1, 10, 4, 14, 7, 2, 12, 5, 9];

// The Index: every project on one wall, plus "Philosophy" as the emphasized last entry.
// Text never sits on images: the wall is on paper, the media lives in its own panel.
export default function IndexWall({ items, manifesto, clients }: Props) {
  const N = items.length;
  const PHILO = N;
  const ALL = N + 1;
  const [active, setActive] = useState(PHILO);
  const router = useRouter();

  // ---------- Intro state ----------
  const [mode, setMode] = useState<IntroMode | null>(null);
  const [review, setReview] = useState<IntroMode | null>(null);
  const [phase, setPhase] = useState<Phase>("off");
  const [revealed, setRevealed] = useState(ALL); // titles visible on the wall
  const [frame, setFrame] = useState(0); // reel: current frame · sheet: tiles popped
  const [gone, setGone] = useState(0); // sheet: tiles dissolved into titles
  const [box, setBox] = useState<React.CSSProperties | undefined>();
  const timers = useRef<number[]>([]);
  const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
  const intro = mode !== null && phase !== "off";

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRevealed(ALL);
    setActive(PHILO);
    setPhase("off");
    setMode(null);
    setBox(undefined);
    try {
      sessionStorage.setItem("rb-intro", "1");
    } catch {}
  }, [ALL, PHILO]);

  // Boot: the inline script decided whether an intro plays (URL, default, session, reduced motion).
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("intro") as IntroMode | null;
    if (q && INTRO_MODES.includes(q)) setReview(q);
    const m = document.documentElement.getAttribute("data-intro") as IntroMode | null;
    if (!m || !INTRO_MODES.includes(m)) {
      document.documentElement.removeAttribute("data-intro");
      return;
    }
    setMode(m);
    setRevealed(0);
    setActive(m === "roll" ? 0 : PHILO);
    setPhase("load");
  }, [PHILO]);

  // Once React has rendered the intro state, lift the pre-paint mask.
  useLayoutEffect(() => {
    if (phase !== "off") document.documentElement.removeAttribute("data-intro");
  }, [phase]);

  // Preload every hero (capped wait), then run.
  useEffect(() => {
    if (phase !== "load") return;
    let started = false;
    const go = () => {
      if (!started) {
        started = true;
        setPhase("run");
      }
    };
    Promise.all(
      items
        .filter((it) => it.hero)
        .map((it) => {
          const im = new Image();
          im.src = opt(it.hero as string);
          return im.decode().catch(() => undefined);
        })
    ).then(go);
    const t = window.setTimeout(go, 1600);
    return () => clearTimeout(t);
  }, [phase, items]);

  // Choreography.
  const running = phase === "run";
  useEffect(() => {
    if (!running || !mode) return;
    if (mode === "reel") {
      // Full-screen cuts that accelerate like a reel spinning up, then the frame docks into the panel.
      let t = 150;
      for (let k = 0; k < N; k++) {
        at(t, () => setFrame(k));
        t += 300 - (190 * k) / (N - 1);
      }
      at(t, () => {
        const r = document.querySelector(".panel")?.getBoundingClientRect();
        if (r) setBox({ top: r.top, left: r.left, width: r.width, height: r.height });
        setPhase("land");
        for (let k = 0; k < ALL; k++) at(k * 35, () => setRevealed(k + 1));
      });
      at(t + 750, () => setPhase("out"));
      at(t + 1050, finish);
    } else if (mode === "roll") {
      // Titles arrive one at a time; each lights up and takes over the panel.
      const step = 200;
      for (let k = 0; k < N; k++)
        at(250 + k * step, () => {
          setRevealed(k + 1);
          setActive(k);
        });
      const tp = 250 + N * step + 150;
      at(tp, () => {
        setRevealed(ALL);
        setActive(PHILO);
      });
      at(tp + 650, finish);
    } else {
      // Everything at once as a contact sheet, then each frame dissolves into its title.
      SCATTER.forEach((_, j) => at(150 + j * 65, () => setFrame(j + 1)));
      const c0 = 150 + ALL * 65 + 350 + 450;
      at(c0, () => setPhase("land"));
      for (let k = 0; k < ALL; k++)
        at(c0 + k * 95, () => {
          setGone(k + 1);
          setRevealed(k + 1);
        });
      at(c0 + ALL * 95 + 400, finish);
    }
    // Phase changes inside the run (land/out) must not cancel the schedule; finish() owns cleanup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, mode]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Any input skips straight to the Index.
  useEffect(() => {
    if (!intro) return;
    const skip = (e: Event) => {
      if ((e.target as HTMLElement | null)?.closest?.(".intro-review")) return;
      finish();
    };
    const evs = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    evs.forEach((ev) => window.addEventListener(ev, skip, { passive: true }));
    return () => evs.forEach((ev) => window.removeEventListener(ev, skip));
  }, [intro, finish]);

  // ---------- Index interactions ----------
  // Touch has no hover: first tap previews, second tap opens the case.
  // Phones fire emulated mouseenter/focus before click, so remember the pointer type
  // and whether this title was already active at pointerdown.
  const ptr = useRef<string>("mouse");
  const wasActive = useRef(false);
  const down = (i: number) => (e: React.PointerEvent) => {
    ptr.current = e.pointerType;
    wasActive.current = i === active;
  };
  const preview = (i: number) => () => {
    if (!intro && ptr.current !== "touch") setActive(i);
  };
  function onTap(e: React.MouseEvent<HTMLAnchorElement>, i: number) {
    const touch = ptr.current === "touch";
    if (i === PHILO || (touch && !wasActive.current)) {
      e.preventDefault();
      setActive(i);
    }
  }

  const cur = active === PHILO ? null : items[active];
  const n = (i: number) => String(i + 1).padStart(2, "0");
  const pre = (k: number) => (k >= revealed ? "pre" : "");

  return (
    <div className="index">
      <section className={`wall${intro ? " intro" : ""}`} aria-labelledby="wall-h">
        <h2 id="wall-h" className="sr">All work</h2>
        <ol>
          {items.map((it, i) => (
            <li key={it.slug} className={pre(i)}>
              <Link
                href={`/work/${it.slug}`}
                className={i === active ? "on" : ""}
                onPointerDown={down(i)}
                onMouseEnter={preview(i)}
                onFocus={preview(i)}
                onClick={(e) => onTap(e, i)}
              >
                <sup>{n(i)}</sup>
                {it.wall}
              </Link>
              <span className="sl" aria-hidden="true">/</span>
            </li>
          ))}
          <li className={pre(PHILO)}>
            <a
              href="#philosophy"
              className={`philo${active === PHILO ? " on" : ""}`}
              onPointerDown={down(PHILO)}
              onMouseEnter={preview(PHILO)}
              onFocus={preview(PHILO)}
              onClick={(e) => onTap(e, PHILO)}
            >
              Philosophy
            </a>
          </li>
        </ol>
        <p className={`clients label${revealed < ALL ? " pre" : ""}`}>{clients}</p>
      </section>

      <aside className={`panel${intro ? " intro" : ""}`} aria-live="polite">
        {cur ? (
          <>
            <div className="frame" style={{ ["--c" as string]: cur.color }}>
              {items.map((it, i) =>
                it.hero ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={it.slug}
                    src={opt(it.hero)}
                    alt={i === active ? it.wall : ""}
                    className={i === active ? "on" : ""}
                    loading="eager"
                    fetchPriority={i === active ? "high" : "low"}
                    decoding="async"
                  />
                ) : null
              )}
            </div>
            <div className="info">
              <div className="label meta">
                {n(active)} / {N} · {cur.client}
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
                {manifesto.map((m, k) => (
                  <li key={m} style={{ ["--i" as string]: k }}>
                    {m}
                  </li>
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

      {/* ---------- Intro overlays ---------- */}
      {mode === "reel" && intro ? (
        <div className={`intro-reel ${phase}`} style={box} aria-hidden="true">
          {items.map((it, k) =>
            it.hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={it.slug} src={opt(it.hero)} alt="" className={phase !== "load" && k === frame ? "on" : ""} />
            ) : null
          )}
          <div className="intro-bar">
            <span className="label">Randall Bourquin · {n(frame)} / {N}</span>
            <span className="t">{phase === "load" ? "" : items[frame].wall}</span>
          </div>
        </div>
      ) : null}

      {mode === "sheet" && intro ? (
        <div className={`intro-sheet ${phase}`} aria-hidden="true">
          {[...items, null].map((it, k) => {
            const shown = SCATTER.indexOf(k) < frame;
            const cls = `tile${shown ? " in" : ""}${k < gone ? " gone" : ""}${it ? "" : " philo"}`;
            return it ? (
              <div key={it.slug} className={cls} style={{ ["--c" as string]: it.color }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {it.hero ? <img src={opt(it.hero)} alt="" /> : null}
                <span className="tile-n label">{n(k)}</span>
              </div>
            ) : (
              <div key="philo" className={cls}>
                <span>Philosophy</span>
              </div>
            );
          })}
        </div>
      ) : null}

      {intro ? (
        <button className="intro-skip label" onClick={finish}>
          Skip intro →
        </button>
      ) : null}

      {review ? (
        <nav className="intro-review label" aria-label="Intro concepts (review only)">
          <span>Intro</span>
          {INTRO_MODES.map((m) => (
            <a key={m} href={`/?intro=${m}`} aria-current={m === review ? "true" : undefined}>
              {INTRO_LABELS[m]}
            </a>
          ))}
          <a href={`/?intro=${review}`}>↻ Replay</a>
        </nav>
      ) : null}
    </div>
  );
}
