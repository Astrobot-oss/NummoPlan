export default function InvestmentSummaryCard({
  investment,
  invested,
  currentValue,
  profit,
  percentage,
  totalShares,
  dividends,
}) { 
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">

      <h3 className="mb-4 text-lg font-semibold sm:mb-5">
        Resumen
      </h3>

      <div className="space-y-4">

        <div>

          <p className="text-sm text-slate-500">
            Valor actual
          </p>

          <p className="break-words text-xl font-bold sm:text-2xl">
            {(currentValue || 0).toLocaleString("es-ES")} €
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Capital invertido
          </p>

          <p className="break-words font-semibold">
            {(invested || 0).toLocaleString("es-ES")} €
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Rentabilidad
          </p>

          <p
            className={
  profit >= 0
    ? "break-words font-semibold text-green-600"
    : "break-words font-semibold text-red-600"
}
          >
            {(profit || 0).toLocaleString("es-ES")} €
          </p>

          <p
            className={
  profit >= 0
    ? "break-words text-green-600"
    : "break-words text-red-600"
}
          >
            {(percentage || 0).toFixed(2)} %
          </p>

        </div>
<div>

  <p className="text-sm text-slate-500">
    Dividendos cobrados
  </p>

  <p className="font-semibold text-green-600">
    {(dividends || 0).toLocaleString("es-ES")} €
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
            Precio actual
          </p>

          <p className="break-words font-semibold">
            {(investment.currentPrice || 0).toLocaleString("es-ES")} €
          </p>

        </div>

      </div>

    </div>
  );
}