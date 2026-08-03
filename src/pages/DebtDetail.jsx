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
      <div className="p-8">
        Deuda no encontrada.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <PageHeader
        title="Detalle de la deuda"
        description="Consulta toda la información de esta deuda."
      />

      <div className="grid grid-cols-3 gap-6">

        {/* Panel principal */}

        <div className="col-span-2 space-y-6">

          <DebtProgressGauge debt={debt} />

          <DebtHistoryCard debt={debt} />

        </div>

        {/* Panel lateral */}

        <div className="space-y-6">

          <DebtSummaryCard debt={debt} />

          <DebtInfoCard debt={debt} />

        </div>

      </div>

    </div>
  );
}