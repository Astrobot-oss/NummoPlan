import { getDebtStats } from "../../domain/debtCalculations";

export default function DebtProgressGauge({
  debt,
}) {
  const {
    progress,
    totalPaid,
    remaining,
    completed,
  } = getDebtStats(debt);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="text-xl font-semibold">
        Progreso de la deuda
      </h2>

      <div className="mt-10 flex flex-col items-center">

        <div className="flex h-48 w-48 items-center justify-center rounded-full border-8 border-slate-200">

          <div className="text-center">

            <p
              className={`text-5xl font-bold ${
                completed
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {progress.toFixed(1)}%
            </p>

            <p className="mt-2 text-slate-500">
              Pagado
            </p>

          </div>

        </div>

        <div className="mt-8 w-full space-y-3">

          <div className="flex justify-between">

            <span className="text-slate-500">
              Pagado
            </span>

            <span className="font-semibold">
              {totalPaid.toLocaleString("es-ES")} €
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-500">
              Pendiente
            </span>

            <span className="font-semibold">
              {remaining.toLocaleString("es-ES")} €
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}