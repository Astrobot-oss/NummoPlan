import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import { useBalance } from "../context/BalanceContext";
import ExpenseBreakdownCard from "../features/balance/ExpenseBreakdownCard";
import {
  getMovementsByMonth,
  getBalanceStats,
  getMonthlyStats,
  getAvailableBalanceMonths,
} from "../domain/balanceCalculations";
import { generateMonthlyInsights } from "../domain/insightsCalculations";

export default function BalanceDetail() {
  const { year, month } = useParams();
  const navigate = useNavigate();

  const {
    balance,
    editMovement,
    removeMovement,
    removeRecurringIncome,
    removeRecurringExpense,
  } = useBalance();

  const safeBalance = balance || {
    movements: [],
    recurringIncome: [],
    recurringExpense: [],
    monthlyTargets: {},
    defaultTargetSavings: 300,
  };

  const selectedYear = Number(year);
  const selectedMonth = Number(month);

  const [activityFilter, setActivityFilter] = useState("all");
  const [editingMovement, setEditingMovement] = useState(null);
  const [movementToDelete, setMovementToDelete] = useState(null);
  const [showMovementModal, setShowMovementModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [selectedYear, selectedMonth]);

  const availableMonths = useMemo(
    () => getAvailableBalanceMonths(safeBalance),
    [safeBalance]
  );

  const currentMonthIndex = availableMonths.findIndex(
    (item) => item.year === selectedYear && item.month === selectedMonth
  );

  const currentAvailableMonth =
    currentMonthIndex !== -1 ? availableMonths[currentMonthIndex] : null;

  const previousAvailableMonth =
    currentMonthIndex !== -1
      ? availableMonths[currentMonthIndex + 1] || null
      : null;

  const nextAvailableMonth =
    currentMonthIndex > 0
      ? availableMonths[currentMonthIndex - 1] || null
      : null;

  const monthlyMovements = useMemo(
    () => getMovementsByMonth(safeBalance, selectedYear, selectedMonth),
    [safeBalance, selectedYear, selectedMonth]
  );

  const manualMovements = useMemo(
    () => monthlyMovements.filter((movement) => !movement.recurring),
    [monthlyMovements]
  );

  const recurringMovements = useMemo(
    () => monthlyMovements.filter((movement) => movement.recurring),
    [monthlyMovements]
  );

  const filteredMovements = useMemo(() => {
    let movements = monthlyMovements;

    if (activityFilter === "manual") movements = manualMovements;
    if (activityFilter === "recurring") movements = recurringMovements;

    return movements.slice().sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [
    monthlyMovements,
    manualMovements,
    recurringMovements,
    activityFilter,
  ]);

  const stats = useMemo(
    () =>
      getBalanceStats({
        ...safeBalance,
        movements: monthlyMovements,
      }),
    [safeBalance, monthlyMovements]
  );

  const savingsRate =
    stats.totalIncome > 0
      ? (stats.savings / stats.totalIncome) * 100
      : 0;

  const targetSavings =
    safeBalance.monthlyTargets?.[`${selectedYear}-${selectedMonth}`] ??
    safeBalance.defaultTargetSavings ??
    300;

  const targetDifference = stats.savings - targetSavings;
  const targetReached = stats.savings >= targetSavings;

  const insights = useMemo(
    () =>
      generateMonthlyInsights(
        safeBalance,
        targetSavings,
        selectedYear,
        selectedMonth
      ),
    [safeBalance, targetSavings, selectedYear, selectedMonth]
  );

  const previousStats = useMemo(() => {
    if (!previousAvailableMonth) {
      return { totalIncome: 0, totalExpenses: 0, savings: 0 };
    }

    return getMonthlyStats(
      safeBalance,
      previousAvailableMonth.year,
      previousAvailableMonth.month
    );
  }, [safeBalance, previousAvailableMonth]);

  const monthName = new Date(
    selectedYear,
    selectedMonth,
    1
  ).toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });

  function goToPreviousMonth() {
    if (!previousAvailableMonth) return;

    navigate(
      `/balance/${previousAvailableMonth.year}/${previousAvailableMonth.month}`
    );
  }

  function goToNextMonth() {
    if (!nextAvailableMonth) return;

    navigate(
      `/balance/${nextAvailableMonth.year}/${nextAvailableMonth.month}`
    );
  }

  function handleEditMovement(movement) {
    if (movement.recurring) return;

    setEditingMovement(movement);
    setShowMovementModal(true);
  }

  function handleCloseMovementModal() {
    setEditingMovement(null);
    setShowMovementModal(false);
  }

  function handleSubmitMovement(updatedMovement) {
    editMovement(updatedMovement);
    handleCloseMovementModal();
  }

  function handleDeleteMovement(movement) {
    setMovementToDelete(movement);
  }

  function handleConfirmDelete() {
    if (!movementToDelete) return;

    if (movementToDelete.recurring && movementToDelete.recurringId) {
      if (movementToDelete.type === "income") {
        removeRecurringIncome(movementToDelete.recurringId);
      } else {
        removeRecurringExpense(movementToDelete.recurringId);
      }

      setMovementToDelete(null);
      return;
    }

    if (movementToDelete.id) {
      removeMovement(movementToDelete.id);
    }

    setMovementToDelete(null);
  }

  if (!currentAvailableMonth) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Historial de balance"
          description="Consulta los meses en los que realmente existe actividad."
          action={
            <Link
              to="/balance"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              ← Volver al balance
            </Link>
          }
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">
            Este mes no tiene actividad
          </p>
          <p className="mt-2 text-sm text-slate-500">
            No hay movimientos registrados para este mes.
          </p>
          <Link
            to="/balance"
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Volver al balance
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <PageHeader
        title={`Detalle de ${monthName}`}
        description="Consulta todo lo ocurrido durante este mes."
        action={
          <Link
            to="/balance"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            ← Volver al balance
          </Link>
        }
      />

      <section>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
            <button
              type="button"
              onClick={goToPreviousMonth}
              disabled={!previousAvailableMonth}
              className="group flex items-center gap-3 rounded-xl p-2 text-left transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition group-hover:bg-slate-200">
                ←
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Mes anterior
                </span>
                <span className="mt-0.5 block text-xs capitalize text-slate-400">
                  {previousAvailableMonth
                    ? formatMonth(
                        previousAvailableMonth.year,
                        previousAvailableMonth.month
                      )
                    : "No disponible"}
                </span>
              </span>
            </button>

            <div className="text-center">
              <p className="text-base font-semibold capitalize text-slate-900 sm:text-lg">
                {monthName}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {currentMonthIndex + 1} de {availableMonths.length} meses con
                actividad
              </p>
            </div>

            <button
              type="button"
              onClick={goToNextMonth}
              disabled={!nextAvailableMonth}
              className="group flex items-center justify-end gap-3 rounded-xl p-2 text-right transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Mes siguiente
                </span>
                <span className="mt-0.5 block text-xs capitalize text-slate-400">
                  {nextAvailableMonth
                    ? formatMonth(
                        nextAvailableMonth.year,
                        nextAvailableMonth.month
                      )
                    : "No disponible"}
                </span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition group-hover:bg-slate-200">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          title="Resumen"
          description="Las principales cifras de tu mes."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryMetricCard
            icon="↑"
            iconClass="bg-green-100 text-green-600"
            label="Ingresos"
            value={`+${stats.totalIncome.toLocaleString("es-ES")} €`}
            valueClass="text-green-600"
            description="Total del mes"
          />
          <SummaryMetricCard
            icon="↓"
            iconClass="bg-red-100 text-red-500"
            label="Gastos"
            value={`-${stats.totalExpenses.toLocaleString("es-ES")} €`}
            valueClass="text-red-500"
            description="Total del mes"
          />
          <SummaryMetricCard
            icon="€"
            iconClass="bg-green-100 text-green-600"
            label="Ahorro"
            value={`${stats.savings.toLocaleString("es-ES")} €`}
            valueClass={
              stats.savings >= 0 ? "text-green-600" : "text-red-500"
            }
            description="Ingresos − Gastos"
          />
          <SummaryMetricCard
            icon="%"
            iconClass="bg-blue-100 text-blue-600"
            label="Tasa de ahorro"
            value={`${savingsRate.toFixed(1)} %`}
            valueClass="text-blue-600"
            description="Sobre tus ingresos"
          />
        </div>
      </section>

      <section>
        <SectionHeading
          title="Análisis del mes"
          description="Comprende cómo se comportó tu dinero este mes."
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Comparación con el mes anterior
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Cómo han cambiado tus principales cifras.
              </p>
            </div>

            {!previousAvailableMonth ? (
              <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                No existe otro mes con actividad para comparar.
              </p>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <ComparisonItem
                  label="Ingresos"
                  current={stats.totalIncome}
                  previous={previousStats.totalIncome}
                  positiveIsGood
                />
                <ComparisonItem
                  label="Gastos"
                  current={stats.totalExpenses}
                  previous={previousStats.totalExpenses}
                  positiveIsGood={false}
                />
                <ComparisonItem
                  label="Ahorro"
                  current={stats.savings}
                  previous={previousStats.savings}
                  positiveIsGood
                />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Meta de ahorro
              </h3>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl text-blue-600">
                ◎
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Ahorrado
                </p>
                <p
                  className={`mt-1 text-2xl font-bold ${
                    stats.savings >= 0 ? "text-slate-900" : "text-red-500"
                  }`}
                >
                  {stats.savings.toLocaleString("es-ES")} €
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
                  Objetivo
                </p>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  {targetSavings.toLocaleString("es-ES")} €
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
              <p className="text-sm font-medium text-slate-500">
                {targetReached ? "Objetivo superado" : "Para alcanzar la meta"}
              </p>
              <p
                className={`text-lg font-bold ${
                  targetReached ? "text-green-600" : "text-red-500"
                }`}
              >
                {targetReached ? "+" : "-"}
                {Math.abs(targetDifference).toLocaleString("es-ES")} €
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="overflow-visible rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ExpenseBreakdownCard movements={monthlyMovements} />
        </div>
      </section>

      <section>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Lectura del mes
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Algunas conclusiones sobre tu comportamiento financiero.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {insights.length === 0 ? (
              <div className="rounded-xl bg-slate-50 p-4 md:col-span-2 xl:col-span-3">
                <p className="text-sm text-slate-500">
                  No hay suficientes datos para generar análisis.
                </p>
              </div>
            ) : (
              insights.map((insight, index) => (
                <InsightCard
                  key={`${insight.title}-${index}`}
                  insight={insight}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Actividad del mes
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Todos los movimientos registrados durante este mes.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <ActivityFilterButton
              active={activityFilter === "all"}
              onClick={() => setActivityFilter("all")}
              label={`Todos (${monthlyMovements.length})`}
            />
            <ActivityFilterButton
              active={activityFilter === "manual"}
              onClick={() => setActivityFilter("manual")}
              label={`Manuales (${manualMovements.length})`}
            />
            <ActivityFilterButton
              active={activityFilter === "recurring"}
              onClick={() => setActivityFilter("recurring")}
              label={`Recurrentes (${recurringMovements.length})`}
            />
          </div>

          {filteredMovements.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center">
              <p className="text-sm text-slate-500">
                {activityFilter === "manual"
                  ? "No hay movimientos manuales durante este mes."
                  : activityFilter === "recurring"
                    ? "No hay movimientos recurrentes durante este mes."
                    : "No hay movimientos registrados durante este mes."}
              </p>
            </div>
          ) : (
            <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
              <div className="hidden grid-cols-[110px_minmax(110px,0.8fr)_minmax(160px,1.5fr)_90px_110px_170px] gap-3 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid">
                <span>Fecha</span>
                <span>Categoría</span>
                <span>Descripción</span>
                <span>Tipo</span>
                <span className="text-right">Importe</span>
                <span className="text-right">Acciones</span>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredMovements.map((movement) => (
                  <MovementRow
                    key={movement.id}
                    movement={movement}
                    onEdit={() => handleEditMovement(movement)}
                    onDelete={() => handleDeleteMovement(movement)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Modal open={showMovementModal} onClose={handleCloseMovementModal}>
        <MovementEditForm
          movement={editingMovement}
          onCancel={handleCloseMovementModal}
          onSubmit={handleSubmitMovement}
        />
      </Modal>

      <ConfirmModal
        open={movementToDelete !== null}
        onClose={() => setMovementToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={
          movementToDelete?.recurring
            ? movementToDelete.type === "income"
              ? "Eliminar ingreso recurrente"
              : "Eliminar gasto recurrente"
            : "Eliminar movimiento"
        }
        message={
          movementToDelete?.recurring
            ? "Esta acción eliminará la regla recurrente y dejará de generar este movimiento en los meses correspondientes. ¿Quieres continuar?"
            : "Esta acción no se puede deshacer. ¿Quieres eliminar este movimiento?"
        }
      />
    </div>
  );
}

function formatMonth(year, month) {
  return new Date(year, month, 1).toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });
}

function SectionHeading({ title, description }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}

function SummaryMetricCard({
  icon,
  iconClass,
  label,
  value,
  valueClass,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold ${iconClass}`}
        >
          {icon}
        </span>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
      </div>

      <p className={`mt-5 text-2xl font-bold sm:text-3xl ${valueClass}`}>
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function ComparisonItem({
  label,
  current,
  previous,
  positiveIsGood,
}) {
  const difference = current - previous;
  const percentage =
    previous !== 0 ? (difference / Math.abs(previous)) * 100 : null;

  const isPositive = difference > 0;
  const isNegative = difference < 0;

  let changeClass = "text-slate-500";

  if (isPositive) {
    changeClass = positiveIsGood ? "text-green-600" : "text-red-500";
  }

  if (isNegative) {
    changeClass = positiveIsGood ? "text-red-500" : "text-green-600";
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <p className="text-sm font-semibold text-slate-700">{label}</p>

      <p className={`mt-3 text-lg font-bold ${changeClass}`}>
        {difference > 0 ? "↑ " : ""}
        {difference < 0 ? "↓ " : ""}
        {Math.abs(difference).toLocaleString("es-ES")} €
      </p>

      {percentage !== null && (
        <p className={`mt-1 text-xs font-medium ${changeClass}`}>
          ({percentage > 0 ? "+" : ""}
          {percentage.toFixed(1)}%)
        </p>
      )}

      <p className="mt-3 text-xs text-slate-400">
        Mes anterior: {previous.toLocaleString("es-ES")} €
      </p>
    </div>
  );
}

function InsightCard({ insight, index }) {
  const styles = [
    { icon: "↗", wrapper: "bg-green-50 text-green-600" },
    { icon: "◔", wrapper: "bg-red-50 text-red-500" },
    { icon: "★", wrapper: "bg-amber-50 text-amber-500" },
  ];

  const style = styles[index % styles.length];

  return (
    <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${style.wrapper}`}
      >
        {style.icon}
      </span>

      <div className="min-w-0">
        <p className="font-semibold text-slate-800">{insight.title}</p>
        <p className="mt-1 text-sm leading-5 text-slate-500">
          {insight.description}
        </p>
      </div>
    </div>
  );
}

function ActivityFilterButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-slate-800 text-white shadow-sm"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

function MovementRow({ movement, onEdit, onDelete }) {
  const isIncome = movement.type === "income";
  const isRecurring = Boolean(movement.recurring);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-4 transition hover:bg-slate-50 md:grid-cols-[110px_minmax(110px,0.8fr)_minmax(160px,1.5fr)_90px_110px_170px] md:items-center md:gap-3">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400 md:hidden">
          Fecha
        </p>
        <p className="mt-1 text-sm text-slate-600 md:mt-0">
          {new Date(movement.date).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400 md:hidden">
          Categoría
        </p>
        <p className="mt-1 truncate font-medium text-slate-900 md:mt-0">
          {movement.category}
        </p>
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400 md:hidden">
          Descripción
        </p>
        <div className="mt-1 flex min-w-0 flex-wrap items-center gap-2 md:mt-0">
          <p className="min-w-0 truncate text-sm text-slate-600">
            {movement.description ||
              movement.concept ||
              movement.title ||
              "Sin descripción"}
          </p>

          {isRecurring && (
            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
              ↻ Recurrente
            </span>
          )}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400 md:hidden">
          Tipo
        </p>
        <span
          className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold md:mt-0 ${
            isIncome
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isIncome ? "Ingreso" : "Gasto"}
        </span>
      </div>

      <div className="text-left md:text-right">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400 md:hidden">
          Importe
        </p>
        <p
          className={`mt-1 whitespace-nowrap font-bold md:mt-0 ${
            isIncome ? "text-green-600" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"}
          {Number(movement.amount || 0).toLocaleString("es-ES")} €
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
        {!isRecurring && (
  <>
    <button
      type="button"
      onClick={onEdit}
      className="whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
    >
      Editar
    </button>

    <button
      type="button"
      onClick={onDelete}
      className="whitespace-nowrap rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
    >
      Eliminar
    </button>
  </>
)}
      </div>
    </div>
  );
}

function MovementEditForm({ movement, onCancel, onSubmit }) {
  const [form, setForm] = useState({
    id: "",
    date: "",
    category: "",
    description: "",
    type: "expense",
    amount: "",
    recurring: false,
  });

  useEffect(() => {
    if (!movement) return;

    setForm({
      id: movement.id ?? "",
      date: movement.date ? String(movement.date).slice(0, 10) : "",
      category: movement.category ?? "",
      description:
        movement.description ??
        movement.concept ??
        movement.title ??
        "",
      type: movement.type ?? "expense",
      amount: movement.amount ?? "",
      recurring: Boolean(movement.recurring),
    });
  }, [movement]);

  if (!movement) return null;

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      ...movement,
      id: form.id,
      date: form.date,
      category: form.category,
      description: form.description,
      type: form.type,
      amount: Number(form.amount),
      recurring: form.recurring,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Editar movimiento
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Modifica los datos del movimiento.
        </p>
      </div>

      <div>
        <label
          htmlFor="movement-date"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Fecha
        </label>
        <input
          id="movement-date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
          required
        />
      </div>

      <div>
        <label
          htmlFor="movement-category"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Categoría
        </label>
        <input
          id="movement-category"
          name="category"
          type="text"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
          required
        />
      </div>

      <div>
        <label
          htmlFor="movement-description"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Descripción
        </label>
        <input
          id="movement-description"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
          placeholder="Descripción del movimiento"
        />
      </div>

      <div>
        <label
          htmlFor="movement-type"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Tipo
        </label>
        <select
          id="movement-type"
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
        >
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="movement-amount"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Importe
        </label>
        <div className="relative">
          <input
            id="movement-amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
            required
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            €
          </span>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-3">
        <input
          name="recurring"
          type="checkbox"
          checked={form.recurring}
          onChange={handleChange}
          className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500"
        />
        <span className="text-sm font-medium text-slate-700">
          Movimiento recurrente
        </span>
      </label>

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
}