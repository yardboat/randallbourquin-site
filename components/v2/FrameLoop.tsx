"use client";
import { useEffect, useRef, useState } from "react";

export type Frame = { src: string; srcSet?: string; scope?: boolean };

/** Silent "loop" built from stills: frames cross-cut while the tile is on screen. Holds on frame one under reduced motion or when motion is paused. */
export default function FrameLoop({ frames, alt, sizes, eager }: { frames: Frame[]; alt: string; sizes: string; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState(1); // only request frames as they come up

  useEffect(() => {
    if (frames.length < 2) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);
    const t = setInterval(() => {
      if (!visible || document.documentElement.dataset.motion === "off") return;
      setI((n) => {
        const next = (n + 1) % frames.length;
        setSeen((s) => Math.min(frames.length, Math.max(s, next + 2)));
        return next;
      });
    }, 2400);
    setSeen(2);
    return () => { io.disconnect(); clearInterval(t); };
  }, [frames.length]);

  return (
    <div className="v2-loop" ref={ref}>
      {frames.slice(0, seen).map((f, k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={f.src}
          src={f.src}
          srcSet={f.srcSet}
          sizes={sizes}
          alt={k === 0 ? alt : ""}
          aria-hidden={k === 0 ? undefined : true}
          className={(k === i ? "on " : "") + (f.scope ? "scope" : "")}
          loading={eager && k === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
      {frames.length > 1 && (
        <span className="v2-ticks" aria-hidden="true">
          {frames.map((f, k) => <i key={f.src} className={k === i ? "on" : ""} />)}
        </span>
      )}
    </div>
  );
}
