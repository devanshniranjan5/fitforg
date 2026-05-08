export type Gender = "male" | "female";
export type Goal = "fat_loss" | "calisthenics" | "height_growth";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active";

export interface UserProfile {
  name: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: Gender;
  goal: Goal;
  activity: ActivityLevel;
  createdAt: string;
}

export interface WeightLog {
  date: string; // ISO yyyy-mm-dd
  weight: number;
}

export interface AppState {
  profile: UserProfile | null;
  weightLogs: WeightLog[];
}

const KEY = "fitforge_state_v1";

export function loadState(): AppState {
  if (typeof window === "undefined") return { profile: null, weightLogs: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { profile: null, weightLogs: [] };
    return JSON.parse(raw) as AppState;
  } catch {
    return { profile: null, weightLogs: [] };
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function calcBMR(p: Pick<UserProfile, "weight" | "height" | "age" | "gender">) {
  // Mifflin-St Jeor
  const base = 10 * p.weight + 6.25 * p.height - 5 * p.age;
  return Math.round(p.gender === "male" ? base + 5 : base - 161);
}

export const ACTIVITY_MULT: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

export function calcTDEE(p: UserProfile) {
  return Math.round(calcBMR(p) * ACTIVITY_MULT[p.activity]);
}

export function calcTargetCalories(p: UserProfile) {
  const tdee = calcTDEE(p);
  if (p.goal === "fat_loss") return tdee - 400;
  if (p.goal === "calisthenics") return tdee - 100; // recomp slight deficit
  return tdee + 200; // height growth — slight surplus for development
}

export function calcMacros(p: UserProfile) {
  const cals = calcTargetCalories(p);
  const proteinG = Math.round(p.weight * 2); // 2g/kg
  const fatsG = Math.round((cals * 0.25) / 9);
  const carbsG = Math.round((cals - proteinG * 4 - fatsG * 9) / 4);
  return { calories: cals, protein: proteinG, carbs: carbsG, fats: Math.max(40, fatsG) };
}

// Calories burned per ~45 min calisthenics session = METs(6) * 3.5 * weight / 200 * minutes
export function calcSessionBurn(weight: number, minutes = 45) {
  const mets = 6;
  return Math.round((mets * 3.5 * weight / 200) * minutes);
}

export const goalLabel: Record<Goal, string> = {
  fat_loss: "Fat Loss",
  calisthenics: "Calisthenics Body Shaping",
  height_growth: "Height Growth Support",
};
