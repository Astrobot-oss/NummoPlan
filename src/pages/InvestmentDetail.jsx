import { useState } from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import PrimaryButton from "../components/PrimaryButton";

import { useInvestments } from "../context/InvestmentContext";

import {
  addContribution,
  sellInvestment,
  updateCurrentValue,
  addDividend,
} from "../domain/investmentService";

import { getInvestmentStats } from "../domain/investmentCalculations";

import InvestmentChart from "../features/investments/InvestmentChart";
import InvestmentSummaryCard from "../features/investments/InvestmentSummaryCard";
import InvestmentInfoCard from "../features/investments/InvestmentInfoCard";
import InvestmentHistoryCard from "../features/investments/InvestmentHistoryCard";

import BuySharesModal from "../features/investments/BuySharesModal";
import SellSharesModal from "../features/investments/SellSharesModal";
import DividendModal from "../features/investments/DividendModal";
import UpdateValueModal from "../features/investments/UpdateValueModal";

export default function InvestmentDetail() {
  const { id } = useParams();

  const { investments, setInvestments } =
    useInvestments();

  const [buyOpen, setBuyOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [dividendOpen, setDividendOpen] =
    useState(false);
  const [updateOpen, setUpdateOpen] =
    useState(false);

  const investment = investments.find(
    (item) => String(item.id) === String(id)
  );

  if (!investment) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
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
    dividends,
  } = getInvestmentStats(investment);

  function handleContribution(data) {
    setInvestments((prev) =>
      addContribution(prev, investment.id, data)
    );

    setBuyOpen(false);
  }

  function handleSell(data) {
    setInvestments((prev) =>
      sellInvestment(prev, investment.id, data)
    );

    setSellOpen(false);
  }

  function handleDividend(amount) {
    setInvestments((prev) =>
      addDividend(prev, investment.id, amount)
    );

    setDividendOpen(false);
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

  function handleCloseBuyModal() {
  setBuyOpen(false);
}

  return (
    <div className="space-y-8">

      <PageHeader
        title="Detalle de la inversión"
        description="Consulta toda la evolución de tu inversión."
        action={
          <>
            <PrimaryButton
              onClick={() => setBuyOpen(true)}
            >
              Comprar
            </PrimaryButton>

            <PrimaryButton
              onClick={() => setSellOpen(true)}
            >
              Vender
            </PrimaryButton>

            <PrimaryButton
              onClick={() =>
                setDividendOpen(true)
              }
            >
              Dividendo
            </PrimaryButton>

            <PrimaryButton
              onClick={() =>
                setUpdateOpen(true)
              }
            >
              Actualizar
            </PrimaryButton>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2 rounded-3xl bg-white p-5 shadow-sm sm:p-6 xl:p-8">

          <h2 className="text-xl font-bold xl:text-2xl">
            Gráfica
          </h2>

          {investment.history.length >= 2 ? (

            <div className="mt-6 h-64 xl:mt-8 xl:h-80">

              <InvestmentChart
                history={investment.history}
              />

            </div>

          ) : (

            <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 xl:mt-8 xl:h-80">

              <div className="text-center">

                <p className="text-lg font-semibold">
                  Todavía no hay suficiente historial
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                  La gráfica aparecerá automáticamente
                  conforme registres valores en
                  distintos días.
                </p>

              </div>

            </div>

          )}

        </div>

        <div className="space-y-5 sm:space-y-6">

          <InvestmentSummaryCard
            investment={investment}
            invested={totalInvested}
            currentValue={currentValue}
            profit={profit}
            percentage={percentage}
            totalShares={totalShares}
            dividends={dividends}
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
        onClose={handleCloseBuyModal}
      >
        <BuySharesModal
          investment={investment}
          onSubmit={handleContribution}
        />
      </Modal>

      <Modal
        open={sellOpen}
        onClose={() => setSellOpen(false)}
      >
        <SellSharesModal
          investment={investment}
          onSubmit={handleSell}
        />
      </Modal>

      <Modal
        open={dividendOpen}
        onClose={() =>
          setDividendOpen(false)
        }
      >
        <DividendModal
          investment={investment}
          onSubmit={handleDividend}
        />
      </Modal>

      <Modal
        open={updateOpen}
        onClose={() =>
          setUpdateOpen(false)
        }
      >
        <UpdateValueModal
          investment={investment}
          onSubmit={handleUpdateValue}
        />
      </Modal>

    </div>
  );
}