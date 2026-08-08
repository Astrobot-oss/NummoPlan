import ActionMenu from "../../components/ActionMenu";

export default function RecurringIncomeItem({
  income,
  onEdit,
  onDelete,
}) {
  const {
    title,
    amount,
    frequency,
    day,
    secondDay,
    targetMonths = [],
    hasExtraPay,
    extraPayMonths = [],
  } = income;

  const frequencyLabels = {
    monthly: "Mensual",
    biweekly: "Quincenal",
    quarterly: "Trimestral",
    yearly: "Anual",
  };

  const frequencyLabel =
    frequencyLabels[frequency] || frequency;

  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-4">

        <div className="flex-1 min-w-0">

          <p className="font-semibold text-slate-900 truncate">
            {title}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {frequencyLabel}
            {" · "}
            {frequency === "biweekly"
              ? `días ${day} y ${secondDay}`
              : `día ${day}`}
          </p>

          {frequency === "quarterly" && (
            <p className="mt-1 text-xs text-slate-400">
              Meses: {targetMonths.join(", ")}
            </p>
          )}

          {frequency === "yearly" && (
            <p className="mt-1 text-xs text-slate-400">
              Mes: {targetMonths[0] || "No configurado"}
            </p>
          )}

          {frequency === "monthly" && hasExtraPay && (
            <p className="mt-2 text-xs text-slate-400">
              Pagas extra: {extraPayMonths.join(", ")}
            </p>
          )}

        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">

          <ActionMenu
            items={[
              {
                label: "Editar",
                onClick: () => onEdit?.(income),
              },
              {
                label: "Eliminar",
                danger: true,
                onClick: () => onDelete?.(income.id),
              },
            ]}
          />

          <p className="text-lg font-bold text-green-600">
            +{Number(amount || 0).toLocaleString("es-ES")} €
          </p>

        </div>

      </div>
    </div>
  );
}