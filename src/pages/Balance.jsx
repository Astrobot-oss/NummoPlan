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

import { MonthlySavingsChart } from "../features/balance/MonthlySavingsChart";
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

  const [targetSavings, setTargetSavings] = useState(
    safeBalance.defaultTargetSavings ?? 300
  );

  // --------------------------------------------------
  // MODALES
  // --------------------------------------------------

  const [
    showRecurringIncomeModal,
    setShowRecurringIncomeModal,
  ] = useState(false);

  const [
    showRecurringExpenseModal,
    setShowRecurringExpenseModal,
  ] = useState(false);

  const [
    showMovementModal,
    setShowMovementModal,
  ] = useState(false);

  // --------------------------------------------------
  // EDICIÓN / ELIMINACIÓN
  // --------------------------------------------------

  const [editingMovement, setEditingMovement] =
    useState(null);

  const [movementToDelete, setMovementToDelete] =
    useState(null);

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
  // DATOS CALCULADOS
  // --------------------------------------------------

  const summary = getBalanceSummary(
    safeBalance
  );

  const historicalData = getHistoricalStats(
    safeBalance,
    6,
    targetSavings
  );

  const insights = generateMonthlyInsights(
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

  const recentMovements =
    currentMonthMovements
      .slice()
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
      .slice(0, 5);

  // --------------------------------------------------
  // RUTA DEL DETALLE DEL MES ACTUAL
  // --------------------------------------------------

  const currentMonthDetailPath =
    `/balance/${currentYear}/${currentMonth}`;

  // --------------------------------------------------
  // NUEVO MOVIMIENTO
  // --------------------------------------------------

  function handleNewMovement() {
    setEditingMovement(null);
    setShowMovementModal(true);
  }

  return (
    <div>
      {/* ==================================================
          CABECERA
      ================================================== */}

      <PageHeader
        title="Balance"
        description="Comprende realmente qué ocurre con tu dinero."
        action={
          <PrimaryButton onClick={handleNewMovement}>
            Nuevo movimiento
          </PrimaryButton>
        }
      />

      {/* ==================================================
          1. RESUMEN
          La tarjeta completa funciona como entrada
          al detalle del mes actual.
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
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Evolución
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Cómo está evolucionando tu ahorro a lo largo del tiempo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <MonthlySavingsChart
            historicalData={historicalData}
          />

          <AccumulatedSavingsChart
            historicalData={historicalData}
          />
        </div>
      </section>

      {/* ==================================================
          4. ORGANIZACIÓN DEL DINERO
      ================================================== */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Organización del dinero
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Consulta dónde estás gastando y qué movimientos tienes
            previstos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* ==================================================
              DESGLOSE DE GASTOS

              Ya NO contiene ningún enlace al detail.
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
          5. ACTIVIDAD RECIENTE
      ================================================== */}

      <section>
        <div className="mb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Actividad reciente
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tus últimos movimientos registrados este mes.
            </p>
          </div>
        </div>

        {recentMovements.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-10 text-center">
            <p className="text-sm text-slate-500">
              Todavía no hay movimientos registrados este mes.
            </p>

            <button
              type="button"
              onClick={handleNewMovement}
              className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              Registrar movimiento
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentMovements.map(
              (movement) => (
                <div
                  key={movement.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          movement.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {movement.type === "income"
                          ? "Ingreso"
                          : "Gasto"}
                      </span>

                      {movement.recurring && (
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                          ↻ Recurrente
                        </span>
                      )}
                    </div>

                    <p className="mt-2 truncate font-semibold text-slate-900">
                      {movement.category}
                    </p>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {movement.description ||
                        movement.concept ||
                        movement.title ||
                        "Sin descripción"}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`font-bold ${
                        movement.type === "income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {movement.type === "income"
                        ? "+"
                        : "-"}
                      {Number(
                        movement.amount || 0
                      ).toLocaleString("es-ES")}{" "}
                      €
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(
                        movement.date
                      ).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "short",
                        }
                      )}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
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
        onClose={() =>
          setMovementToDelete(null)
        }
        onConfirm={() => {
          removeMovement(
            movementToDelete
          );
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
        onClose={() =>
          setRecurringIncomeToDelete(null)
        }
        onConfirm={() => {
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
        onClose={() =>
          setRecurringExpenseToDelete(null)
        }
        onConfirm={() => {
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