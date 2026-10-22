import type { Metadata } from "next";
import "./globals.css";

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
        {/* Toner: a slight edge wobble, like a good photocopy. */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
          <filter id="rb-toner" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        {children}
      </body>
    </html>
  );
}
