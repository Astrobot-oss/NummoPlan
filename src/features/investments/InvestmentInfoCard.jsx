export default function InvestmentInfoCard({
  investment,
  totalShares,
  averagePrice,
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">

      <h3 className="mb-4 text-lg font-semibold sm:mb-5">
        Información
      </h3>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-slate-500">
            Tipo
          </p>

          <p className="break-words font-semibold">
            {investment.type || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Broker
          </p>

          <p className="break-words font-semibold">
            {investment.broker || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Participaciones
          </p>

          <p className="break-words font-semibold">
            {(totalShares || 0).toLocaleString("es-ES", {
              maximumFractionDigits: 4,
            })}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Precio medio
          </p>

          <p className="break-words font-semibold">
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

          <p className="break-words font-semibold">
            {investment.movements?.length || 0}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Última actualización
          </p>

          <p className="break-words font-semibold">
            {investment.lastUpdate
              ? new Date(investment.lastUpdate).toLocaleDateString("es-ES")
              : "-"}
          </p>
        </div>

      </div>

    </div>
  );
}