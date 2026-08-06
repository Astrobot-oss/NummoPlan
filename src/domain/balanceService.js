export function createBalance() {
  return {
    salary: {
      amount: 0,
      payDay: 1,
      frequency: "monthly",
      extraPayments: [],
      lastGenerated: null,
    },

    recurringIncome: [],

    movements: [],
  };
}

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

export function updateSalary(balance, salary) {
  return {
    ...balance,
    salary,
  };
}

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