import Link from "next/link";

export default function Header({ current }: { current: "work" | "worker" }) {
  return (
    <header className="hdr label">
      <Link href="/" className="who">
        Randall Bourquin<em>is a strategist</em>
      </Link>
      <nav aria-label="Main">
        <Link href="/" aria-current={current === "work" ? "page" : undefined}>Work</Link>
        <Link href="/worker" aria-current={current === "worker" ? "page" : undefined}>Worker</Link>
      </nav>
    </header>
  );
}
