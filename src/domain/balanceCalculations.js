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