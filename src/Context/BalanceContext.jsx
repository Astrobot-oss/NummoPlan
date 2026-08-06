import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  addMovement,
  updateSalary,
} from "../domain/balanceService";

const BalanceContext = createContext();

const initialBalance = {
  salary: {
    amount: 0,
    payDay: 1,
    frequency: "monthly",
    extraPayments: [],
  },

  recurringIncome: [],

  movements: [],
};

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(initialBalance);

  function createMovement(movement) {
    setBalance((current) =>
      addMovement(current, movement)
    );
  }

  function editSalary(salary) {
  setBalance((current) =>
    updateSalary(current, salary)
  );
}

  return (
    <BalanceContext.Provider
      value={{
  balance,
  createMovement,
  editSalary,
}}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  return useContext(BalanceContext);
}