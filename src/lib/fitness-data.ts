// Indian foods + workout plan + height exercises data
export interface Food {
  name: string;
  serving: string;
  kcal: number;
  protein: number;
}
export interface MealCategory {
  meal: "Breakfast" | "Lunch" | "Dinner" | "Snacks";
  items: Food[];
}

export const INDIAN_MEALS: MealCategory[] = [
  {
    meal: "Breakfast",
    items: [
      { name: "Moong Dal Chilla (2)", serving: "2 pcs", kcal: 240, protein: 14 },
      { name: "Paneer Bhurji + 2 Roti", serving: "100g + 2", kcal: 420, protein: 22 },
      { name: "Oats with Milk & Banana", serving: "1 bowl", kcal: 320, protein: 12 },
      { name: "Boiled Eggs (3) + Toast", serving: "3 + 2", kcal: 360, protein: 24 },
      { name: "Vegetable Poha", serving: "1 plate", kcal: 280, protein: 7 },
    ],
  },
  {
    meal: "Lunch",
    items: [
      { name: "Brown Rice + Dal + Sabzi", serving: "1 plate", kcal: 520, protein: 20 },
      { name: "2 Roti + Rajma + Salad", serving: "Standard", kcal: 480, protein: 22 },
      { name: "Chicken Curry + 2 Roti", serving: "150g + 2", kcal: 560, protein: 38 },
      { name: "Paneer Tikka + Quinoa", serving: "120g + 1 cup", kcal: 540, protein: 30 },
      { name: "Veg Pulao + Curd", serving: "1 plate + 1 bowl", kcal: 460, protein: 14 },
    ],
  },
  {
    meal: "Dinner",
    items: [
      { name: "Grilled Fish + Salad", serving: "150g", kcal: 380, protein: 34 },
      { name: "Soya Chunks Curry + 2 Roti", serving: "1 bowl + 2", kcal: 460, protein: 32 },
      { name: "Mixed Veg + Dal + 2 Roti", serving: "Standard", kcal: 440, protein: 18 },
      { name: "Tofu Stir Fry + Brown Rice", serving: "150g + 1 cup", kcal: 480, protein: 26 },
      { name: "Chicken Tikka + Salad", serving: "180g", kcal: 360, protein: 38 },
    ],
  },
  {
    meal: "Snacks",
    items: [
      { name: "Roasted Chana", serving: "30g", kcal: 110, protein: 6 },
      { name: "Greek Yogurt + Honey", serving: "150g", kcal: 150, protein: 12 },
      { name: "Peanut Butter + Apple", serving: "1 tbsp + 1", kcal: 200, protein: 6 },
      { name: "Sprouts Chaat", serving: "1 bowl", kcal: 180, protein: 12 },
      { name: "Almonds + Walnuts", serving: "20g", kcal: 140, protein: 5 },
    ],
  },
];

export interface Exercise {
  name: string;
  sets: string;
  rest: string;
  muscles: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}
