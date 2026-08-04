import ActionMenu from "../../components/ActionMenu";
import ClickableCardHeader from "../../components/ClickableCardHeader";

export default function GoalCard({
  goal,
  onAddMoney,
  onDelete,
  onEdit,
}) {
  const currentAmount = goal.movements.reduce(
    (total, movement) => total + movement.amount,
    0
  );

  const progress =
    goal.targetAmount > 0
      ? Math.min(
          (currentAmount / goal.targetAmount) * 100,
          100
        )
      : 0;

  const remainingAmount = Math.max(
    goal.targetAmount - currentAmount,
    0
  );

  const completed =
    currentAmount >= goal.targetAmount;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <ClickableCardHeader to={`/objetivos/${goal.id}`}>

        <div>

          <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-orange-500">
            {goal.name}
          </h3>

          {goal.hasDeadline && (
            <p className="mt-1 text-slate-500">
              📅 {goal.deadlineMonth} {goal.deadlineYear}
            </p>
          )}

        </div>

        <div className="ml-3 flex items-start gap-2 sm:gap-3">

          <div className="text-right">

            <p className="text-base font-semibold text-orange-500 sm:text-lg">
              {goal.targetAmount.toLocaleString("es-ES")} €
            </p>

          </div>

          <ActionMenu
            items={[
              {
                label: "Editar",
                onClick: () => onEdit(goal),
              },
              {
                label: "Eliminar",
                danger: true,
                onClick: () => onDelete(goal.id),
              },
            ]}
          />

        </div>

      </ClickableCardHeader>

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm font-medium text-slate-500">
          <span>Progreso</span>

<span>{Math.round(progress)}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className={`h-full rounded-full transition-all duration-500 ${
              completed
                ? "bg-green-500"
                : "bg-orange-500"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="mt-4">

          <p
  className={`text-sm font-medium sm:text-base ${
              completed
                ? "text-green-600"
                : "text-orange-500"
            }`}
          >
            {currentAmount.toLocaleString("es-ES")} € ahorrados
          </p>

          {completed ? (
            <p className="mt-1 text-sm font-medium text-green-600">
              ✓ Objetivo completado
            </p>
          ) : (
            <p className="mt-1 text-sm text-slate-500">
              {remainingAmount.toLocaleString("es-ES")} € restantes
            </p>
          )}

        </div>

      </div>

      <div className="mt-6">

        <button
          onClick={() => onAddMoney(goal)}
          className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-600"
        >
          + Nueva aportación
        </button>

      </div>

    </div>
  );
}