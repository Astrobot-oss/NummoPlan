import { createContext, useContext, useState } from "react";

const DebtContext = createContext();

export function DebtProvider({ children }) {
  const [debts, setDebts] = useState([]);

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