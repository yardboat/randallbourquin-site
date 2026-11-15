import Link from "next/link";
import Header from "@/components/Header";
import { worker } from "@/content/worker";
import { opt } from "@/lib/intro";
import { quote } from "@/content/projects";
import "@/app/v2.css";
import "@/app/case.css";

export const metadata = { title: "Worker" };

export default function WorkerPage() {
  return (
    <div className="v2 v2-worker">
      <a href="#worker" className="skip">Skip to the biography</a>
      <Header current="worker" />
      <main id="worker">
        {/* Biography first */}
        <section className="w-head">
          <h1>
            New York work ethic. LA vibe. <em>Southern affect.</em>
          </h1>
          <div className="w-bio">
            <p>{worker.notStrategist}</p>
            <p>{worker.journey}</p>
          </div>
        </section>

        <ul className="w-logos" aria-label="Where I've worked">
          {worker.logos.map((l) => (
            <li key={l.name}>
              {/* Raster marks go through the optimizer; Next refuses remote SVG, so those are served as they are. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={/\.svg(\?|$)/i.test(l.src) ? l.src : opt(l.src, 384)} alt={l.name} fetchPriority="high" />
            </li>
          ))}
        </ul>

        {/* Then the photos */}
        <section className="w-roll" aria-label="35mm photos by Randall" data-reveal>
          {worker.photos.map((src, k) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`35mm photo ${k + 1} by Randall`} loading={k < 8 ? "eager" : "lazy"} />
          ))}
        </section>

        <blockquote className="w-quote">
          “{quote.text}”
          <footer className="label">— {quote.by}</footer>
        </blockquote>
      </main>
      <footer className="v2-foot label">
        <span>Randall Bourquin</span>
        <nav aria-label="Footer"><Link href="/">Work</Link><Link href="/worker">Worker</Link></nav>
      </footer>
    </div>
  );
}
