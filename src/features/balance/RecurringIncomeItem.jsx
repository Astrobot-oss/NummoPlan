import ActionMenu from "../../components/ActionMenu";

export default function RecurringIncomeItem({
  income,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          <p className="font-semibold">
            {income.name}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Cobro el día {income.payDay}
          </p>

          {income.extraPayments.length > 0 && (
            <p className="mt-2 text-xs text-slate-400">
              Pagas extra: {income.extraPayments.join(", ")}
            </p>
          )}

        </div>

        <div className="flex flex-col items-end gap-2">

          <ActionMenu
            items={[
              {
                label: "Editar",
                onClick: () => onEdit(income),
              },
              {
                label: "Eliminar",
                danger: true,
                onClick: () => onDelete(income.id),
              },
            ]}
          />

          <p className="text-lg font-bold text-green-600">
            {income.amount.toLocaleString("es-ES")} €
          </p>

        </div>

      </div>

    </div>
  );
}