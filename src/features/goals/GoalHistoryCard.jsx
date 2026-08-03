export default function GoalHistoryCard({ goal }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h3 className="mb-5 text-lg font-semibold">
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
                className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
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

                <p className="font-semibold">
                  +{movement.amount.toLocaleString("es-ES")} €
                </p>

              </div>

            ))

        )}

      </div>

    </div>
  );
}