export function getDebtStats(debt) {
  const totalPaid = debt.movements.reduce(
    (total, movement) => total + movement.amount,
    0
  );

  const remaining = Math.max(
    debt.targetAmount - totalPaid,
    0
  );

  const progress =
    debt.targetAmount > 0
      ? Math.min(
          (totalPaid / debt.targetAmount) * 100,
          100
        )
      : 0;

  const completed =
    remaining === 0;

  return {
    totalPaid,
    remaining,
    progress,
    completed,
  };
}