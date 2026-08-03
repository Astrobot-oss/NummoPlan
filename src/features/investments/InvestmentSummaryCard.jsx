export default function InvestmentSummaryCard({
  investment,
  invested,
  currentValue,
  profit,
  percentage,
  totalShares,
  dividends,
}) { (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h3 className="mb-5 text-lg font-semibold">
        Resumen
      </h3>

      <div className="space-y-4">

        <div>

          <p className="text-sm text-slate-500">
            Valor actual
          </p>

          <p className="text-2xl font-bold">
            {(currentValue || 0).toLocaleString("es-ES")} €
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Capital invertido
          </p>

          <p className="font-semibold">
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
                ? "font-semibold text-green-600"
                : "font-semibold text-red-600"
            }
          >
            {(profit || 0).toLocaleString("es-ES")} €
          </p>

          <p
            className={
              profit >= 0
                ? "text-green-600"
                : "text-red-600"
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

          <p className="font-semibold">
            {(totalShares || 0).toLocaleString("es-ES", {
              maximumFractionDigits: 4,
            })}
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Precio actual
          </p>

          <p className="font-semibold">
            {(investment.currentPrice || 0).toLocaleString("es-ES")} €
          </p>

        </div>

      </div>

    </div>
  );
}