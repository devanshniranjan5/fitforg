import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFitness } from "@/lib/fitness-context";
import type { Gender, Goal, ActivityLevel } from "@/lib/fitness";
import { Flame } from "lucide-react";

export function OnboardingDialog() {
  const { state, ready, setProfile } = useFitness();
  const open = ready && !state.profile;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [goal, setGoal] = useState<Goal>("fat_loss");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !weight || !height) return;
    setProfile({
      name: name.trim(),
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      gender,
      goal,
      activity,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-lg border-border bg-card [&>button]:hidden">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Flame className="h-5 w-5" />
            </div>
            <span className="font-display text-2xl tracking-wider">FITFORGE</span>
          </div>
          <DialogTitle className="font-display text-3xl tracking-wide">LET'S BUILD YOUR PLAN</DialogTitle>
          <DialogDescription>Tell us about yourself. We'll generate a personalized program.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={50} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" min={10} max={90} value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" type="number" min={30} max={250} value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" type="number" min={100} max={230} value={height} onChange={(e) => setHeight(e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Gender</Label>
              <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={(v) => setActivity(v as ActivityLevel)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Lightly Active</SelectItem>
                  <SelectItem value="moderate">Moderately Active</SelectItem>
                  <SelectItem value="active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Primary Goal</Label>
            <Select value={goal} onValueChange={(v) => setGoal(v as Goal)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="fat_loss">Fat Loss</SelectItem>
                <SelectItem value="calisthenics">Calisthenics Body Shaping</SelectItem>
                <SelectItem value="height_growth">Height Growth Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" size="lg" className="mt-2 font-display text-lg tracking-widest">
            FORGE MY PLAN
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
