import { useState } from "react";

import PageHeader from "../components/PageHeader";
import PrimaryButton from "../components/PrimaryButton";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

import { useBalance } from "../context/BalanceContext";

import BalanceSummaryCard from "../features/balance/BalanceSummaryCard";
import MonthlyInsightsCard from "../features/balance/MonthlyInsightsCard";

import RecurringIncomeCard from "../features/balance/RecurringIncomeCard";
import { RecurringIncomeModal } from "../features/balance/RecurringIncomeModal";

import RecurringExpenseCard from "../features/balance/RecurringExpenseCard";
import { RecurringExpenseModal } from "../features/balance/RecurringExpenseModal";

import MovementModal from "../features/balance/MovementModal";
import ExpenseBreakdownSummaryCard from "../features/balance/ExpenseBreakdownSummaryCard";

import { AccumulatedSavingsChart } from "../features/balance/AccumulatedSavingsChart";

import {
  getBalanceSummary,
  getHistoricalStats,
  getMovementsByMonth,
} from "../domain/balanceCalculations";

import { generateMonthlyInsights } from "../domain/insightsCalculations";

export default function Balance() {
  const {
    balance,
    createMovement,
    editMovement,
    removeMovement,
    createRecurringIncome,
    editRecurringIncome,
    removeRecurringIncome,
    createRecurringExpense,
    editRecurringExpense,
    removeRecurringExpense,
  } = useBalance();

  const safeBalance = balance || {
    movements: [],
    recurringIncome: [],
    recurringExpense: [],
    monthlyTargets: {},
    defaultTargetSavings: 300,
  };

  // --------------------------------------------------
  // FECHA ACTUAL
  // --------------------------------------------------

  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // --------------------------------------------------
  // OBJETIVO DE AHORRO
  // --------------------------------------------------

  const [targetSavings, setTargetSavings] =
    useState(
      safeBalance.defaultTargetSavings ?? 300
    );

  // --------------------------------------------------
  // MODAL — MOVIMIENTO
  // --------------------------------------------------

  const [
    showMovementModal,
    setShowMovementModal,
  ] = useState(false);

  const [
    editingMovement,
    setEditingMovement,
  ] = useState(null);

  const [
    movementToDelete,
    setMovementToDelete,
  ] = useState(null);

  // --------------------------------------------------
  // MODAL — INGRESO RECURRENTE
  // --------------------------------------------------

  const [
    showRecurringIncomeModal,
    setShowRecurringIncomeModal,
  ] = useState(false);

  // --------------------------------------------------
  // MODAL — GASTO RECURRENTE
  // --------------------------------------------------

  const [
    showRecurringExpenseModal,
    setShowRecurringExpenseModal,
  ] = useState(false);

  // --------------------------------------------------
  // EDICIÓN / ELIMINACIÓN
  // --------------------------------------------------

  const [
    editingRecurringIncome,
    setEditingRecurringIncome,
  ] = useState(null);

  const [
    recurringIncomeToDelete,
    setRecurringIncomeToDelete,
  ] = useState(null);

  const [
    editingRecurringExpense,
    setEditingRecurringExpense,
  ] = useState(null);

  const [
    recurringExpenseToDelete,
    setRecurringExpenseToDelete,
  ] = useState(null);

  // --------------------------------------------------
  // NUEVO MOVIMIENTO
  // --------------------------------------------------

  function handleNewMovement() {
    setEditingMovement(null);
    setShowMovementModal(true);
  }

  // --------------------------------------------------
  // DATOS CALCULADOS
  // --------------------------------------------------

  const summary =
    getBalanceSummary(safeBalance);

  const historicalData =
    getHistoricalStats(
      safeBalance,
      6,
      targetSavings
    );

  const insights =
    generateMonthlyInsights(
      safeBalance,
      targetSavings
    );

  // --------------------------------------------------
  // ACTIVIDAD DEL MES ACTUAL
  // --------------------------------------------------

  const currentMonthMovements =
    getMovementsByMonth(
      safeBalance,
      currentYear,
      currentMonth
    );

  // --------------------------------------------------
  // RUTA DEL DETALLE DEL MES ACTUAL
  // --------------------------------------------------

  const currentMonthDetailPath =
    `/balance/${currentYear}/${currentMonth}`;

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="space-y-10">
      {/* ==================================================
          CABECERA
      ================================================== */}

      <PageHeader
        title="Balance"
        description="Comprende realmente qué ocurre con tu dinero."
        action={
          <PrimaryButton
            onClick={handleNewMovement}
          >
            Nuevo movimiento
          </PrimaryButton>
        }
      />

      {/* ==================================================
          1. RESUMEN
      ================================================== */}

      <section>
        <BalanceSummaryCard
          summary={summary}
          detailPath={currentMonthDetailPath}
        />
      </section>

      {/* ==================================================
          2. ANÁLISIS MENSUAL
      ================================================== */}

      <section>
        <MonthlyInsightsCard
          insights={insights}
          targetSavings={targetSavings}
          onTargetChange={setTargetSavings}
        />
      </section>

      {/* ==================================================
          3. EVOLUCIÓN
      ================================================== */}

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Evolución
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Comprueba cómo evoluciona tu ahorro frente a la meta que te has marcado.
          </p>
        </div>

        <div className="w-full">
          <AccumulatedSavingsChart
            historicalData={historicalData}
          />
        </div>
      </section>

      {/* ==================================================
          4. ORGANIZACIÓN DEL DINERO
      ================================================== */}

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Organización del dinero
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Consulta dónde estás gastando y qué movimientos tienes previstos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* ==================================================
              DESGLOSE DE GASTOS
          ================================================== */}

          <ExpenseBreakdownSummaryCard
            movements={currentMonthMovements}
          />

          {/* ==================================================
              MOVIMIENTOS RECURRENTES
          ================================================== */}

          <div className="space-y-6">
            <RecurringIncomeCard
              recurringIncome={
                safeBalance.recurringIncome
              }
              onAdd={() => {
                setEditingRecurringIncome(null);
                setShowRecurringIncomeModal(true);
              }}
              onEdit={(income) => {
                setEditingRecurringIncome(income);
                setShowRecurringIncomeModal(true);
              }}
              onDelete={(id) => {
                setRecurringIncomeToDelete(id);
              }}
            />

            <RecurringExpenseCard
              recurringExpense={
                safeBalance.recurringExpense
              }
              onAdd={() => {
                setEditingRecurringExpense(null);
                setShowRecurringExpenseModal(true);
              }}
              onEdit={(expense) => {
                setEditingRecurringExpense(expense);
                setShowRecurringExpenseModal(true);
              }}
              onDelete={(id) => {
                setRecurringExpenseToDelete(id);
              }}
            />
          </div>
        </div>
      </section>

      {/* ==================================================
          MODAL — INGRESO RECURRENTE
      ================================================== */}

      <Modal
        open={showRecurringIncomeModal}
        onClose={() => {
          setEditingRecurringIncome(null);
          setShowRecurringIncomeModal(false);
        }}
      >
        <RecurringIncomeModal
          recurringIncome={
            editingRecurringIncome
          }
          onClose={() => {
            setEditingRecurringIncome(null);
            setShowRecurringIncomeModal(false);
          }}
          onSubmit={(income) => {
            if (editingRecurringIncome) {
              editRecurringIncome(income);
            } else {
              createRecurringIncome(income);
            }

            setEditingRecurringIncome(null);
            setShowRecurringIncomeModal(false);
          }}
        />
      </Modal>

      {/* ==================================================
          MODAL — GASTO RECURRENTE
      ================================================== */}

      <Modal
        open={showRecurringExpenseModal}
        onClose={() => {
          setEditingRecurringExpense(null);
          setShowRecurringExpenseModal(false);
        }}
      >
        <RecurringExpenseModal
          recurringExpense={
            editingRecurringExpense
          }
          onClose={() => {
            setEditingRecurringExpense(null);
            setShowRecurringExpenseModal(false);
          }}
          onSubmit={(expense) => {
            if (editingRecurringExpense) {
              editRecurringExpense(expense);
            } else {
              createRecurringExpense(expense);
            }

            setEditingRecurringExpense(null);
            setShowRecurringExpenseModal(false);
          }}
        />
      </Modal>

      {/* ==================================================
          MODAL — MOVIMIENTO
      ================================================== */}

      <Modal
        open={showMovementModal}
        onClose={() => {
          setEditingMovement(null);
          setShowMovementModal(false);
        }}
      >
        <MovementModal
          movement={editingMovement}
          onSubmit={(movement) => {
            if (editingMovement) {
              editMovement(movement);
            } else {
              createMovement(movement);
            }

            setEditingMovement(null);
            setShowMovementModal(false);
          }}
        />
      </Modal>

      {/* ==================================================
          CONFIRMAR — MOVIMIENTO
      ================================================== */}

      <ConfirmModal
        open={movementToDelete !== null}
        onClose={() => {
          setMovementToDelete(null);
        }}
        onConfirm={() => {
          if (movementToDelete === null) {
            return;
          }

          removeMovement(movementToDelete);
          setMovementToDelete(null);
        }}
        title="Eliminar movimiento"
        message="Esta acción no se puede deshacer. ¿Quieres eliminar este movimiento?"
      />

      {/* ==================================================
          CONFIRMAR — INGRESO RECURRENTE
      ================================================== */}

      <ConfirmModal
        open={
          recurringIncomeToDelete !== null
        }
        onClose={() => {
          setRecurringIncomeToDelete(null);
        }}
        onConfirm={() => {
          if (
            recurringIncomeToDelete === null
          ) {
            return;
          }

          removeRecurringIncome(
            recurringIncomeToDelete
          );

          setRecurringIncomeToDelete(null);
        }}
        title="Eliminar ingreso recurrente"
        message="Esta acción no se puede deshacer. ¿Quieres eliminar este ingreso recurrente?"
      />

      {/* ==================================================
          CONFIRMAR — GASTO RECURRENTE
      ================================================== */}

      <ConfirmModal
        open={
          recurringExpenseToDelete !== null
        }
        onClose={() => {
          setRecurringExpenseToDelete(null);
        }}
        onConfirm={() => {
          if (
            recurringExpenseToDelete === null
          ) {
            return;
          }

          removeRecurringExpense(
            recurringExpenseToDelete
          );

          setRecurringExpenseToDelete(null);
        }}
        title="Eliminar gasto recurrente"
        message="Esta acción no se puede deshacer. ¿Quieres eliminar este gasto recurrente?"
      />
    </div>
  );
}