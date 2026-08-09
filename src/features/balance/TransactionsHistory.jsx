import { useState } from "react";
import ActionMenu from "../../components/ActionMenu";

export default function TransactionsHistory({
  movements = [],
  onEdit,
  onDelete,
}) {
  const [filter, setFilter] = useState("all");

  const filteredMovements =
    filter === "all"
      ? movements
      : movements.filter(
          (movement) => movement.type === filter
        );

  return (
    <div>
      <h3 className="text-lg font-semibold">
        Historial de movimientos
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Todos tus ingresos y gastos aparecerán aquí.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-xl px-4 py-2 text-sm transition ${
            filter === "all"
              ? "bg-orange-500 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          Todos
        </button>

        <button
          type="button"
          onClick={() => setFilter("income")}
          className={`rounded-xl px-4 py-2 text-sm transition ${
            filter === "income"
              ? "bg-green-500 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          Ingresos
        </button>

        <button
          type="button"
          onClick={() => setFilter("expense")}
          className={`rounded-xl px-4 py-2 text-sm transition ${
            filter === "expense"
              ? "bg-red-500 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          Gastos
        </button>
      </div>

      <div className="mt-6">
        {filteredMovements.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center">
            <p className="text-slate-500">
              Todavía no hay movimientos registrados.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMovements.map((movement) => (
              <div
                key={movement.id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          movement.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {movement.type === "income"
                          ? "Ingreso"
                          : "Gasto"}
                      </span>

                      {movement.recurring && (
                        <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                          Recurrente
                        </span>
                      )}
                    </div>

                    <p className="mt-3 font-semibold">
                      {movement.category}
                    </p>

                    <div className="space-y-1">
                      <p className="text-sm text-slate-500">
                        {movement.description ||
                          "Sin descripción"}
                      </p>

                      <p className="text-xs text-slate-400">
                        {new Date(
                          movement.date
                        ).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {!movement.recurring && (
                      <ActionMenu
                        items={[
                          {
                            label: "Editar",
                            onClick: () =>
                              onEdit?.(movement),
                          },
                          {
                            label: "Eliminar",
                            danger: true,
                            onClick: () =>
                              onDelete?.(movement.id),
                          },
                        ]}
                      />
                    )}

                    <p
                      className={`text-lg font-bold ${
                        movement.type === "income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {movement.type === "income"
                        ? "+"
                        : "-"}
                      {Number(
                        movement.amount || 0
                      ).toLocaleString("es-ES")}{" "}
                      €
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}