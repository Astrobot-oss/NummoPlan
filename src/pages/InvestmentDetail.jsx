import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useInvestments } from "../context/InvestmentContext";
import InvestmentChart from "../features/investments/InvestmentChart";
import InvestmentSummaryCard from "../features/investments/InvestmentSummaryCard";
import InvestmentInfoCard from "../features/investments/InvestmentInfoCard";
import InvestmentHistoryCard from "../features/investments/InvestmentHistoryCard";
import { getInvestmentStats } from "../domain/investmentCalculations";

import { useState } from "react";

import Modal from "../components/Modal";
import PrimaryButton from "../components/PrimaryButton";

import BuySharesModal from "../features/investments/BuySharesModal";
import UpdateValueModal from "../features/investments/UpdateValueModal";

import {
  addContribution,
  updateCurrentValue,
} from "../domain/investmentService";

export default function InvestmentDetail() {
  const { id } = useParams();
  const { investments, setInvestments } =
  useInvestments();

  const [buyOpen, setBuyOpen] =
  useState(false);

const [updateOpen, setUpdateOpen] =
  useState(false);

const investment = investments.find(
  (item) => item.id === id
);
if (!investment) {
  return (
    <div className="p-8">
      Inversión no encontrada.
    </div>
  );
}
const {
  totalShares,
  totalInvested,
  averagePrice,
  currentValue,
  profit,
  percentage,
} = getInvestmentStats(investment);
    
function handleContribution(data) {
  setInvestments((prev) =>
    addContribution(
      prev,
      investment.id,
      data
    )
  );

  setBuyOpen(false);
}

function handleUpdateValue(price) {
  setInvestments((prev) =>
    updateCurrentValue(
      prev,
      investment.id,
      price
    )
  );

  setUpdateOpen(false);
}
  return (
  <div className="space-y-8">

    <PageHeader
      title="Detalle de la inversión"
      description="Consulta toda la evolución de tu inversión."
      action={
        <div className="flex gap-3">

          <PrimaryButton
            onClick={() => setBuyOpen(true)}
          >
            Comprar
          </PrimaryButton>

          <PrimaryButton
            onClick={() => setUpdateOpen(true)}
          >
            Actualizar valor
          </PrimaryButton>

        </div>
      }
    />

    <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Gráfica
          </h2>

          {investment.history.length >= 2 ? (
  <div className="mt-8 h-80">
    <InvestmentChart history={investment.history} />
  </div>
) : (
  <div className="mt-8 flex h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300">

    <div className="text-center">

      <p className="text-lg font-semibold">
        Todavía no hay suficiente historial
      </p>

      <p className="mt-2 text-slate-500">
        La gráfica se generará automáticamente conforme se registren valores en distintos días.
      </p>

    </div>

  </div>
)}

        </div>

        <div className="space-y-6">

          <InvestmentSummaryCard
  investment={investment}
  invested={totalInvested}
  currentValue={currentValue}
  profit={profit}
  percentage={percentage}
  totalShares={totalShares}
/>

          <InvestmentInfoCard
  investment={investment}
  totalShares={totalShares}
  averagePrice={averagePrice}
/>

          <InvestmentHistoryCard
  investment={investment}
/>
          </div>

      </div>

      <Modal
        open={buyOpen}
        onClose={() => setBuyOpen(false)}
      >
        <BuySharesModal
          investment={investment}
          onSubmit={handleContribution}
        />
      </Modal>

      <Modal
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
      >
        <UpdateValueModal
          investment={investment}
          onSubmit={handleUpdateValue}
        />
      </Modal>

    </div>
  );
}