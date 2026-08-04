import { getDebtStats } from "../../domain/debtCalculations";

export default function DebtSummaryCard({
  debt,
}) {
  const {
    totalPaid,
    remaining,
    progress,
    completed,
  } = getDebtStats(debt);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">

      <h3 className="mb-4 text-lg font-semibold sm:mb-5">
        Resumen
      </h3>

      <div className="space-y-5">

        <div>
          <p className="text-sm text-slate-500">
            Deuda total
          </p>

          <p className="text-2xl font-bold">
            {debt.targetAmount.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Pagado
          </p>

          <p className="break-words font-semibold text-green-600">
            {totalPaid.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Pendiente
          </p>

          <p className="break-words font-semibold text-red-500">
            {remaining.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>

          <div className="mb-2 flex justify-between text-sm">

            <span className="text-slate-500">
              Progreso
            </span>

            <span className="font-medium">
              {progress.toFixed(1)}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className={`h-full rounded-full transition-all duration-500 ${
                completed
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {completed && (
          <div className="mt-2 rounded-2xl bg-green-50 p-3 text-center">

            <p className="font-semibold text-green-600">
              ✓ Deuda liquidada
            </p>

          </div>
        )}

      </div>

    </div>
  );
}