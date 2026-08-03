export function getInvestmentStats(investment) {
  const totalShares = investment.shares || 0;

  const averagePrice =
    investment.purchasePrice || 0;

  const totalInvested =
    totalShares * averagePrice;

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

  const dividends = (investment.movements || [])
  .filter((movement) => movement.type === "dividend")
  .reduce((sum, movement) => sum + (movement.amount || 0), 0);

  return {
    totalShares,
    totalInvested,
    averagePrice,
    currentValue,
    profit,
    dividends,
    percentage,
  };
}