import { useState, useEffect } from "react";

const months = [
  "Enero", "Febrero", "Marzo", "Abril", 
  "Mayo", "Junio", "Julio", "Agosto", 
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const frequencies = [
  { value: "monthly", label: "Mensual" },
  { value: "biweekly", label: "Quincenal" },
  { value: "quarterly", label: "Trimestral" },
  { value: "yearly", label: "Anual" },
];

export default function RecurringIncomeForm({ initialData, onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [payDay, setPayDay] = useState(1);
  const [secondPayDay, setSecondPayDay] = useState(15);
  const [frequency, setFrequency] = useState("monthly");
  const [extraPayments, setExtraPayments] = useState([]);
  const [targetMonths, setTargetMonths] = useState([]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? "");
      setAmount(initialData.amount ?? "");
      setPayDay(initialData.payDay ?? 1);
      setSecondPayDay(initialData.secondPayDay ?? 15);
      setFrequency(initialData.frequency ?? "monthly");
      setExtraPayments(initialData.extraPayments ?? []);
      setTargetMonths(initialData.targetMonths ?? []);
    } else {
      setName("");
      setAmount("");
      setPayDay(1);
      setSecondPayDay(15);
      setFrequency("monthly");
      setExtraPayments([]);
      setTargetMonths([]);
    }
  }, [initialData]);

  function toggleExtraPayment(month) {
    setExtraPayments(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    const sanitizedDay = Math.max(1, Math.min(31, Number(payDay) || 1));
    const sanitizedSecondDay = Math.max(1, Math.min(31, Number(secondPayDay) || 1));

    onSubmit({
      id: initialData?.id,
      name,
      amount: Number(amount),
      payDay: sanitizedDay,
      secondPayDay: frequency === "biweekly" ? sanitizedSecondDay : null,
      extraPayments: frequency === "monthly" ? extraPayments : [],
      targetMonths: (frequency === "quarterly" || frequency === "yearly") ? targetMonths : [],
      frequency,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Concepto
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ej. Nómina"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Importe neto (€)
        </label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="0.00"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Frecuencia
        </label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
        >
          {frequencies.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {(frequency === "monthly" || frequency === "biweekly") && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              {frequency === "biweekly" ? "Primer día de cobro (1-31)" : "Día de cobro (1-31)"}
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={payDay}
              onChange={(e) => setPayDay(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
            />
          </div>

          {frequency === "biweekly" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Segundo día de cobro (1-31)
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={secondPayDay}
                onChange={(e) => setSecondPayDay(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
              />
            </div>
          )}
        </div>
      )}

      {frequency === "monthly" && (
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Pagas extra (meses adicionales)
          </label>
          <p className="mb-3 text-xs text-slate-500">
            Selecciona los meses con paga extra además de la mensualidad.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {months.map((month) => {
              const isSelected = extraPayments.includes(month);
              return (
                <button
                  type="button"
                  key={month}
                  onClick={() => toggleExtraPayment(month)}
                  className={`rounded-xl py-2 px-2 text-xs font-medium transition-all border text-center truncate ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {(frequency === "quarterly" || frequency === "yearly") && (
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Meses de aplicación
          </label>
          <p className="mb-3 text-xs text-slate-500">
            Selecciona en qué meses del año se efectúa este cobro.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {months.map((month) => {
              const isSelected = targetMonths.includes(month);
              return (
                <button
                  type="button"
                  key={month}
                  onClick={() => {
                    setTargetMonths(prev => 
                      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
                    );
                  }}
                  className={`rounded-xl py-2 px-2 text-xs font-medium transition-all border text-center truncate ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-2xl px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-all shadow-sm"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}