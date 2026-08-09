import { createContext, useContext, useEffect, useState } from "react";

const BalanceContext = createContext(null);

const LOCAL_STORAGE_KEY = "app_balance_data";

const initialData = {
  movements: [],
  recurringIncome: [],
  recurringExpense: [],
  monthlyTargets: {},
  defaultTargetSavings: 300,
};

function normalizeBalance(data) {
  return {
    movements: Array.isArray(data?.movements)
      ? data.movements
      : [],

    recurringIncome: Array.isArray(data?.recurringIncome)
      ? data.recurringIncome
      : [],

    recurringExpense: Array.isArray(data?.recurringExpense)
      ? data.recurringExpense
      : [],

    monthlyTargets:
      data?.monthlyTargets &&
      typeof data.monthlyTargets === "object" &&
      !Array.isArray(data.monthlyTargets)
        ? data.monthlyTargets
        : {},

    defaultTargetSavings:
      Number.isFinite(Number(data?.defaultTargetSavings)) &&
      Number(data.defaultTargetSavings) >= 0
        ? Number(data.defaultTargetSavings)
        : 300,
  };
}

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!saved) {
      return initialData;
    }

    try {
      return normalizeBalance(JSON.parse(saved));
    } catch (error) {
      console.error(
        "Error al cargar los datos de balance",
        error
      );

      return initialData;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(balance)
    );
  }, [balance]);

  // ------------------------
  // MOVIMIENTOS
  // ------------------------

  const createMovement = (movement) => {
    setBalance((prev) => ({
      ...prev,
      movements: [
        {
          ...movement,
          id: movement.id ?? Date.now(),
          date:
            movement.date ??
            new Date().toISOString(),
        },
        ...prev.movements,
      ],
    }));
  };

  const editMovement = (updatedMovement) => {
    setBalance((prev) => ({
      ...prev,
      movements: prev.movements.map((movement) =>
        movement.id === updatedMovement.id
          ? updatedMovement
          : movement
      ),
    }));
  };

  const removeMovement = (id) => {
    setBalance((prev) => ({
      ...prev,
      movements: prev.movements.filter(
        (movement) => movement.id !== id
      ),
    }));
  };

  // ------------------------
  // INGRESOS RECURRENTES
  // ------------------------

  const createRecurringIncome = (income) => {
    setBalance((prev) => ({
      ...prev,
      recurringIncome: [
        {
          ...income,
          id: income.id ?? Date.now(),
        },
        ...prev.recurringIncome,
      ],
    }));
  };

  const editRecurringIncome = (updatedIncome) => {
    setBalance((prev) => ({
      ...prev,
      recurringIncome: prev.recurringIncome.map(
        (income) =>
          income.id === updatedIncome.id
            ? updatedIncome
            : income
      ),
    }));
  };

  const removeRecurringIncome = (id) => {
    setBalance((prev) => ({
      ...prev,
      recurringIncome: prev.recurringIncome.filter(
        (income) => income.id !== id
      ),
    }));
  };

  // ------------------------
  // GASTOS RECURRENTES
  // ------------------------

  const createRecurringExpense = (expense) => {
    setBalance((prev) => ({
      ...prev,
      recurringExpense: [
        {
          ...expense,
          id: expense.id ?? Date.now(),
        },
        ...prev.recurringExpense,
      ],
    }));
  };

  const editRecurringExpense = (updatedExpense) => {
    setBalance((prev) => ({
      ...prev,
      recurringExpense: prev.recurringExpense.map(
        (expense) =>
          expense.id === updatedExpense.id
            ? updatedExpense
            : expense
      ),
    }));
  };

  const removeRecurringExpense = (id) => {
    setBalance((prev) => ({
      ...prev,
      recurringExpense: prev.recurringExpense.filter(
        (expense) => expense.id !== id
      ),
    }));
  };

  // ------------------------
  // OBJETIVO DE AHORRO
  // ------------------------

  const setDefaultTargetSavings = (amount) => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value < 0) {
      return;
    }

    setBalance((prev) => ({
      ...prev,
      defaultTargetSavings: value,
    }));
  };

  const setMonthlyTargetSavings = (
    year,
    month,
    amount
  ) => {
    const value = Number(amount);
    const key = `${year}-${month}`;

    setBalance((prev) => ({
      ...prev,
      monthlyTargets: {
        ...prev.monthlyTargets,
        [key]:
          Number.isFinite(value) && value >= 0
            ? value
            : prev.monthlyTargets[key],
      },
    }));
  };

  // ------------------------
  // CONTEXT
  // ------------------------

  return (
    <BalanceContext.Provider
      value={{
        balance,

        // Movimientos
        createMovement,
        editMovement,
        removeMovement,

        // Ingresos recurrentes
        createRecurringIncome,
        editRecurringIncome,
        removeRecurringIncome,

        // Gastos recurrentes
        createRecurringExpense,
        editRecurringExpense,
        removeRecurringExpense,

        // Objetivos
        setDefaultTargetSavings,
        setMonthlyTargetSavings,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);

  if (!context) {
    throw new Error(
      "useBalance debe usarse dentro de un BalanceProvider"
    );
  }

  return context;
}