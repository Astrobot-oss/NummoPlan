export default function GoalSummaryCard({
  goal,
  savedAmount,
  remainingAmount,
  progress,
  completed,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h3 className="mb-5 text-lg font-semibold">
        Resumen
      </h3>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-slate-500">
            Objetivo
          </p>

          <p className="text-2xl font-bold">
            {goal.targetAmount.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Ahorrado
          </p>

          <p className="font-semibold">
            {savedAmount.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Restante
          </p>

          <p className="font-semibold">
            {remainingAmount.toLocaleString("es-ES")} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Progreso
          </p>

          <p className="font-semibold">
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