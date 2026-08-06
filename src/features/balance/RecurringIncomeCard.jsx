import PrimaryButton from "../../components/PrimaryButton";
import RecurringIncomeList from "./RecurringIncomeList";

export default function RecurringIncomeCard({
  recurringIncome = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between gap-4">

        <div>

          <h3 className="text-lg font-semibold">
            Ingresos recurrentes
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Gestiona todas tus fuentes de ingresos periódicos.
          </p>

        </div>

        <PrimaryButton onClick={onAdd}>
          Añadir ingreso
        </PrimaryButton>

      </div>

      <div className="mt-6">

        <RecurringIncomeList
          recurringIncome={recurringIncome}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      </div>

    </div>
  );
}