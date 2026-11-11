"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Row = { href: string; n: string; title: string; client: string; tag: string; color: string; src?: string; scope?: boolean };

/** The full list. On a mouse, each row's picture follows the cursor; on touch each row carries its own thumbnail. */
export default function WorkIndex({ rows }: { rows: Row[] }) {
  const list = useRef<HTMLOListElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(-1);

  useEffect(() => {
    const f = float.current!, l = list.current!;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, rot = 0;
    const tick = () => {
      const dx = tx - x; x += dx * 0.16; y += (ty - y) * 0.16; rot += (Math.max(-7, Math.min(7, dx * 0.12)) - rot) * 0.2;
      f.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    // Coordinates are relative to the section, which is the float's containing block.
    const move = (e: PointerEvent) => { const b = f.parentElement!.getBoundingClientRect(); tx = e.clientX - b.left; ty = e.clientY - b.top; };
    l.addEventListener("pointermove", move);
    raf = requestAnimationFrame(tick);
    return () => { l.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <ol ref={list} onMouseLeave={() => setOn(-1)}>
        {rows.map((r, i) => (
          <li key={r.href}>
            <Link href={r.href} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
              <span className="label n">{r.n}</span>
              <span className="thumb" style={{ ["--c" as string]: r.color }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {r.src && <img src={r.src} alt="" loading="lazy" className={r.scope ? "scope" : ""} />}
              </span>
              <span className="t">{r.title}</span>
              <span className="label c">{r.client}</span>
              <span className="label k">{r.tag}</span>
              <span className="arr" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className={"v2-float" + (on > -1 ? " on" : "")} ref={float} aria-hidden="true">
        <div className="in">
          {rows.map((r, i) => (
            <span key={r.href} className={i === on ? "on" : ""} style={{ ["--c" as string]: r.color }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {r.src ? <img src={r.src} alt="" loading="lazy" className={r.scope ? "scope" : ""} /> : <b>{r.title}</b>}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
