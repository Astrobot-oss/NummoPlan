import PrimaryButton from "../../components/PrimaryButton";

const defaultSalary = {
  amount: 0,
  payDay: 1,
  frequency: "monthly",
  extraPayments: [],
};

export default function RecurringIncomeCard({
  salary,
  onEdit,
}) {
  const currentSalary = salary ?? defaultSalary;

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            Ingresos recurrentes
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Configura los ingresos que recibes automáticamente.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-sm text-slate-500">
            Salario mensual
          </p>

          <p className="text-2xl font-bold">
            {currentSalary.amount.toLocaleString("es-ES")} €
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Día de cobro
            </p>

            <p className="font-semibold">
              {currentSalary.payDay}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Frecuencia
            </p>

            <p className="font-semibold capitalize">
              {currentSalary.frequency}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-slate-500">
            Pagas extra
          </p>

          {currentSalary.extraPayments.length === 0 ? (
            <p className="text-slate-400">
              No configuradas
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {currentSalary.extraPayments.map((month) => (
                <span
                  key={month}
                  className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600"
                >
                  {month}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={onEdit}>
          Editar ingresos
        </PrimaryButton>
      </div>
    </div>
  );
}