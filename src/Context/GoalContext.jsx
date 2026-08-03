import { createContext, useContext, useEffect, useState } from "react";

const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("piggyvault-goals");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "piggyvault-goals",
      JSON.stringify(goals)
    );
  }, [goals]);

  return (
    <GoalContext.Provider
      value={{
        goals,
        setGoals,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  return useContext(GoalContext);
}