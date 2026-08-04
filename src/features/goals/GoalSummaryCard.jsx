export default function GoalSummaryCard({
  goal,
  savedAmount,
  remainingAmount,
  progress,
  completed,
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">

      <h3 className="mb-4 text-lg font-semibold sm:mb-5">
        Resumen
      </h3>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-slate-500">
            Objetivo
          </p>

          <p className="break-words text-xl font-bold sm:text-2xl">
            {goal.targetAmount.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Ahorrado
          </p>

          <p className="break-words font-semibold">
            {savedAmount.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Restante
          </p>

          <p className="break-words font-semibold">
            {remainingAmount.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Progreso
          </p>

          <p className="break-words font-semibold">
            {Math.round(progress)} %
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Estado
          </p>

          <p
            className={
              completed
                ? "font-semibold text-green-600"
                : "font-semibold text-orange-500"
            }
          >
            {completed ? "Completado" : "En progreso"}
          </p>
        </div>

      </div>

    </div>
  );
}