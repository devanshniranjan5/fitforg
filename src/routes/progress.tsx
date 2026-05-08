import { createFileRoute } from "@tanstack/react-router";
import { useFitness } from "@/lib/fitness-context";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Flame, TrendingDown, Calendar } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const { state, addWeightLog } = useFitness();
  const p = state.profile;
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const data = useMemo(
    () => state.weightLogs.map((l) => ({ date: l.date.slice(5), weight: l.weight })),
    [state.weightLogs]
  );

  const streak = useMemo(() => {
    const days = new Set(state.weightLogs.map((l) => l.date));
    let s = 0;
    const d = new Date();
    while (days.has(d.toISOString().slice(0, 10))) {
      s++;
      d.setDate(d.getDate() - 1);
    }
    return s;
  }, [state.weightLogs]);

  const start = state.weightLogs[0]?.weight ?? p?.weight ?? 0;
  const latest = state.weightLogs[state.weightLogs.length - 1]?.weight ?? p?.weight ?? 0;
  const delta = (latest - start).toFixed(1);

  if (!p) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = Number(weight);
    if (!w || w < 30 || w > 250) {
      toast.error("Enter a valid weight (30–250 kg)");
      return;
    }
    addWeightLog({ date, weight: w });
    setWeight("");
    toast.success("Weight logged!");
  };

  return (
    <div className="animate-fade-up space-y-8 p-6 md:p-10">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Tracking</p>
        <h1 className="font-display text-5xl tracking-wider md:text-6xl">PROGRESS</h1>
        <p className="mt-2 text-muted-foreground">Log daily. Adapt weekly. Win monthly.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="glow-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Streak</span>
            <Flame className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 font-display text-4xl text-glow">{streak} <span className="text-base text-muted-foreground">days</span></div>
        </Card>
        <Card className="glow-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Change</span>
            <TrendingDown className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 font-display text-4xl">{delta} <span className="text-base text-muted-foreground">kg</span></div>
        </Card>
        <Card className="glow-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Logs</span>
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 font-display text-4xl">{state.weightLogs.length}</div>
        </Card>
      </div>

      <Card className="glow-card p-6">
        <h2 className="font-display text-2xl tracking-wider">LOG TODAY</h2>
        <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div className="grid gap-2">
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} max={new Date().toISOString().slice(0, 10)} />
          </div>
          <div className="grid gap-2">
            <Label>Weight (kg)</Label>
            <Input type="number" step="0.1" placeholder={`${p.weight}`} value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <Button type="submit" className="font-display text-lg tracking-widest">LOG</Button>
        </form>
      </Card>

      <Card className="glow-card p-6">
        <h2 className="font-display text-2xl tracking-wider">WEIGHT TREND</h2>
        <div className="mt-4 h-72">
          {data.length < 2 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Log at least 2 days to see your trend</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.27 0.02 270)" />
                <XAxis dataKey="date" stroke="oklch(0.7 0.02 270)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.02 270)" fontSize={12} domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ background: "oklch(0.17 0.018 270)", border: "1px solid oklch(0.27 0.02 270)", borderRadius: 8 }} labelStyle={{ color: "#fff" }} />
                <Line type="monotone" dataKey="weight" stroke="oklch(0.93 0.27 130)" strokeWidth={3} dot={{ r: 4, fill: "oklch(0.93 0.27 130)" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
