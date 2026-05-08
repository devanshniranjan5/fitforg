import { createFileRoute } from "@tanstack/react-router";
import { useFitness } from "@/lib/fitness-context";
import { calcBMR, calcTDEE, calcMacros, calcSessionBurn, goalLabel } from "@/lib/fitness";
import { Card } from "@/components/ui/card";
import { Flame, Dumbbell, Apple, ArrowUpFromLine, Target, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function MacroRing({ label, value, max, unit, color }: { label: string; value: number; max: number; unit: string; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-28 w-28">
        <svg className="h-full w-full -rotate-90">
          <circle cx="56" cy="56" r={r} stroke="currentColor" strokeWidth="8" className="text-muted/40" fill="none" />
          <circle cx="56" cy="56" r={r} stroke={color} strokeWidth="8" fill="none" strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dashoffset 1s ease" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl">{value}</span>
          <span className="text-[10px] uppercase text-muted-foreground">{unit}</span>
        </div>
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}

function Dashboard() {
  const { state } = useFitness();
  const p = state.profile;
  if (!p) return <div className="p-8 text-muted-foreground">Loading your profile…</div>;

  const bmr = calcBMR(p);
  const tdee = calcTDEE(p);
  const macros = calcMacros(p);
  const burn = calcSessionBurn(p.weight);

  const stats = [
    { label: "BMR", value: bmr, unit: "kcal/day", icon: Flame },
    { label: "TDEE", value: tdee, unit: "kcal/day", icon: Zap },
    { label: "Target", value: macros.calories, unit: "kcal/day", icon: Target },
    { label: "Burn / Session", value: burn, unit: "kcal", icon: Dumbbell },
  ];

  return (
    <div className="animate-fade-up space-y-8 p-6 md:p-10">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Welcome back</p>
        <h1 className="mt-1 font-display text-5xl tracking-wider md:text-6xl text-glow">{p.name.toUpperCase()}</h1>
        <p className="mt-2 text-muted-foreground">Goal: <span className="text-primary">{goalLabel[p.goal]}</span> · Weight {p.weight}kg · Height {p.height}cm</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="glow-card glow-card-hover p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-4xl tracking-wider">{s.value.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">{s.unit}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glow-card lg:col-span-2 p-6">
          <h2 className="font-display text-2xl tracking-wider">DAILY MACROS</h2>
          <p className="text-xs text-muted-foreground">Personalized for {macros.calories} kcal target</p>
          <div className="mt-6 flex flex-wrap justify-around gap-6">
            <MacroRing label="Protein" value={macros.protein} max={macros.protein * 1.2} unit="g" color="oklch(0.93 0.27 130)" />
            <MacroRing label="Carbs" value={macros.carbs} max={macros.carbs * 1.2} unit="g" color="oklch(0.7 0.18 200)" />
            <MacroRing label="Fats" value={macros.fats} max={macros.fats * 1.2} unit="g" color="oklch(0.75 0.2 50)" />
          </div>
        </Card>

        <Card className="glow-card glow-card-hover p-6">
          <h2 className="font-display text-2xl tracking-wider">QUICK NAV</h2>
          <div className="mt-4 space-y-2">
            {[
              { to: "/diet", label: "Diet & Calories", icon: Apple },
              { to: "/workout", label: "Workout Plan", icon: Dumbbell },
              { to: "/height", label: "Height Growth", icon: ArrowUpFromLine },
              { to: "/progress", label: "Progress Tracker", icon: Target },
            ].map((q) => (
              <Link key={q.to} to={q.to} className="flex items-center gap-3 rounded-md border border-border bg-secondary/50 p-3 transition-all hover:border-primary hover:bg-primary/5">
                <q.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">{q.label}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
