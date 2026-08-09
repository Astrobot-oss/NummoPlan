import { Link } from "react-router-dom";
import { getExpensesByCategory } from "../../domain/balanceCalculations";

export default function ExpenseBreakdownSummaryCard({
  movements,
  detailPath,
}) {
  const { result, totalExpenses } =
    getExpensesByCategory(movements);

  const topExpenses = result.slice(0, 4);

  const CATEGORY_COLORS = {
  "Vivienda": "#a78bfa",
  "Alimentación": "#f881e4d3",
  "Transporte": "#38bdf8",
  "Ocio": "#f3a20b",
  "Restaurantes": "#fb7185",
  "Compras": "#f3eb7a",
  "Salud": "#3af162",
  "Mascotas": "#886147",
  "Suscripciones": "#7c8a4a",
  "Impuestos": "#ffb4b2",
  "Otros": "#cbd5e1",
};

const DEFAULT_COLOR = "#e2e8f0";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
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

      {topExpenses.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-slate-300 py-8 text-center">
          <p className="text-sm text-slate-500">
            No hay gastos registrados este mes.
          </p>
        </div>
      ) : (
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
      )}

      {result.length > 4 && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          {detailPath ? (
            <Link
              to={detailPath}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              Ver las {result.length} categorías de gasto →
            </Link>
          ) : (
            <p className="text-sm text-slate-500">
              Mostrando las 4 categorías con mayor gasto.
            </p>
          )}
        </div>
      )}

      {result.length > 0 && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Total de gastos
            </span>

            <span className="font-semibold text-slate-900">
              {totalExpenses.toLocaleString("es-ES")} €
            </span>
          </div>
        </div>
      )}
    </div>
  );
}