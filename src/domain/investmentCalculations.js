export function getInvestmentStats(investment) {
  const buyMovements = (investment.movements || []).filter(
    (movement) => movement.type === "buy"
  );

  const totalShares = buyMovements.reduce(
    (sum, movement) => sum + (movement.shares || 0),
    0
  );

  const totalInvested = buyMovements.reduce(
    (sum, movement) => sum + (movement.amount || 0),
    0
  );

  const averagePrice =
    totalShares > 0
      ? totalInvested / totalShares
      : 0;

  const currentPrice =
    investment.currentPrice || 0;

  const currentValue =
    totalShares * currentPrice;

  const profit =
    currentValue - totalInvested;

  const percentage =
    totalInvested > 0
      ? (profit / totalInvested) * 100
      : 0;

  return {
    totalShares,
    totalInvested,
    averagePrice,
    currentValue,
    profit,
    percentage,
  };
}