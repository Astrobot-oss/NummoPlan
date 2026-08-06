import ActionMenu from "../../components/ActionMenu";

export default function RecurringExpenseCard({
  recurringExpense = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Gastos recurrentes</h3>
          <p className="mt-1 text-sm text-slate-500">
            Gestiona tus gastos periódicos.
          </p>
        </div>
        <button
          onClick={onAdd}
          className="rounded-xl bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-100"
        >
          Añadir
        </button>
      </div>

      <div className="mt-6">
        {recurringExpense.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-8 text-center">
            <p className="text-sm text-slate-500">
              No hay gastos recurrentes registrados.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recurringExpense.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
              >
                <div>
                  <p className="font-semibold">{item.category || item.name}</p>
                  <p className="text-sm text-slate-500">
                    {item.description || "Sin descripción"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-base font-bold text-red-500">
                    -{Number(item.amount || 0).toLocaleString("es-ES")} €
                  </p>
                  <ActionMenu
                    items={[
                      {
                        label: "Editar",
                        onClick: () => onEdit?.(item),
                      },
                      {
                        label: "Eliminar",
                        danger: true,
                        onClick: () => onDelete?.(item.id),
                      },
                    ]}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}