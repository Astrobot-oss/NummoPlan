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
    if (!debt) return;

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
      className="space-y-5"
    >
      <h2 className="text-2xl font-bold">
        {debt
          ? "Editar deuda"
          : "Nueva deuda"}
      </h2>

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
        required
      />

      <input
        type="number"
        placeholder="Importe total (€)"
        value={targetAmount}
        onChange={(e) =>
          setTargetAmount(e.target.value)
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
        required
      />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={hasDeadline}
          onChange={(e) =>
            setHasDeadline(e.target.checked)
          }
        />

        <span>Tiene fecha límite</span>
      </label>

      {hasDeadline && (
        <div className="grid grid-cols-2 gap-3">

          <input
            type="text"
            placeholder="Mes"
            value={deadlineMonth}
            onChange={(e) =>
              setDeadlineMonth(e.target.value)
            }
            className="rounded-xl border border-slate-300 px-4 py-3"
          />

          <input
            type="number"
            placeholder="Año"
            value={deadlineYear}
            onChange={(e) =>
              setDeadlineYear(e.target.value)
            }
            className="rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>
      )}

      <PrimaryButton type="submit">
        {debt
          ? "Guardar cambios"
          : "Crear deuda"}
      </PrimaryButton>
    </form>
  );
}