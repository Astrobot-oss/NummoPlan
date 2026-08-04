export default function GoalHistoryCard({ goal }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">

      <h3 className="mb-4 text-lg font-semibold sm:mb-5">
        Historial
      </h3>

      <div className="space-y-3">

        {goal.movements.length === 0 ? (

          <p className="text-slate-500">
            Todavía no hay aportaciones.
          </p>

        ) : (

          [...goal.movements]
            .sort(
              (a, b) =>
                new Date(b.date) - new Date(a.date)
            )
            .map((movement) => (

              <div
                key={movement.id}
                className="flex flex-col gap-2 rounded-xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between"
              >

                <div>

                  <p className="font-medium">
                    Aportación
                  </p>

                  <p className="text-sm text-slate-500">
                    {new Date(
                      movement.date
                    ).toLocaleDateString("es-ES")}
                  </p>

                </div>

                <p className="text-right font-semibold sm:text-left">
                  +{movement.amount.toLocaleString("es-ES")} €
                </p>

              </div>

            ))

        )}

      </div>

    </div>
  );
}