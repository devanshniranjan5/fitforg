import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loadState, saveState, type AppState, type UserProfile, type WeightLog } from "./fitness";

interface Ctx {
  state: AppState;
  setProfile: (p: UserProfile) => void;
  addWeightLog: (w: WeightLog) => void;
  resetProfile: () => void;
  ready: boolean;
}

const FitnessContext = createContext<Ctx | null>(null);

export function FitnessProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({ profile: null, weightLogs: [] });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveState(state);
  }, [state, ready]);

  return (
    <FitnessContext.Provider
      value={{
        state,
        ready,
        setProfile: (p) => setState((s) => ({ ...s, profile: p })),
        addWeightLog: (w) =>
          setState((s) => {
            const filtered = s.weightLogs.filter((x) => x.date !== w.date);
            return { ...s, weightLogs: [...filtered, w].sort((a, b) => a.date.localeCompare(b.date)) };
          }),
        resetProfile: () => setState({ profile: null, weightLogs: [] }),
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
}

export function useFitness() {
  const ctx = useContext(FitnessContext);
  if (!ctx) throw new Error("useFitness must be used within FitnessProvider");
  return ctx;
}
