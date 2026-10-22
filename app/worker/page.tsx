import Header from "@/components/Header";
import { worker } from "@/content/worker";
import { quote } from "@/content/projects";

export const metadata = { title: "Worker" };

export default function WorkerPage() {
  return (
    <>
      <Header current="worker" />
      <main>
        {/* Biography first */}
        <section className="worker">
          <h1>
            New York work ethic. LA vibe. <em>Southern affect.</em>
          </h1>
          <div className="bio">
            <p>{worker.notStrategist}</p>
            <p>{worker.journey}</p>
          </div>
        </section>

        <ul className="logo-wall" aria-label="Where I've worked">
          {worker.logos.map((l) => (
            <li key={l.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.name} loading="lazy" />
            </li>
          ))}
        </ul>

        {/* Then the photos */}
        <section className="roll" aria-label="35mm photos by Randall">
          {worker.photos.map((src, k) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`35mm photo ${k + 1} by Randall`} loading={k < 8 ? "eager" : "lazy"} />
          ))}
        </section>

        <blockquote className="quote">
          “{quote.text}”
          <footer className="label" style={{ fontStyle: "normal", marginTop: 16, color: "var(--dim)" }}>— {quote.by}</footer>
        </blockquote>
      </main>
    </>
  );
}
