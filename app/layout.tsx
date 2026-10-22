import type { Metadata } from "next";
import "./globals.css";
import PaletteReview from "@/components/PaletteReview";
import { paletteBootScript } from "@/lib/palette";

export const metadata: Metadata = {
  metadataBase: new URL("https://randallbourquin.com"),
  title: { default: "Randall Bourquin — Brand strategist", template: "%s — Randall Bourquin" },
  description:
    "Randall Bourquin is a brand strategist. Gold Peak, Crown Royal, Chobani, U.S. Soccer, The North Face, Got Milk? and more.",
  openGraph: { title: "Randall Bourquin — Brand strategist", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: paletteBootScript }} />
        {/* Toner: a slight edge wobble plus a few dropout specks, like a good photocopy. */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
          <filter id="rb-toner" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="3" result="s" />
            <feColorMatrix in="s" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -9 7.7" result="m" />
            <feComposite in="d" in2="m" operator="in" />
          </filter>
        </svg>
        {children}
        <PaletteReview />
      </body>
    </html>
  );
}
