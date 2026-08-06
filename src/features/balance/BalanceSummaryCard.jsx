export default function BalanceSummaryCard({ summary = {} }) {
  const {
    totalIncome = 0,
    totalExpenses = 0,
    savings = 0,
    savingsRate = 0,
    availableToInvest = 0,
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
            {Number(totalIncome).toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Gastos
          </p>
          <p className="text-xl font-semibold text-red-500">
            {Number(totalExpenses).toLocaleString("es-ES")} €
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
            {Number(savings).toLocaleString("es-ES")} €
          </p>

          <p
            className={`text-sm font-medium ${
              savings >= 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {Number(savingsRate || 0).toFixed(1)}%
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4">
          <p className="text-sm text-slate-500">
            Cantidad ahorrada
          </p>
          <p className="mt-1 text-2xl font-bold text-orange-500">
            {Number(availableToInvest).toLocaleString("es-ES")} €
          </p>
        </div>
      </div>
    </div>
  );
}