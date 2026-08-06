export default function BalanceSummaryCard({
  summary,
}) {
  const {
    totalIncome,
    totalExpenses,
    savings,
    savingsRate,
    availableToInvest,
  } = summary;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h3 className="mb-5 text-lg font-semibold">
        Resumen
      </h3>

      <div className="space-y-5">

        <div>
          <p className="text-sm text-slate-500">
            Ingresos
          </p>

          <p className="text-2xl font-bold text-green-600">
            {totalIncome.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Gastos
          </p>

          <p className="text-xl font-semibold text-red-500">
            {totalExpenses.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Ahorro
          </p>

          <p
            className={`text-xl font-semibold ${
              savings >= 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {savings.toLocaleString("es-ES")} €
          </p>

          <p
            className={
              savings >= 0
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {savingsRate.toFixed(1)}%
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4">

          <p className="text-sm text-slate-500">
            Disponible para invertir
          </p>

          <p className="mt-1 text-2xl font-bold text-orange-500">
            {availableToInvest.toLocaleString("es-ES")} €
          </p>

        </div>

      </div>

    </div>
  );
}