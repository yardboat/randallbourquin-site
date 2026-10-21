import { worker } from "@/content/worker";

export const metadata = { title: "Worker" };

export default function WorkerPage() {
  return (
    <main style={{ padding: "32px" }}>
      <h1>{worker.headline}</h1>
      <p>{worker.notStrategist}</p>
      <p>{worker.journey}</p>
    </main>
  );
}
