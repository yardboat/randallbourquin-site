"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type RingItem = { href: string; n: string; title: string; tag: string; color: string; src?: string; srcSet?: string; scope?: boolean };

const wrap = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;

/**
 * The work as a ring you stand inside: tiles sit on a cylinder around the camera, so the middle
 * recedes and the edges swing toward you. Drifts on its own, drag to spin. Decorative for assistive
 * tech (the "All work" list below is the accessible index).
 */
export default function Ring({ items }: { items: RingItem[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState(0);
  const step = 360 / items.length;

  useEffect(() => {
    const el = stage.current!, r = ring.current!;
    const tiles = [...r.children] as HTMLElement[];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0, vel = 0, hover = false, drag = false, lastX = 0, moved = 0, last = performance.now(), raf = 0, cur = -1, drift = reduce ? 0 : 3.2;
    const degPerPx = () => 57.3 / (parseFloat(getComputedStyle(el).perspective) || 460);

    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      const paused = document.documentElement.dataset.motion === "off";
      const target = reduce || paused || hover || drag ? 0 : 3.2;
      drift += (target - drift) * Math.min(1, dt * 4);
      if (!drag) { angle += (drift + vel) * dt; vel *= Math.pow(0.04, dt); }
      r.style.transform = `translateZ(var(--p)) rotateY(${angle.toFixed(3)}deg)`;
      for (let i = 0; i < tiles.length; i++) {
        const rel = Math.abs(wrap(angle - i * step));
        tiles[i].style.visibility = rel > 80 ? "hidden" : "visible";
      }
      const c = ((Math.round(angle / step) % items.length) + items.length) % items.length;
      if (c !== cur) { cur = c; setCenter(c); }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const down = (e: PointerEvent) => { drag = true; moved = 0; lastX = e.clientX; vel = 0; };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
      const d = -dx * degPerPx(); angle += d; vel = d * 60 * 0.6;
      if (moved > 6) el.classList.add("dragging");
    };
    const up = () => { drag = false; setTimeout(() => el.classList.remove("dragging"), 0); };
    const click = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } };
    const enter = () => (hover = true), leave = () => (hover = false);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [items.length, step]);

  const c = items[center];
  return (
    <>
      <div className="v2-stage" ref={stage} aria-hidden="true">
        <div className="v2-ring" ref={ring}>
          {items.map((it, i) => (
            <Link
              key={i}
              href={it.href}
              tabIndex={-1}
              draggable={false}
              className="v2-card"
              style={{ transform: `rotateY(${-(i * step)}deg) translateZ(calc(var(--p) * -1))`, ["--c" as string]: it.color }}
            >
              {it.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.src} srcSet={it.srcSet} sizes="(max-width: 860px) 40vw, 20vw" alt="" draggable={false} className={it.scope ? "scope" : ""} />
              ) : (
                <span className="ph">{it.title}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
      <p className="v2-now">
        <Link href={c.href}>
          <span className="label n">{c.n}</span>
          <span className="t">{c.title}</span>
          <span className="label k">{c.tag}</span>
        </Link>
      </p>
    </>
  );
}
