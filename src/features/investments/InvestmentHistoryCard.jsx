export default function InvestmentHistoryCard({
  investment,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">
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
                className="rounded-2xl bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between">
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

                  <p className="text-2xl font-bold">
                    {movement.amount.toLocaleString(
                      "es-ES"
                    )}{" "}
                    €
                  </p>
                </div>

                <div className="mt-4 space-y-2 text-sm">

                  {movement.type ===
                    "buy" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Participaciones
                        </span>

                        <span className="font-medium">
                          {movement.shares.toLocaleString(
                            "es-ES",
                            {
                              maximumFractionDigits:
                                4,
                            }
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Precio compra
                        </span>

                        <span className="font-medium">
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
                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Participaciones
                        </span>

                        <span className="font-medium">
                          {movement.shares.toLocaleString(
                            "es-ES",
                            {
                              maximumFractionDigits:
                                4,
                            }
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Precio venta
                        </span>

                        <span className="font-medium">
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
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        Concepto
                      </span>

                      <span className="font-medium">
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