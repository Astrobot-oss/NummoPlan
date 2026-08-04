export default function DebtInfoCard({
  debt,
}) {
  const paid = debt.movements.reduce(
    (total, movement) => total + movement.amount,
    0
  );

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">

      <h3 className="mb-4 text-lg font-semibold sm:mb-5">
        Información
      </h3>

      <div className="space-y-5">

        <div>
          <p className="text-sm text-slate-500">
            Pagos realizados
          </p>

          <p className="break-words font-semibold">
            {debt.movements.length}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Total abonado
          </p>

          <p className="break-words font-semibold">
            {paid.toLocaleString("es-ES")} €
          </p>
        </div>

        {debt.hasDeadline && (
          <div>
            <p className="text-sm text-slate-500">
              Fecha objetivo
            </p>

            <p className="break-words font-semibold">
              {debt.deadlineMonth} {debt.deadlineYear}
            </p>
          </div>
        )}

        <div>
          <p className="text-sm text-slate-500">
            Estado
          </p>

          <p
            className={`font-semibold ${
              paid >= debt.targetAmount
                ? "text-green-600"
                : "text-orange-500"
            }`}
          >
            {paid >= debt.targetAmount
              ? "Liquidada"
              : "Pendiente"}
          </p>
        </div>

      </div>

    </div>
  );
}