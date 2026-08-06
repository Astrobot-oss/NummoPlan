import { createContext, useContext, useState, useEffect } from "react";

const BalanceContext = createContext();

const LOCAL_STORAGE_KEY = "app_balance_data";

const initialData = {
  movements: [],
  recurringIncome: [],
  recurringExpense: [],
};

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error al cargar los datos de balance", e);
      }
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(balance));
  }, [balance]);

  // --- MOVIMIENTOS ---
  const createMovement = (newMovement) => {
    setBalance((prev) => ({
      ...prev,
      movements: [newMovement, ...(prev.movements || [])],
    }));
  };

  const editMovement = (updatedMovement) => {
    setBalance((prev) => ({
      ...prev,
      movements: (prev.movements || []).map((m) =>
        m.id === updatedMovement.id ? updatedMovement : m
      ),
    }));
  };

  const removeMovement = (id) => {
    setBalance((prev) => ({
      ...prev,
      movements: (prev.movements || []).filter((m) => m.id !== id),
    }));
  };

  // --- INGRESOS RECURRENTES ---
  const createRecurringIncome = (newIncome) => {
    setBalance((prev) => ({
      ...prev,
      recurringIncome: [newIncome, ...(prev.recurringIncome || [])],
    }));
  };

  const editRecurringIncome = (updatedIncome) => {
    setBalance((prev) => ({
      ...prev,
      recurringIncome: (prev.recurringIncome || []).map((inc) =>
        inc.id === updatedIncome.id ? updatedIncome : inc
      ),
    }));
  };

  const removeRecurringIncome = (id) => {
    setBalance((prev) => ({
      ...prev,
      recurringIncome: (prev.recurringIncome || []).filter((inc) => inc.id !== id),
    }));
  };

  // --- GASTOS RECURRENTES ---
  const createRecurringExpense = (newExpense) => {
    setBalance((prev) => ({
      ...prev,
      recurringExpense: [newExpense, ...(prev.recurringExpense || [])],
    }));
  };

  const editRecurringExpense = (updatedExpense) => {
    setBalance((prev) => ({
      ...prev,
      recurringExpense: (prev.recurringExpense || []).map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      ),
    }));
  };

  const removeRecurringExpense = (id) => {
    setBalance((prev) => ({
      ...prev,
      recurringExpense: (prev.recurringExpense || []).filter((exp) => exp.id !== id),
    }));
  };

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
        createRecurringExpense,
        editRecurringExpense,
        removeRecurringExpense,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance debe usarse dentro de un BalanceProvider");
  }
  return context;
}