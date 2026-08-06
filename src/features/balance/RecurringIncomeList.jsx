import RecurringIncomeItem from "./RecurringIncomeItem";

export default function RecurringIncomeList({
  recurringIncome = [],
  onEdit,
  onDelete,
}) {
  if (recurringIncome.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center">
        <p className="text-slate-500">
          Todavía no has registrado ningún ingreso recurrente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recurringIncome.map((income) => (
        <RecurringIncomeItem
          key={income.id}
          income={income}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}