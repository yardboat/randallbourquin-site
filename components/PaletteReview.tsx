"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PALETTES } from "@/lib/palette";

// Review-only switcher. Appears once a ?palette= link has been opened this session.
export default function PaletteReview() {
  const path = usePathname();
  const [on, setOn] = useState(false);
  const [cur, setCur] = useState("signal");
  useEffect(() => {
    try {
      setOn(sessionStorage.getItem("rb-palette-review") === "1");
      setCur(sessionStorage.getItem("rb-palette") ?? "signal");
    } catch {}
  }, [path]);
  if (!on) return null;
  return (
    <nav className="palette-review label" aria-label="Palette options (review only)">
      <span>Palette</span>
      {PALETTES.map((p) => (
        <a key={p.id} href={`${path}?palette=${p.id}`} aria-current={p.id === cur ? "true" : undefined}>
          <i aria-hidden="true" style={{ background: p.swatch[0] }} />
          <i aria-hidden="true" style={{ background: p.swatch[2] }} />
          {p.name}
        </a>
      ))}
    </nav>
  );
}
