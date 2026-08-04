import { useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";

import { useDebts } from "../context/DebtsContext";

import DebtSummaryCard from "../features/debts/DebtSummaryCard";
import DebtInfoCard from "../features/debts/DebtInfoCard";
import DebtHistoryCard from "../features/debts/DebtHistoryCard";
import DebtProgressGauge from "../features/debts/DebtProgressGauge";

export default function DebtDetail() {
  const { id } = useParams();

  const { debts } = useDebts();

  const debt = debts.find(
    (item) => item.id === Number(id)
  );

  if (!debt) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
  Deuda no encontrada.
</div>
    );
  }

  return (
    <div className="space-y-8">

      <PageHeader
  title={debt.name}
  description="Consulta toda la información de esta deuda."
/>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">

          <DebtProgressGauge debt={debt} />

          <DebtHistoryCard debt={debt} />

        </div>
        <div className="space-y-6">

          <DebtSummaryCard debt={debt} />

          <DebtInfoCard debt={debt} />

        </div>

      </div>

    </div>
  );
}