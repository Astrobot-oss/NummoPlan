import { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function RecurringIncomeModal({
  salary,
  onSubmit,
}) {
  const [amount, setAmount] = useState("");
  const [payDay, setPayDay] = useState(1);
  const [frequency, setFrequency] = useState("monthly");
  const [extraPayments, setExtraPayments] = useState([]);

  useEffect(() => {
    if (!salary) return;

    setAmount(salary.amount);
    setPayDay(salary.payDay);
    setFrequency(salary.frequency);
    setExtraPayments(salary.extraPayments);
  }, [salary]);

  function toggleExtraPayment(month) {
    if (extraPayments.includes(month)) {
      setExtraPayments(
        extraPayments.filter((m) => m !== month)
      );
    } else {
      setExtraPayments([
        ...extraPayments,
        month,
      ]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      amount: Number(amount),
      payDay: Number(payDay),
      frequency,
      extraPayments,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>

        <h2 className="text-xl font-bold sm:text-2xl">
          Ingresos recurrentes
        </h2>

        <p className="mt-1 text-slate-500">
          Configura los ingresos automáticos de cada mes.
        </p>

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Salario mensual
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
        />

      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Día de cobro
          </label>

          <input
            type="number"
            min="1"
            max="31"
            value={payDay}
            onChange={(e) => setPayDay(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Frecuencia
          </label>

          <select
            value={frequency}
            onChange={(e) =>
              setFrequency(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="monthly">
              Mensual
            </option>

            <option value="biweekly">
              Quincenal
            </option>

            <option value="weekly">
              Semanal
            </option>

          </select>

        </div>

      </div>

      <div>

        <p className="mb-3 text-sm font-medium">
          Pagas extraordinarias
        </p>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

          {months.map((month) => (

            <label
              key={month}
              className="flex items-center gap-2 rounded-xl border border-slate-200 p-3"
            >

              <input
                type="checkbox"
                checked={extraPayments.includes(month)}
                onChange={() =>
                  toggleExtraPayment(month)
                }
              />

              <span className="text-sm">
                {month}
              </span>

            </label>

          ))}

        </div>

      </div>

      <div className="flex justify-end">

        <PrimaryButton type="submit">
          Guardar cambios
        </PrimaryButton>

      </div>

    </form>
  );
}