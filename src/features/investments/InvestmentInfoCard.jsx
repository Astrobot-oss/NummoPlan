export default function InvestmentInfoCard({
  investment,
  totalShares,
  averagePrice,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h3 className="mb-5 text-lg font-semibold">
        Información
      </h3>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-slate-500">
            Tipo
          </p>

          <p className="font-semibold">
            {investment.type || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Broker
          </p>

          <p className="font-semibold">
            {investment.broker || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Participaciones
          </p>

          <p className="font-semibold">
            {(totalShares || 0).toLocaleString("es-ES", {
              maximumFractionDigits: 4,
            })}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Precio medio
          </p>

          <p className="font-semibold">
            {(averagePrice || 0).toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} €
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Operaciones
          </p>

          <p className="font-semibold">
            {investment.movements?.length || 0}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Última actualización
          </p>

          <p className="font-semibold">
            {investment.lastUpdate
              ? new Date(investment.lastUpdate).toLocaleDateString("es-ES")
              : "-"}
          </p>
        </div>

      </div>

    </div>
  );
}