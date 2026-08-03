import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  loadData,
  saveData,
} from "../utils/storage";

const DebtContext = createContext();

export function DebtProvider({ children }) {
  const [debts, setDebts] = useState(() =>
    loadData("debts")
  );

  useEffect(() => {
    saveData("debts", debts);
  }, [debts]);

  return (
    <DebtContext.Provider
      value={{
        debts,
        setDebts,
      }}
    >
      {children}
    </DebtContext.Provider>
  );
}

export function useDebts() {
  return useContext(DebtContext);
}