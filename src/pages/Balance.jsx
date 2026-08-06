import PageHeader from "../components/PageHeader";
import PrimaryButton from "../components/PrimaryButton";

import BalanceSummaryCard from "../features/balance/BalanceSummaryCard";
import MonthlyInsightsCard from "../features/balance/MonthlyInsightsCard";
import TransactionsHistory from "../features/balance/TransactionsHistory";
import RecurringIncomeCard from "../features/balance/RecurringIncomeCard";
import { useState } from "react";
import Modal from "../components/Modal";
import RecurringIncomeModal from "../features/balance/RecurringIncomeModal";
import { useBalance } from "../context/BalanceContext";

export default function Balance() {
  const { balance, editSalary } = useBalance();
  const [showRecurringIncomeModal, setShowRecurringIncomeModal] =
  useState(false);
  const handleNewMovement = () => {};

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
  onEdit={() => setShowRecurringIncomeModal(true)}
/>
  </div>

</div>
<Modal
  open={showRecurringIncomeModal}
  onClose={() => setShowRecurringIncomeModal(false)}
>
  <RecurringIncomeModal
  salary={balance.salary}
  onSubmit={(salary) => {
    editSalary(salary);
    setShowRecurringIncomeModal(false);
  }}
/>
</Modal>
    </div>
  );
}