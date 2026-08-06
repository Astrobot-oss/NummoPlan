import { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

const frequencies = [
  {
    value: "monthly",
    label: "Mensual",
  },
];

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
  recurringIncome,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [payDay, setPayDay] = useState(1);
  const [frequency, setFrequency] =
    useState("monthly");
  const [extraPayments, setExtraPayments] =
    useState([]);

  useEffect(() => {
    if (!recurringIncome) {
      setName("");
      setAmount("");
      setPayDay(1);
      setFrequency("monthly");
      setExtraPayments([]);
      return;
    }

    setName(recurringIncome.name ?? "");
    setAmount(recurringIncome.amount);
    setPayDay(recurringIncome.payDay);
    setFrequency(recurringIncome.frequency);
    setExtraPayments(
      recurringIncome.extraPayments ?? []
    );
  }, [recurringIncome]);

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
      id: recurringIncome?.id,
      name,
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

        <h2 className="text-2xl font-bold">
          Ingreso recurrente
        </h2>

        <p className="text-slate-500">
          Configura una fuente de ingresos periódica.
        </p>

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Nombre
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Ej. Nómina"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Importe
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Día de cobro
          </label>

          <select
            value={payDay}
            onChange={(e) =>
              setPayDay(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            {Array.from(
              { length: 28 },
              (_, i) => i + 1
            ).map((day) => (
              <option
                key={day}
                value={day}
              >
                {day}
              </option>
            ))}
          </select>

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
            {frequencies.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>

        </div>

      </div>

      <div>

        <label className="mb-3 block text-sm font-medium">
          Pagas extra
        </label>

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