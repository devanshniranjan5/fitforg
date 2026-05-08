import { createFileRoute } from "@tanstack/react-router";
import { useFitness } from "@/lib/fitness-context";
import { calcSessionBurn } from "@/lib/fitness";
import { WEEKLY_PLAN } from "@/lib/fitness-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Clock, Target } from "lucide-react";

export const Route = createFileRoute("/workout")({
  component: WorkoutPage,
});

const diffColor: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Intermediate: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Advanced: "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

function WorkoutPage() {
  const { state } = useFitness();
  const p = state.profile;
  if (!p) return null;
  const burn = calcSessionBurn(p.weight);

  return (
    <div className="animate-fade-up space-y-8 p-6 md:p-10">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Training</p>
        <h1 className="font-display text-5xl tracking-wider md:text-6xl">WEEKLY WORKOUT</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          6-day calisthenics split + 1 active recovery. Estimated burn per ~45 min session at your weight ({p.weight}kg):
          <span className="ml-2 font-display text-primary text-xl">{burn} kcal</span>
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {WEEKLY_PLAN.map((day, idx) => (
          <Card key={day.day} className="glow-card glow-card-hover p-6" style={{ animationDelay: `${idx * 50}ms` }}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Day {idx + 1}</div>
                <h3 className="font-display text-3xl tracking-wider">{day.day.toUpperCase()}</h3>
                <p className="text-sm text-primary">{day.focus}</p>
              </div>
              <div className="flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-xs text-primary">
                <Flame className="h-3 w-3" /> ~{burn} kcal
              </div>
            </div>
            <div className="space-y-3">
              {day.exercises.map((ex) => (
                <div key={ex.name} className="rounded-md border border-border bg-secondary/30 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold">{ex.name}</div>
                    <Badge variant="outline" className={diffColor[ex.difficulty]}>{ex.difficulty}</Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Target className="h-3 w-3 text-primary" /> {ex.sets}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-primary" /> Rest {ex.rest}</span>
                    <span>· {ex.muscles}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
