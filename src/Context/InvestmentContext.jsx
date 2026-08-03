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

const InvestmentContext = createContext();

export function InvestmentProvider({ children }) {
  const [investments, setInvestments] = useState(() =>
    loadData("investments")
  );

  useEffect(() => {
    saveData("investments", investments);
  }, [investments]);

  return (
    <InvestmentContext.Provider
      value={{
        investments,
        setInvestments,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
}

export function useInvestments() {
  return useContext(InvestmentContext);
}