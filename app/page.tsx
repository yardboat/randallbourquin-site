import Link from "next/link";
import { projects, manifesto } from "@/content/projects";

// Scaffold: the Index, unstyled. Art direction is applied in S1.
export default function Home() {
  return (
    <main style={{ padding: "32px" }}>
      <h1>Randall is a strategist</h1>
      <p>{manifesto.join(" ")}</p>
      <ol>
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`}>{p.title}</Link> — {p.tag}
          </li>
        ))}
      </ol>
    </main>
  );
}
