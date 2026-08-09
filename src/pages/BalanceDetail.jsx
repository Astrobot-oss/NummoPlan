import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { useBalance } from "../context/BalanceContext";
import ExpenseBreakdownCard from "../features/balance/ExpenseBreakdownCard";

import { generateMonthlyInsights } from "../domain/insightsCalculations";

export default function BalanceDetail() {
  const { year, month } = useParams();
  const navigate = useNavigate();
  const { balance } = useBalance();

  const safeBalance = balance || {
    movements: [],
    recurringIncome: [],
    recurringExpense: [],
    monthlyTargets: {},
    defaultTargetSavings: 300,
  };

  const selectedYear = Number(year);
  const selectedMonth = Number(month);

  // ============================================================
  // MESES CON ACTIVIDAD
  // ============================================================

  const availableMonths = useMemo(() => {
    return getAvailableBalanceMonths(safeBalance);
  }, [safeBalance]);

  const currentMonthIndex = availableMonths.findIndex(
    (item) =>
      item.year === selectedYear &&
      item.month === selectedMonth
  );

  const currentAvailableMonth =
    currentMonthIndex !== -1
      ? availableMonths[currentMonthIndex]
      : null;

  const previousAvailableMonth =
    currentMonthIndex !== -1
      ? availableMonths[currentMonthIndex + 1] || null
      : null;

  const nextAvailableMonth =
    currentMonthIndex > 0
      ? availableMonths[currentMonthIndex - 1] || null
      : null;

  // ============================================================
  // MOVIMIENTOS DEL MES
  // ============================================================

  const monthlyMovements = useMemo(() => {
    return getMovementsByMonth(
      safeBalance,
      selectedYear,
      selectedMonth
    );
  }, [
    safeBalance,
    selectedYear,
    selectedMonth,
  ]);

  const manualMovements = useMemo(() => {
    return monthlyMovements.filter(
      (movement) => !movement.recurring
    );
  }, [monthlyMovements]);

  const recurringMovements = useMemo(() => {
    return monthlyMovements.filter(
      (movement) => movement.recurring
    );
  }, [monthlyMovements]);

  // ============================================================
  // ESTADÍSTICAS
  // ============================================================

  const stats = useMemo(() => {
    return getBalanceStats({
      ...safeBalance,
      movements: monthlyMovements,
    });
  }, [safeBalance, monthlyMovements]);

  // ============================================================
  // META DE AHORRO
  // ============================================================

  const targetSavings =
    safeBalance.monthlyTargets?.[
      `${selectedYear}-${selectedMonth}`
    ] ??
    safeBalance.defaultTargetSavings ??
    300;

  // ============================================================
  // INSIGHTS
  // ============================================================

  const insights = useMemo(() => {
    return generateMonthlyInsights(
      safeBalance,
      targetSavings,
      selectedYear,
      selectedMonth
    );
  }, [
    safeBalance,
    targetSavings,
    selectedYear,
    selectedMonth,
  ]);

  // ============================================================
  // COMPARACIÓN
  // ============================================================

  const previousStats = useMemo(() => {
    if (!previousAvailableMonth) {
      return {
        totalIncome: 0,
        totalExpenses: 0,
        savings: 0,
      };
    }

    return getMonthlyStats(
      safeBalance,
      previousAvailableMonth.year,
      previousAvailableMonth.month
    );
  }, [
    safeBalance,
    previousAvailableMonth,
  ]);

  // ============================================================
  // NOMBRE DEL MES
  // ============================================================

  const monthName = new Date(
    selectedYear,
    selectedMonth,
    1
  ).toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });

  // ============================================================
  // NAVEGACIÓN
  // ============================================================

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

  // ============================================================
  // MES NO DISPONIBLE
  // ============================================================

  if (!currentAvailableMonth) {
    return (
      <div>
        <PageHeader
          title="Historial de balance"
          description="Consulta los meses en los que realmente existe actividad."
          action={
            <Link
              to="/balance"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
            >
              ← Volver al balance
            </Link>
          }
        />

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
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
    <div>
      {/* ======================================================
          CABECERA
      ====================================================== */}

      <PageHeader
        title={`Detalle de ${monthName}`}
        description="Consulta todo lo ocurrido durante este mes."
        action={
          <Link
            to="/balance"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
          >
            ← Volver al balance
          </Link>
        }
      />

      {/* ======================================================
          NAVEGACIÓN ENTRE MESES CON ACTIVIDAD
      ====================================================== */}

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4">
        <button
          type="button"
          onClick={goToPreviousMonth}
          disabled={!previousAvailableMonth}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Mes anterior
        </button>

        <div className="text-center">
          <p className="font-semibold capitalize">
            {monthName}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {currentMonthIndex + 1} de{" "}
            {availableMonths.length} meses con actividad
          </p>
        </div>

        <button
          type="button"
          onClick={goToNextMonth}
          disabled={!nextAvailableMonth}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Mes siguiente →
        </button>
      </div>

      {/* ======================================================
          RESUMEN
      ====================================================== */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Resumen
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Ingresos
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              +{stats.totalIncome.toLocaleString("es-ES")} €
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Gastos
            </p>

            <p className="mt-2 text-2xl font-bold text-red-500">
              -{stats.totalExpenses.toLocaleString("es-ES")} €
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Ahorro
            </p>

            <p
              className={`mt-2 text-2xl font-bold ${
                stats.savings >= 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {stats.savings.toLocaleString("es-ES")} €
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Meta de ahorro
            </p>

            <p className="mt-2 text-2xl font-bold">
              {targetSavings.toLocaleString("es-ES")} €
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {stats.savings >= targetSavings
                ? "Meta alcanzada"
                : `Faltan ${(
                    targetSavings - stats.savings
                  ).toLocaleString("es-ES")} €`}
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          ANÁLISIS
      ====================================================== */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Análisis
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Comprende cómo se comportó tu dinero este mes.
          </p>
        </div>

        <div className="space-y-6">
          {/* COMPARACIÓN */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold">
              Comparación con el mes anterior
            </h3>

            {!previousAvailableMonth ? (
              <p className="mt-4 text-sm text-slate-500">
                No existe otro mes con actividad para comparar.
              </p>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

          {/* GASTOS */}

          {/* GASTOS */}

<ExpenseBreakdownCard
  movements={monthlyMovements}
/>

          {/* INSIGHTS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold">
              Insights del mes
            </h3>

            <div className="mt-5 space-y-3">
              {insights.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No hay suficientes datos para generar análisis.
                </p>
              ) : (
                insights.map((insight, index) => (
                  <div
                    key={`${insight.title}-${index}`}
                    className="rounded-xl bg-slate-50 p-4"
                  >
                    <p className="font-semibold">
                      {insight.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {insight.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          ACTIVIDAD
      ====================================================== */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Actividad
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Movimientos registrados y movimientos generados por tus
            reglas recurrentes.
          </p>
        </div>

        {/* MOVIMIENTOS MANUALES */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div>
            <h3 className="text-lg font-semibold">
              Movimientos manuales
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {manualMovements.length} movimientos
            </p>
          </div>

          {manualMovements.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 py-8 text-center">
              <p className="text-sm text-slate-500">
                No hay movimientos manuales durante este mes.
              </p>
            </div>
          ) : (
            <MovementList movements={manualMovements} />
          )}
        </div>

        {/* MOVIMIENTOS RECURRENTES */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div>
            <h3 className="text-lg font-semibold">
              Movimientos recurrentes
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {recurringMovements.length} movimientos generados
            </p>
          </div>

          {recurringMovements.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 py-8 text-center">
              <p className="text-sm text-slate-500">
                No hay movimientos recurrentes durante este mes.
              </p>
            </div>
          ) : (
            <MovementList
              movements={recurringMovements}
              showRecurring
            />
          )}
        </div>
      </section>
    </div>
  );
}

// ============================================================
// LISTA DE MOVIMIENTOS
// ============================================================

function MovementList({
  movements,
  showRecurring = false,
}) {
  return (
    <div className="mt-5 space-y-3">
      {movements
        .slice()
        .sort(
          (a, b) =>
            new Date(b.date) - new Date(a.date)
        )
        .map((movement) => (
          <div
            key={movement.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">
                  {movement.category}
                </p>

                {showRecurring && movement.recurring && (
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                    ↻ Recurrente
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {movement.description ||
                  movement.concept ||
                  movement.title ||
                  "Sin descripción"}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {new Date(
                  movement.date
                ).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <p
              className={`shrink-0 font-bold ${
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
          </div>
        ))}
    </div>
  );
}

// ============================================================
// COMPARACIÓN
// ============================================================

function ComparisonItem({
  label,
  current,
  previous,
  positiveIsGood,
}) {
  const difference = current - previous;

  const percentage =
    previous !== 0
      ? (difference / Math.abs(previous)) * 100
      : null;

  const isPositive = difference > 0;
  const isNegative = difference < 0;

  let changeClass = "text-slate-500";

  if (isPositive) {
    changeClass = positiveIsGood
      ? "text-green-600"
      : "text-red-500";
  }

  if (isNegative) {
    changeClass = positiveIsGood
      ? "text-red-500"
      : "text-green-600";
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        {current.toLocaleString("es-ES")} €
      </p>

      <p className={`mt-1 text-sm ${changeClass}`}>
        {difference > 0 ? "+" : ""}
        {difference.toLocaleString("es-ES")} €

        {percentage !== null && (
          <>
            {" "}
            ({percentage.toFixed(1)}%)
          </>
        )}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Mes anterior:{" "}
        {previous.toLocaleString("es-ES")} €
      </p>
    </div>
  );
}