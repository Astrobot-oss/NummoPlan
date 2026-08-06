export default function TransactionsHistory({
  movements = [],
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h3 className="text-lg font-semibold">
        Historial de movimientos
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Todos tus ingresos y gastos aparecerán aquí.
      </p>

      <div className="mt-6">

        {movements.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center">

            <p className="text-slate-500">
              Todavía no hay movimientos registrados.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {movements.map((movement) => (

              <div
                key={movement.id}
                className="rounded-2xl border border-slate-200 p-4"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="font-medium">
                      {movement.category}
                    </p>

                    <p className="text-sm text-slate-500">
                      {movement.description || "Sin descripción"}
                    </p>

                  </div>

                  <p
                    className={`text-lg font-bold ${
                      movement.type === "income"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {movement.type === "income" ? "+" : "-"}
                    {movement.amount.toLocaleString("es-ES")} €
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}