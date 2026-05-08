import { createFileRoute } from "@tanstack/react-router";
import { useFitness } from "@/lib/fitness-context";
import { calcMacros, calcTDEE, calcBMR } from "@/lib/fitness";
import { INDIAN_MEALS } from "@/lib/fitness-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/diet")({
  component: DietPage,
});

function DietPage() {
  const { state } = useFitness();
  const p = state.profile;
  if (!p) return null;
  const m = calcMacros(p);
  const bmr = calcBMR(p);
  const tdee = calcTDEE(p);

  return (
    <div className="animate-fade-up space-y-8 p-6 md:p-10">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Nutrition</p>
        <h1 className="font-display text-5xl tracking-wider md:text-6xl">DIET & CALORIES</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Calculated using the <span className="text-primary">Mifflin-St Jeor</span> formula. Your BMR is <span className="text-primary">{bmr}</span> kcal,
          TDEE <span className="text-primary">{tdee}</span> kcal. Daily target: <span className="text-primary font-semibold">{m.calories}</span> kcal.
        </p>
      </header>

      <Card className="glow-card p-6">
        <h2 className="font-display text-2xl tracking-wider">DAILY MACRO TARGETS</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {[
            { label: "Protein", val: m.protein, color: "oklch(0.93 0.27 130)" },
            { label: "Carbs", val: m.carbs, color: "oklch(0.7 0.18 200)" },
            { label: "Fats", val: m.fats, color: "oklch(0.75 0.2 50)" },
          ].map((x) => (
            <div key={x.label} className="rounded-md border border-border bg-secondary/40 p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{x.label}</div>
              <div className="mt-1 font-display text-3xl" style={{ color: x.color }}>{x.val}g</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {INDIAN_MEALS.map((meal) => (
          <Card key={meal.meal} className="glow-card glow-card-hover p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-2xl tracking-wider">{meal.meal.toUpperCase()}</h3>
              <Badge variant="outline" className="border-primary/40 text-primary">Indian</Badge>
            </div>
            <ul className="space-y-3">
              {meal.items.map((f) => (
                <li key={f.name} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0">
                  <div>
                    <div className="text-sm font-semibold">{f.name}</div>
                    <div className="text-xs text-muted-foreground">{f.serving} · {f.protein}g protein</div>
                  </div>
                  <div className="font-display text-lg text-primary">{f.kcal} kcal</div>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
