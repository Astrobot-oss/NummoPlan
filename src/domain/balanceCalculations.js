export function getBalanceStats(balance) {
  const movements = balance.movements || [];

  const incomes = movements.filter(
    (movement) => movement.type === "income"
  );

  const expenses = movements.filter(
    (movement) => movement.type === "expense"
  );

  const totalIncome = incomes.reduce(
    (total, movement) => total + movement.amount,
    0
  );

  const totalExpenses = expenses.reduce(
    (total, movement) => total + movement.amount,
    0
  );

  const savings = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0
      ? (savings / totalIncome) * 100
      : 0;

  return {
    totalIncome,
    totalExpenses,
    savings,
    savingsRate,
  };
}

export function getAvailableToInvest(balance) {
  const { savings } = getBalanceStats(balance);

  return Math.max(0, savings);
}

export function getIncomeByCategory(balance) {
  const result = {};

  balance.movements
    .filter((movement) => movement.type === "income")
    .forEach((movement) => {
      result[movement.category] =
        (result[movement.category] || 0) +
        movement.amount;
    });

  return result;
}

export function getExpenseByCategory(balance) {
  const result = {};

  balance.movements
    .filter((movement) => movement.type === "expense")
    .forEach((movement) => {
      result[movement.category] =
        (result[movement.category] || 0) +
        movement.amount;
    });

  return result;
}

export function getLargestExpenseCategory(balance) {
  const categories =
    getExpenseByCategory(balance);

  let category = null;
  let amount = 0;

  Object.entries(categories).forEach(
    ([key, value]) => {
      if (value > amount) {
        category = key;
        amount = value;
      }
    }
  );

  return {
    category,
    amount,
  };
}
export function getMovementsByMonth(balance, year, month) {
  return balance.movements.filter((movement) => {
    const date = new Date(movement.date);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month
    );
  });
}

export function getMonthlyStats(
  balance,
  year,
  month
) {
  const movements = getMovementsByMonth(
    balance,
    year,
    month
  );

  return getBalanceStats({
    ...balance,
    movements,
  });
}

export function getRecentMovements(
  balance,
  limit = 5
) {
  return [...balance.movements]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, limit);
}

export function getRecurringIncomeTotal(balance) {
  return balance.recurringIncome.reduce(
    (total, income) => total + income.amount,
    0
  );
}

export function getNetWorth(balance) {
  const {
    totalIncome,
    totalExpenses,
  } = getBalanceStats(balance);

  return totalIncome - totalExpenses;
}

