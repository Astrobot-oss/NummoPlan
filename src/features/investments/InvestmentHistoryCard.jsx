export default function InvestmentHistoryCard({
  investment,
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
      <h3 className="mb-4 text-lg font-semibold sm:mb-5">
        Movimientos
      </h3>

      <div className="space-y-3">
        {investment.movements.length === 0 ? (
          <p className="text-slate-500">
            No hay movimientos registrados.
          </p>
        ) : (
          [...investment.movements]
            .sort(
              (a, b) =>
                new Date(b.date) - new Date(a.date)
            )
            .map((movement) => (
              <div
                key={movement.id}
                className="rounded-2xl bg-slate-50 p-4 sm:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xl font-semibold">
                      {movement.type === "buy" &&
                        "Compra"}

                      {movement.type === "sell" &&
                        "Venta"}

                      {movement.type ===
                        "dividend" &&
                        "Dividendo"}
                    </p>

                    <p className="text-sm text-slate-500">
                      {new Date(
                        movement.date
                      ).toLocaleDateString(
                        "es-ES"
                      )}
                    </p>
                  </div>

                  <p className="break-words text-xl font-bold text-right sm:text-2xl">
                    {movement.amount.toLocaleString(
                      "es-ES"
                    )}{" "}
                    €
                  </p>
                </div>

                <div className="mt-4 space-y-3 text-sm">

                  {movement.type ===
                    "buy" && (
                    <>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">
                          Participaciones
                        </span>

                        <span className="break-words text-right font-medium">
                          {movement.shares.toLocaleString(
                            "es-ES",
                            {
                              maximumFractionDigits:
                                4,
                            }
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">
                          Precio compra
                        </span>

                        <span className="break-words text-right font-medium">
                          {movement.price.toLocaleString(
                            "es-ES"
                          )}{" "}
                          €
                        </span>
                      </div>
                    </>
                  )}

                  {movement.type ===
                    "sell" && (
                    <>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">
                          Participaciones
                        </span>

                        <span className="break-words text-right font-medium">
                          {movement.shares.toLocaleString(
                            "es-ES",
                            {
                              maximumFractionDigits:
                                4,
                            }
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">
                          Precio venta
                        </span>

                        <span className="break-words text-right font-medium">
                          {movement.price.toLocaleString(
                            "es-ES"
                          )}{" "}
                          €
                        </span>
                      </div>
                    </>
                  )}

                  {movement.type ===
                    "dividend" && (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">
                        Concepto
                      </span>

                      <span className="break-words text-right font-medium">
                        Dividendo recibido
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}