import Header from "@/components/Header";
import { worker } from "@/content/worker";
import { quote } from "@/content/projects";

export const metadata = { title: "Worker" };

export default function WorkerPage() {
  return (
    <main>
      <Header current="worker" />
      <section className="worker">
        <h1>
          New York work ethic. LA vibe. <em>Southern affect.</em>
        </h1>
        <p className="lede">{worker.notStrategist}</p>
      </section>

      <section className="roll" aria-label="35mm photos by Randall">
        {worker.photos.map((src, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt={`35mm photo ${k + 1} by Randall`} loading={k < 8 ? "eager" : "lazy"} />
        ))}
      </section>

      <section className="worker" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <p className="lede" style={{ marginTop: 0 }}>{worker.journey}</p>
      </section>
      <p className="logos">
        {worker.logos.map((l, k) => (
          <span key={l} style={{ opacity: 1 }}>
            <span>{l}</span>
            {k < worker.logos.length - 1 ? <span className="sl">/</span> : null}
          </span>
        ))}
      </p>

      <blockquote className="quote" style={{ margin: 0 }}>
        “{quote.text}”
        <footer className="label" style={{ fontStyle: "normal", marginTop: 16, color: "var(--dim)" }}>— {quote.by}</footer>
      </blockquote>
    </main>
  );
}
