export default function GoalInfoCard({
  goal,
  savedAmount,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h3 className="mb-5 text-lg font-semibold">
        Información
      </h3>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-slate-500">
            Nombre
          </p>

          <p className="font-semibold">
            {goal.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Plazo
          </p>

          <p className="font-semibold">
            {goal.hasDeadline
              ? `${goal.deadlineMonth} ${goal.deadlineYear}`
              : "Sin plazo"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Aportaciones realizadas
          </p>

          <p className="font-semibold">
            {goal.movements.length}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Ahorro medio
          </p>

          <p className="font-semibold">
            {goal.movements.length > 0
              ? (
                  savedAmount /
                  goal.movements.length
                ).toLocaleString("es-ES", {
                  maximumFractionDigits: 2,
                }) + " €"
              : "0 €"}
          </p>
        </div>

      </div>

    </div>
  );
}