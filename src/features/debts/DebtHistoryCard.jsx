export default function DebtHistoryCard({
  debt,
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">

      <h3 className="mb-4 text-lg font-semibold sm:mb-5">
        Historial de pagos
      </h3>

      {debt.movements.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center">

          <p className="text-slate-500">
            Todavía no hay pagos registrados.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {[...debt.movements]
            .sort(
              (a, b) =>
                new Date(b.date) - new Date(a.date)
            )
            .map((movement) => (

              <div
                key={movement.id}
                className="rounded-2xl bg-slate-50 p-4 sm:p-5"
              >

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="font-medium">
                      Pago realizado
                    </p>

                    <p className="text-sm text-slate-500">
                      {new Date(
                        movement.date
                      ).toLocaleDateString("es-ES")}
                    </p>

                  </div>

                  <p className="break-words text-xl font-bold text-green-600 sm:text-2xl">
                    {movement.amount.toLocaleString("es-ES")} €
                  </p>

                </div>

                <div className="mt-4 flex items-center justify-between gap-4 text-sm">

                  <span className="text-slate-500">
                    Saldo restante
                  </span>

                  <span className="break-words text-right font-medium">
                    {movement.remaining.toLocaleString("es-ES")} €
                  </span>

                </div>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}