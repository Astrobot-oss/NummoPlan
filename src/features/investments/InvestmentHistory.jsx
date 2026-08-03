export default function InvestmentHistory({
  investment,
}) {
  return (
    <div className="space-y-4">

      <h3 className="text-xl font-semibold">
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
          .map((movement, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 p-4"
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

              <p className="mt-2">
                {movement.amount.toLocaleString("es-ES")} €
              </p>

              <p className="text-sm text-slate-500">
                {movement.shares.toLocaleString("es-ES", {
                  maximumFractionDigits: 4,
                })}{" "}
                participaciones
              </p>

              <p className="text-sm text-slate-500">
                {movement.price.toLocaleString("es-ES")} €/participación
              </p>
            </div>
          ))
      )}

    </div>
  );
}