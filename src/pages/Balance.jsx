import BalanceSummaryCard from "../features/balance/BalanceSummaryCard";

import { useBalance } from "../context/BalanceContext";

export default function Balance() {
  const { balance } = useBalance();

  return (
    <div className="space-y-8">

      <PageHeader
        title="Balance"
        description="Comprende realmente qué ocurre con tu dinero."
        action={
          <PrimaryButton>
            Nuevo movimiento
          </PrimaryButton>
        }
      />

<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

  <div className="space-y-6 xl:col-span-2">

    <BalanceSummaryCard
      balance={balance}
    />

    <MonthlyInsightsCard
      insights={[]}
    />

    <TransactionsHistory
      movements={balance.movements}
    />

  </div>

  <div className="space-y-6">

    <RecurringIncomeCard
      salary={balance.salary}
    />

  </div>

</div>

    </div>
  );
}