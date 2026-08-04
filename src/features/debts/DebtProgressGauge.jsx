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
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-8">

      <h2 className="text-lg font-semibold sm:text-xl">
        Progreso de la deuda
      </h2>

      <div className="mt-8 flex flex-col items-center sm:mt-10">

        <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-slate-200 sm:h-48 sm:w-48">

          <div className="text-center">

            <p
  className={`text-4xl font-bold sm:text-5xl ${
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

        <div className="mt-6 w-full space-y-3 sm:mt-8">

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