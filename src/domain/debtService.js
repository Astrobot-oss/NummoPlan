export function createDebt(debts, debt) {
  return [...debts, debt];
}

export function updateDebt(debts, updatedDebt) {
  return debts.map((debt) =>
    debt.id === updatedDebt.id
      ? updatedDebt
      : debt
  );
}

export function deleteDebt(debts, debtId) {
  return debts.filter(
    (debt) => debt.id !== debtId
  );
}

export function addPayment(
  debts,
  debtId,
  amount
) {
  return debts.map((debt) => {
    if (debt.id !== debtId) {
      return debt;
    }

    const totalPaidBefore = debt.movements.reduce(
      (total, movement) => total + movement.amount,
      0
    );

    const totalPaidAfter =
      totalPaidBefore + amount;

    const remaining = Math.max(
      debt.targetAmount - totalPaidAfter,
      0
    );

    return {
      ...debt,

      movements: [
        ...debt.movements,
        {
          id: crypto.randomUUID(),

          type: "payment",

          amount,

          remaining,

          date: new Date().toISOString(),
        },
      ],
    };
  });
}