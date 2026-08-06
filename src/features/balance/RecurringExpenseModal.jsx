import { useState, useEffect } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export function RecurringExpenseModal({ recurringExpense, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [day, setDay] = useState("1");
  const [secondDay, setSecondDay] = useState("15");
  const [targetMonths, setTargetMonths] = useState(["3", "6", "9", "12"]);

  useEffect(() => {
    if (recurringExpense) {
      setTitle(recurringExpense.title || "");
      setAmount(recurringExpense.amount || "");
      setFrequency(recurringExpense.frequency || "monthly");
      setDay(recurringExpense.day || "1");
      setSecondDay(recurringExpense.secondDay || "15");
      setTargetMonths(recurringExpense.targetMonths || (recurringExpense.frequency === "yearly" ? ["12"] : ["3", "6", "9", "12"]));
    } else {
      setTitle("");
      setAmount("");
      setFrequency("monthly");
      setDay("1");
      setSecondDay("15");
      setTargetMonths(["3", "6", "9", "12"]);
    }
  }, [recurringExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    onSubmit({
      id: recurringExpense ? recurringExpense.id : (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random().toString(36).substr(2, 9)),
      title,
      amount: Number(amount),
      frequency,
      day: Number(day),
      secondDay: frequency === "biweekly" ? Number(secondDay) : null,
      targetMonths: frequency === "quarterly" || frequency === "yearly" ? targetMonths : null,
    });
  };

  const toggleTargetMonth = (month) => {
    if (frequency === "yearly") {
      setTargetMonths([month]);
    } else {
      if (targetMonths.includes(month)) {
        if (targetMonths.length > 1) {
          setTargetMonths(targetMonths.filter((m) => m !== month));
        }
      } else {
        setTargetMonths([...targetMonths, month]);
      }
    }
  };

  const monthsList = [
    { id: "1", label: "Ene" },
    { id: "2", label: "Feb" },
    { id: "3", label: "Mar" },
    { id: "4", label: "Abr" },
    { id: "5", label: "May" },
    { id: "6", label: "Jun" },
    { id: "7", label: "Jul" },
    { id: "8", label: "Ago" },
    { id: "9", label: "Sep" },
    { id: "10", label: "Oct" },
    { id: "11", label: "Nov" },
    { id: "12", label: "Dic" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {recurringExpense ? "Editar gasto recurrente" : "Nuevo gasto recurrente"}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configura tus obligaciones fijas periódicas y fechas de cargo.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Concepto
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Seguro del coche, Suscripción..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Cantidad (€)
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Frecuencia
            </label>
            <select
              value={frequency}
              onChange={(e) => {
                const newFreq = e.target.value;
                setFrequency(newFreq);
                if (newFreq === "yearly") setTargetMonths(["12"]);
                if (newFreq === "quarterly") setTargetMonths(["3", "6", "9", "12"]);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
            >
              <option value="monthly">Mensual</option>
              <option value="biweekly">Quincenal</option>
              <option value="quarterly">Trimestral</option>
              <option value="yearly">Anual</option>
            </select>
          </div>
        </div>

        {frequency === "biweekly" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Primer día de cargo
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Segundo día de cargo
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={secondDay}
                onChange={(e) => setSecondDay(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
              />
            </div>
          </div>
        ) : frequency === "quarterly" || frequency === "yearly" ? (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                {frequency === "yearly" ? "Mes del cargo anual" : "Meses de cargo trimestral"}
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {monthsList.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleTargetMonth(m.id)}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all ${
                      targetMonths.includes(m.id)
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Día del mes en que se carga
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Día de cargo habitual
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Cancelar
        </button>
        <PrimaryButton type="submit">
          {recurringExpense ? "Guardar cambios" : "Añadir gasto"}
        </PrimaryButton>
      </div>
    </form>
  );
}