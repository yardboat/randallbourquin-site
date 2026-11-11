"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type RingItem = { href: string; n: string; title: string; client: string; tag: string; color: string; src?: string; srcSet?: string; scope?: boolean; heroSrc?: string; heroSrcSet?: string };

const wrap = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;
const HOLD = 2800; // ms each project holds the centre

/**
 * The work as a ring you stand inside. Tiles curve past the camera in full colour and smear into
 * glass at the edges (blur plus colour fringing). Whichever project is centred is shown whole, flat
 * and sharp in the lens at the middle, and named below. Drag, arrows or click a tile to turn it.
 * Decorative for assistive tech: the "All work" list below is the accessible index.
 */
export default function Ring({ items, total }: { items: RingItem[]; total: number }) {
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const api = useRef<{ go: (d: number) => void; to: (i: number) => void }>({ go() {}, to() {} });
  const [center, setCenter] = useState(0);
  const n = items.length;
  const step = 360 / n;

  useEffect(() => {
    const el = stage.current!, r = ring.current!;
    const tiles = [...r.children] as HTMLElement[];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Arrive already turning: the ring spins in from four projects back and settles on the first.
    let angle = reduce ? 0 : -4 * step, goal = 0, vel = 0;
    let hover = false, drag = false, lastX = 0, moved = 0, held = 0, cur = -1, raf = 0, last = performance.now();
    let tilt = 0, tiltGoal = 0;
    const degPerPx = () => 57.3 / (parseFloat(getComputedStyle(el).perspective) || 460);

    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      const paused = document.documentElement.dataset.motion === "off";
      if (!drag) {
        angle += (goal * step - angle) * (1 - Math.exp(-dt * 5.5));
        if (!reduce && !paused && !hover && Math.abs(goal * step - angle) < 0.4) {
          held += dt * 1000;
          if (held > HOLD) { goal += 1; held = 0; }
        }
      }
      tilt += (tiltGoal - tilt) * Math.min(1, dt * 6);
      r.style.transform = `translateZ(var(--p)) rotateX(${tilt.toFixed(2)}deg) rotateY(${angle.toFixed(3)}deg)`;
      for (let i = 0; i < n; i++) {
        const a = Math.abs(wrap(angle - i * step));
        const t = tiles[i];
        t.style.visibility = a > 84 ? "hidden" : "visible";
        const g = a > 70 ? "g3" : a > 58 ? "g2" : a > 45 ? "g1" : "";
        if (t.dataset.g !== g) t.dataset.g = g;
      }
      const c = (((Math.round(angle / step) % n) + n) % n);
      if (c !== cur) { cur = c; setCenter(c); }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    api.current = {
      go: (d) => { goal = Math.round(goal) + d; held = 0; },
      to: (i) => { goal = Math.round(goal) + Math.round(wrap(i * step - goal * step) / step); held = 0; },
    };

    const down = (e: PointerEvent) => { if (e.button) return; drag = true; moved = 0; lastX = e.clientX; vel = 0; };
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      if (e.pointerType === "mouse" && !reduce) tiltGoal = e.clientY > b.top - 80 && e.clientY < b.bottom + 80 ? ((e.clientY - (b.top + b.height / 2)) / b.height) * -3.5 : 0;
      if (!drag) return;
      const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
      const d = -dx * degPerPx(); angle += d; vel = d;
      if (moved > 6) el.classList.add("dragging");
    };
    const up = () => {
      if (!drag) return;
      drag = false; held = 0;
      goal = Math.round((angle + vel * 9) / step); // a flick carries it on, then it snaps to a project
      setTimeout(() => el.classList.remove("dragging"), 0);
    };
    const click = (e: MouseEvent) => {
      if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; return; }
      const a = (e.target as HTMLElement).closest<HTMLElement>(".v2-card");
      if (!a) return;
      const i = tiles.indexOf(a);
      e.preventDefault(); api.current.to(i); // tiles come to the centre; the lens opens the case
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") api.current.go(1);
      if (e.key === "ArrowLeft") api.current.go(-1);
    };
    const enter = () => (hover = true), leave = () => { hover = false; held = 0; };
    const nodrag = (e: Event) => e.preventDefault();
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    el.addEventListener("dragstart", nodrag);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    window.addEventListener("keydown", key);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
      el.removeEventListener("dragstart", nodrag);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      window.removeEventListener("keydown", key);
    };
  }, [n, step]);

  const c = items[center];
  return (
    <>
      {/* Glass: horizontal smear with the red and blue channels pulled apart, in three strengths. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        {[[1.4, 2], [3.2, 4.5], [6, 8]].map(([blur, dx], k) => (
          <filter key={k} id={`rb-glass${k + 1}`} x="-25%" y="-6%" width="150%" height="112%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation={`${blur} ${blur * 0.12}`} result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feOffset in="r" dx={-dx} result="ro" />
            <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="bl" />
            <feOffset in="bl" dx={dx} result="bo" />
            <feBlend in="ro" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="bo" mode="screen" />
          </filter>
        ))}
      </svg>
      <div className="v2-stage" ref={stage} aria-hidden="true">
        <div className="v2-ring" ref={ring}>
          {items.map((it, i) => (
            <Link key={i} href={it.href} tabIndex={-1} draggable={false} className="v2-card" style={{ transform: `rotateY(${-(i * step)}deg) translateZ(calc(var(--p) * -1))`, ["--c" as string]: it.color }}>
              <span className="ph">{it.title}</span>
              {it.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.src} alt="" draggable={false} className={it.scope ? "scope" : ""} onError={(e) => (e.currentTarget.style.display = "none")} />
              )}
            </Link>
          ))}
        </div>
        <Link href={c.href} tabIndex={-1} draggable={false} className="v2-lens">
          {items.map((it, i) => {
            const d = Math.min(Math.abs(i - center), n - Math.abs(i - center));
            if (d > 1) return null; // current plus neighbours, so the next one is already loaded
            return (
              <span key={i} className={"shot" + (i === center ? " on" : "")} style={{ ["--c" as string]: it.color }}>
                {it.heroSrc ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="fill" src={it.src} alt="" draggable={false} />
                    <span className={"whole" + (it.scope ? " scope" : "")}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.heroSrc} srcSet={it.heroSrcSet} sizes="(max-width: 860px) 70vw, 30vw" alt="" draggable={false} />
                    </span>
                  </>
                ) : (
                  <b>{it.title}</b>
                )}
              </span>
            );
          })}
        </Link>
      </div>
      <div className="v2-now">
        <button type="button" className="v2-arrow" aria-label="Previous project" onClick={() => api.current.go(-1)}>←</button>
        <Link href={c.href} className="v2-nowlink" key={c.href}>
          <span className="label n">{c.n} <i>/ {String(total).padStart(2, "0")}</i> · {c.client}</span>
          <span className="t">{c.title}</span>
          <span className="label k">{c.tag}</span>
          <span className="pill">Open the case</span>
        </Link>
        <button type="button" className="v2-arrow" aria-label="Next project" onClick={() => api.current.go(1)}>→</button>
      </div>
    </>
  );
}
