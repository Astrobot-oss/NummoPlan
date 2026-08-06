import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  createBalance,
  addMovement,
  updateMovement,
  deleteMovement,
  addRecurringIncome,
  updateRecurringIncome,
  deleteRecurringIncome,
} from "../domain/balanceService";

const BalanceContext = createContext();

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(createBalance());

  // ------------------------
  // MOVIMIENTOS
  // ------------------------

  function createMovement(movement) {
    setBalance((current) =>
      addMovement(current, movement)
    );
  }

  function editMovement(movement) {
    setBalance((current) =>
      updateMovement(current, movement)
    );
  }

  function removeMovement(id) {
    setBalance((current) =>
      deleteMovement(current, id)
    );
  }

  // ------------------------
  // INGRESOS RECURRENTES
  // ------------------------

  function createRecurringIncome(income) {
    setBalance((current) =>
      addRecurringIncome(current, income)
    );
  }

  function editRecurringIncome(income) {
    setBalance((current) =>
      updateRecurringIncome(current, income)
    );
  }

  function removeRecurringIncome(id) {
    setBalance((current) =>
      deleteRecurringIncome(current, id)
    );
  }

  return (
    <BalanceContext.Provider
      value={{
        balance,

        createMovement,
        editMovement,
        removeMovement,

        createRecurringIncome,
        editRecurringIncome,
        removeRecurringIncome,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  return useContext(BalanceContext);
}