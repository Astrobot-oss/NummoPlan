import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
export default function GoalForm({
  onSubmit,
  goal = null,
}) {
const [name, setName] = useState(goal?.name ?? "");

const [amount, setAmount] = useState(
  goal?.targetAmount ?? ""
);

const [hasDeadline, setHasDeadline] = useState(
  goal?.hasDeadline ?? false
);

const [deadlineMonth, setDeadlineMonth] = useState(
  goal?.deadlineMonth ?? ""
);

const [deadlineYear, setDeadlineYear] = useState(
  goal?.deadlineYear ?? ""
);

function handleSubmit() {
const goalData = {
  ...(goal ?? {}),

  id: goal?.id ?? Date.now(),

  name,
  targetAmount: Number(amount),

  hasDeadline,
  deadlineMonth,
  deadlineYear,

  movements: goal?.movements ?? [],
};

onSubmit(goalData);
}
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
  {goal ? "Editar objetivo" : "Nuevo objetivo"}
</h2>

        <p className="mt-2 text-slate-500">
  {goal
    ? "Modifica los datos de tu objetivo."
    : "Crea un objetivo para seguir tu progreso."}
</p>
      </div>
      <div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Nombre
  </label>

  <input
    type="text"
    placeholder="Ej. Viaje a Japón"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
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
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
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
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />
    </div>
  </div>
)}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Cantidad objetivo
        </label>

        <input
          type="number"
          placeholder="10000"
          value={amount}
onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
        />
      </div>
      

<div className="flex justify-end gap-3 pt-2">
  <PrimaryButton onClick={handleSubmit}>
  {goal ? "Guardar cambios" : "Crear objetivo"}
</PrimaryButton>
</div>
    </div>
  );
}