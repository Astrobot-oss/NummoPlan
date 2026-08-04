import ActionMenu from "../../components/ActionMenu";
import ClickableCardHeader from "../../components/ClickableCardHeader";
import { getDebtStats } from "../../domain/debtCalculations";
import PrimaryButton from "../../components/PrimaryButton";

export default function DebtCard({
  debt,
  onPayment,
  onDelete,
  onEdit,
}) {
  const {
    totalPaid,
    remaining,
    progress,
    completed,
  } = getDebtStats(debt);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <ClickableCardHeader to={`/deudas/${debt.id}`}>

        <div>

          <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-orange-500">
            {debt.name}
          </h3>

          {debt.lender && (
            <p className="mt-1 text-slate-500">
              {debt.lender}
            </p>
          )}

          {debt.hasDeadline && (
            <p className="mt-1 text-slate-500">
              📅 {debt.deadlineMonth} {debt.deadlineYear}
            </p>
          )}

        </div>

        <div className="ml-3 flex items-start gap-2 sm:gap-3">

          <div className="text-right">

            <p className="break-words text-lg font-semibold text-orange-500 sm:text-xl">
              {debt.targetAmount.toLocaleString("es-ES")} €
            </p>

          </div>

          <ActionMenu
            items={[
              {
                label: "Editar",
                onClick: () => onEdit(debt),
              },
              {
                label: "Eliminar",
                danger: true,
                onClick: () => onDelete(debt.id),
              },
            ]}
          />

        </div>

      </ClickableCardHeader>

      <div className="mt-6">

        <div className="mb-2 flex justify-end text-sm font-medium text-slate-500">
          {Math.round(progress)}%
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className={`h-full rounded-full transition-all duration-500 ${
              completed
                ? "bg-green-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="mt-4">

          <p
  className={`break-words font-medium ${
    completed
      ? "text-green-600"
      : "text-red-500"
  }`}
>
            {totalPaid.toLocaleString("es-ES")} € pagados
          </p>

          {completed ? (
            <p className="mt-1 text-sm font-medium text-green-600">
              ✓ Deuda liquidada
            </p>
          ) : (
            <p className="mt-1 break-words text-sm text-slate-500">
              {remaining.toLocaleString("es-ES")} € pendientes
            </p>
          )}

        </div>

      </div>

     <div className="mt-6 pt-1"> 

        <PrimaryButton
  onClick={() => onPayment(debt)}
>
  Registrar pago
</PrimaryButton>

      </div>

    </div>
  );
}