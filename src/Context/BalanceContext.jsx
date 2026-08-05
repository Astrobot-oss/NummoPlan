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

const BalanceContext = createContext();

const initialBalance = {
 recurringIncome: [],
  movements: [],
};

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(() => {
  return loadData("balance") || initialBalance;
});

  useEffect(() => {
  saveData("balance", balance);
}, [balance]);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        setBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}
export function useBalance() {
  return useContext(BalanceContext);
}