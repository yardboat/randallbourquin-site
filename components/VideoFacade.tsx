"use client";

import { useState } from "react";

// Poster first; the third-party player only loads on click (fast, private, no autoplay with sound).
export default function VideoFacade({ src, poster, title }: { src: string; poster: string | null; title: string }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <div className="facade">
        <iframe src={src} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
      </div>
    );
  }
  return (
    <button className="facade" onClick={() => setOn(true)} aria-label={`Play ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {poster ? <img src={poster} alt="" loading="lazy" /> : null}
      <span className="pill play">▶ Play</span>
    </button>
  );
}
