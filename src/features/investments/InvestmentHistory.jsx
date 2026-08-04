export default function InvestmentHistory({
  investment,
}) {
  return (
    <div className="space-y-4 sm:space-y-5">

      <h3 className="text-lg font-semibold sm:text-xl">
        Historial
      </h3>

      {investment.movements.length === 0 ? (
        <p className="text-slate-500">
          No hay movimientos.
        </p>
      ) : (
        investment.movements
          .slice()
          .reverse()
          .map((movement) => (
            <div
              key={movement.id}
              className="rounded-xl border border-slate-200 p-4 sm:p-5"
            >
              <p className="font-medium">
                {movement.type === "buy"
                  ? "Compra inicial"
                  : "Aportación"}
              </p>

              <p className="text-sm text-slate-500">
                {new Date(
                  movement.date
                ).toLocaleDateString("es-ES")}
              </p>

              <p className="mt-2 break-words font-medium">
                {movement.amount.toLocaleString("es-ES")} €
              </p>

              <p className="break-words text-sm text-slate-500">
                {movement.shares.toLocaleString("es-ES", {
                  maximumFractionDigits: 4,
                })}{" "}
                participaciones
              </p>

              <p className="break-words text-sm text-slate-500">
                {movement.price.toLocaleString("es-ES")} €/participación
              </p>
            </div>
          ))
      )}

    </div>
  );
}