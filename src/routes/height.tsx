import { createFileRoute } from "@tanstack/react-router";
import { useFitness } from "@/lib/fitness-context";
import { HEIGHT_EXERCISES } from "@/lib/fitness-data";
import { Card } from "@/components/ui/card";
import { ArrowUpFromLine, Moon, Info } from "lucide-react";

export const Route = createFileRoute("/height")({
  component: HeightPage,
});

function HeightPage() {
  const { state } = useFitness();
  const p = state.profile;
  if (!p) return null;
  const inWindow = p.age <= 23;

  return (
    <div className="animate-fade-up space-y-8 p-6 md:p-10">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Posture & Decompression</p>
        <h1 className="font-display text-5xl tracking-wider md:text-6xl">HEIGHT GROWTH</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Real height changes via spine decompression and posture correction are most effective up to ~21–23 years.
          Expect <span className="text-primary">0.5–2 cm</span> over <span className="text-primary">3–6 months</span> with consistency.
        </p>
      </header>

      <Card className={`glow-card p-5 ${inWindow ? "" : "border-amber-500/30"}`}>
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 text-primary" />
          <div className="text-sm">
            {inWindow ? (
              <>You're <span className="text-primary font-semibold">{p.age} years old</span> — within the optimal window. Stay consistent for best results.</>
            ) : (
              <>At <span className="text-amber-400 font-semibold">{p.age}</span>, growth-plate driven height gains are unlikely. You can still gain <span className="text-primary">1–3 cm</span> visible height through better posture and spinal decompression.</>
            )}
          </div>
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {HEIGHT_EXERCISES.map((ex) => (
          <Card key={ex.name} className="glow-card glow-card-hover p-5">
            <div className="flex items-start justify-between">
              <ArrowUpFromLine className="h-5 w-5 text-primary" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{ex.duration}</span>
            </div>
            <h3 className="mt-3 font-display text-2xl tracking-wider">{ex.name.toUpperCase()}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{ex.benefit}</p>
          </Card>
        ))}
      </div>

      <Card className="glow-card p-6">
        <div className="flex items-start gap-3">
          <Moon className="h-6 w-6 text-primary" />
          <div>
            <h2 className="font-display text-2xl tracking-wider">DEEP SLEEP PROTOCOL</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
              <li>• <span className="text-foreground">8–9 hours</span> of uninterrupted sleep nightly</li>
              <li>• Sleep before <span className="text-foreground">11 PM</span> — peak HGH release window</li>
              <li>• Cool, dark room (~18–20°C) for deep cycles</li>
              <li>• Sleep flat on back or side, supportive pillow</li>
              <li>• No screens 30 min before bed</li>
              <li>• Last meal 2–3 hours before sleep</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
