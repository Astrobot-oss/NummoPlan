import { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export default function DebtForm({
  debt,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadlineMonth, setDeadlineMonth] = useState("");
  const [deadlineYear, setDeadlineYear] = useState("");

  useEffect(() => {
    if (!debt) {
      setName("");
      setTargetAmount("");
      setHasDeadline(false);
      setDeadlineMonth("");
      setDeadlineYear("");
      return;
    }

    setName(debt.name);
    setTargetAmount(debt.targetAmount);
    setHasDeadline(debt.hasDeadline);
    setDeadlineMonth(debt.deadlineMonth ?? "");
    setDeadlineYear(debt.deadlineYear ?? "");
  }, [debt]);

  function handleSubmit(e) {
    e.preventDefault();

    const debtData = {
      id: debt?.id ?? Date.now(),

      name,

      targetAmount: Number(targetAmount),

      hasDeadline,

      deadlineMonth: hasDeadline
        ? deadlineMonth
        : null,

      deadlineYear: hasDeadline
        ? Number(deadlineYear)
        : null,

      movements: debt?.movements ?? [],
    };

    onSubmit(debtData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          {debt ? "Editar deuda" : "Nueva deuda"}
        </h2>

        <p className="mt-2 text-slate-500">
          {debt
            ? "Modifica los datos de la deuda."
            : "Registra una nueva deuda para hacer el seguimiento de los pagos."}
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Nombre
        </label>

        <input
          type="text"
          placeholder="Ej. Hipoteca"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Importe total
        </label>

        <input
          type="number"
          placeholder="100000"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
          required
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Plazo
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={!hasDeadline}
            onChange={() => setHasDeadline(false)}
          />

          <span>Sin plazo</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={hasDeadline}
            onChange={() => setHasDeadline(true)}
          />

          <span>Establecer plazo</span>
        </label>
      </div>

      {hasDeadline && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Mes
            </label>

            <select
              value={deadlineMonth}
              onChange={(e) => setDeadlineMonth(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="">Seleccionar</option>

              <option>Enero</option>
              <option>Febrero</option>
              <option>Marzo</option>
              <option>Abril</option>
              <option>Mayo</option>
              <option>Junio</option>
              <option>Julio</option>
              <option>Agosto</option>
              <option>Septiembre</option>
              <option>Octubre</option>
              <option>Noviembre</option>
              <option>Diciembre</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Año
            </label>

            <input
              type="number"
              value={deadlineYear}
              onChange={(e) => setDeadlineYear(e.target.value)}
              placeholder="2028"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end pt-2">
        <PrimaryButton type="submit">
          {debt
            ? "Guardar cambios"
            : "Crear deuda"}
        </PrimaryButton>
      </div>
    </form>
  );
}