export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export const WEEKLY_PLAN: WorkoutDay[] = [
  {
    day: "Monday",
    focus: "Push (Chest, Shoulders, Triceps)",
    exercises: [
      { name: "Push-ups", sets: "4 x 12-15", rest: "60s", muscles: "Chest, Triceps", difficulty: "Beginner" },
      { name: "Pike Push-ups", sets: "3 x 8-12", rest: "75s", muscles: "Shoulders", difficulty: "Intermediate" },
      { name: "Dips (bench)", sets: "4 x 10", rest: "60s", muscles: "Triceps, Chest", difficulty: "Intermediate" },
      { name: "Diamond Push-ups", sets: "3 x 10", rest: "60s", muscles: "Triceps", difficulty: "Intermediate" },
    ],
  },
  {
    day: "Tuesday",
    focus: "Pull (Back, Biceps)",
    exercises: [
      { name: "Pull-ups / Negatives", sets: "4 x 6-8", rest: "90s", muscles: "Lats, Biceps", difficulty: "Advanced" },
      { name: "Inverted Rows", sets: "4 x 10-12", rest: "60s", muscles: "Back", difficulty: "Beginner" },
      { name: "Chin-ups", sets: "3 x 6", rest: "90s", muscles: "Biceps, Back", difficulty: "Intermediate" },
      { name: "Superman Hold", sets: "3 x 30s", rest: "45s", muscles: "Lower Back", difficulty: "Beginner" },
    ],
  },
  {
    day: "Wednesday",
    focus: "Legs & Glutes",
    exercises: [
      { name: "Bodyweight Squats", sets: "4 x 20", rest: "60s", muscles: "Quads, Glutes", difficulty: "Beginner" },
      { name: "Walking Lunges", sets: "3 x 12/leg", rest: "60s", muscles: "Quads, Glutes", difficulty: "Beginner" },
      { name: "Bulgarian Split Squats", sets: "3 x 10/leg", rest: "75s", muscles: "Quads", difficulty: "Intermediate" },
      { name: "Glute Bridges", sets: "3 x 15", rest: "45s", muscles: "Glutes, Hams", difficulty: "Beginner" },
    ],
  },
  {
    day: "Thursday",
    focus: "Core & Conditioning",
    exercises: [
      { name: "Plank", sets: "3 x 60s", rest: "45s", muscles: "Core", difficulty: "Beginner" },
      { name: "Hollow Body Hold", sets: "3 x 30s", rest: "45s", muscles: "Core", difficulty: "Intermediate" },
      { name: "Hanging Leg Raises", sets: "3 x 10", rest: "60s", muscles: "Lower Abs", difficulty: "Intermediate" },
      { name: "Mountain Climbers", sets: "3 x 40", rest: "45s", muscles: "Core, Cardio", difficulty: "Beginner" },
    ],
  },
  {
    day: "Friday",
    focus: "Full Body Strength",
    exercises: [
      { name: "Burpees", sets: "4 x 10", rest: "60s", muscles: "Full Body", difficulty: "Intermediate" },
      { name: "Push-ups", sets: "3 x 15", rest: "45s", muscles: "Chest", difficulty: "Beginner" },
      { name: "Jump Squats", sets: "4 x 12", rest: "60s", muscles: "Legs, Cardio", difficulty: "Intermediate" },
      { name: "Pull-ups", sets: "3 x AMRAP", rest: "90s", muscles: "Back, Biceps", difficulty: "Advanced" },
    ],
  },
  {
    day: "Saturday",
    focus: "Mobility + Height Boost",
    exercises: [
      { name: "Dead Hang", sets: "4 x 30s", rest: "45s", muscles: "Spine Decompression", difficulty: "Beginner" },
      { name: "Cobra Stretch", sets: "3 x 30s", rest: "30s", muscles: "Spine, Posture", difficulty: "Beginner" },
      { name: "Cat-Cow", sets: "3 x 12", rest: "30s", muscles: "Spine Mobility", difficulty: "Beginner" },
      { name: "Jump Rope", sets: "5 x 1 min", rest: "45s", muscles: "Calves, Cardio", difficulty: "Beginner" },
    ],
  },
  {
    day: "Sunday",
    focus: "Active Recovery",
    exercises: [
      { name: "Walk / Light Jog", sets: "30-45 min", rest: "-", muscles: "Cardio", difficulty: "Beginner" },
      { name: "Yoga Flow", sets: "20 min", rest: "-", muscles: "Mobility", difficulty: "Beginner" },
      { name: "Foam Rolling", sets: "10 min", rest: "-", muscles: "Recovery", difficulty: "Beginner" },
    ],
  },
];

export interface HeightExercise {
  name: string;
  duration: string;
  benefit: string;
}
export const HEIGHT_EXERCISES: HeightExercise[] = [
  { name: "Dead Hang on Bar", duration: "4 sets × 30s", benefit: "Decompresses spinal discs, lengthens spine" },
  { name: "Cobra Stretch", duration: "3 sets × 30s", benefit: "Stretches back, improves posture" },
  { name: "Cat-Cow Stretch", duration: "3 sets × 12 reps", benefit: "Increases spinal mobility & flexibility" },
  { name: "Jump Rope / Jumping", duration: "5 × 1 min", benefit: "Stimulates leg bones, growth plates (under 21)" },
  { name: "Pelvic Shift / Bridge", duration: "3 sets × 15", benefit: "Strengthens lower back, opens hips" },
  { name: "Forward Spine Stretch", duration: "3 sets × 30s", benefit: "Lengthens hamstrings & lower back" },
  { name: "Standing Toe Touch", duration: "3 sets × 20s", benefit: "Stretches the entire posterior chain" },
];
