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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
