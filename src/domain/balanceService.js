export function createBalance() {
  return {
    recurringIncome: [],
    recurringExpense: [],
    movements: [],
  };
}

// ------------------------
// MOVIMIENTOS
// ------------------------

export function addMovement(balance, movement) {
  return {
    ...balance,
    movements: [
      {
        id: Date.now(),
        date: new Date().toISOString(),
        ...movement,
      },
      ...balance.movements,
    ],
  };
}

export function updateMovement(balance, movement) {
  return {
    ...balance,
    movements: balance.movements.map((item) =>
      item.id === movement.id ? movement : item
    ),
  };
}

export function deleteMovement(balance, id) {
  return {
    ...balance,
    movements: balance.movements.filter(
      (item) => item.id !== id
    ),
  };
}

// ------------------------
// INGRESOS RECURRENTES
// ------------------------

export function addRecurringIncome(balance, income) {
  return {
    ...balance,
    recurringIncome: [
      {
        id: Date.now(),
        ...income,
      },
      ...balance.recurringIncome,
    ],
  };
}

export function updateRecurringIncome(balance, income) {
  return {
    ...balance,
    recurringIncome: balance.recurringIncome.map((item) =>
      item.id === income.id ? income : item
    ),
  };
}

export function deleteRecurringIncome(balance, id) {
  return {
    ...balance,
    recurringIncome: balance.recurringIncome.filter(
      (item) => item.id !== id
    ),
  };
}

// ------------------------
// GASTOS RECURRENTES
// ------------------------

export function addRecurringExpense(balance, expense) {
  return {
    ...balance,
    recurringExpense: [
      {
        id: Date.now(),
        ...expense,
      },
      ...(balance.recurringExpense || []),
    ],
  };
}

export function updateRecurringExpense(balance, expense) {
  return {
    ...balance,
    recurringExpense: (balance.recurringExpense || []).map((item) =>
      item.id === expense.id ? expense : item
    ),
  };
}

export function deleteRecurringExpense(balance, id) {
  return {
    ...balance,
    recurringExpense: (balance.recurringExpense || []).filter(
      (item) => item.id !== id
    ),
  };
}