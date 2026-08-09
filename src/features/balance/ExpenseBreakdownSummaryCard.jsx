import { Link } from "react-router-dom";
import { getExpensesByCategory } from "../../domain/balanceCalculations";

export default function ExpenseBreakdownSummaryCard({
  movements = [],
  detailPath,
}) {
  const {
    result,
    totalExpenses,
  } = getExpensesByCategory(movements);

  const topExpenses = result.slice(0, 4);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* ==================================================
          CABECERA
      ================================================== */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Distribución de gastos
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Tus categorías de gasto principales este mes.
          </p>
        </div>

        {result.length > 0 && detailPath && (
          <Link
            to={detailPath}
            className="shrink-0 text-sm font-medium text-orange-600 transition hover:text-orange-700"
          >
            Ver desglose completo →
          </Link>
        )}
      </div>

      {/* ==================================================
          SIN GASTOS
      ================================================== */}

      {topExpenses.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-slate-300 py-8 text-center">
          <p className="text-sm text-slate-500">
            No hay gastos registrados este mes.
          </p>

          {detailPath && (
            <Link
              to={detailPath}
              className="mt-3 inline-block text-sm font-medium text-orange-600 transition hover:text-orange-700"
            >
              Ver detalle del mes →
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* ==================================================
              PRINCIPALES CATEGORÍAS
          ================================================== */}

          <div className="mt-6 space-y-5">
            {topExpenses.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="min-w-0 truncate font-medium text-slate-700">
                    {item.category}
                  </span>

                  <span className="shrink-0 text-slate-500">
                    {item.amount.toLocaleString("es-ES")} €
                    {" · "}
                    {item.percentage}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all"
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ==================================================
              PIE DEL RESUMEN
          ================================================== */}

          <div className="mt-6 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500">
                Total de gastos
              </span>

              <span className="font-semibold text-slate-900">
                {totalExpenses.toLocaleString("es-ES")} €
              </span>
            </div>

            {result.length > 4 && detailPath && (
              <Link
                to={detailPath}
                className="mt-3 inline-block text-sm font-medium text-slate-500 transition hover:text-slate-700"
              >
                Ver las {result.length} categorías de gasto →
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}