"use client";
import { useState } from "react";

/** Pause control for the moving rows and loops (WCAG 2.2.2). */
export default function MotionToggle() {
  const [off, setOff] = useState(false);
  return (
    <button
      type="button"
      className="v2-motion label"
      aria-pressed={off}
      onClick={() => {
        const next = !off;
        setOff(next);
        if (next) document.documentElement.dataset.motion = "off";
        else delete document.documentElement.dataset.motion;
      }}
    >
      <span aria-hidden="true">{off ? "▶" : "❙❙"}</span> {off ? "Play motion" : "Pause motion"}
    </button>
  );
}
