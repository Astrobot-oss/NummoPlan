import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loadData,
  saveData,
} from "../utils/storage";

const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState(() =>
    loadData("goals")
  );

  useEffect(() => {
    saveData("goals", goals);
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