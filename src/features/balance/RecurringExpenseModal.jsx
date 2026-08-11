import { useState, useEffect } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export function RecurringExpenseModal({
  recurringExpense,
  onClose,
  onSubmit,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [day, setDay] = useState("1");
  const [secondDay, setSecondDay] = useState("15");
  const [targetMonths, setTargetMonths] = useState([
    "3",
    "6",
    "9",
    "12",
  ]);

  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    if (recurringExpense) {
      setTitle(recurringExpense.title || "");
      setAmount(recurringExpense.amount || "");
      setFrequency(
        recurringExpense.frequency || "monthly"
      );
      setDay(recurringExpense.day || "1");
      setSecondDay(
        recurringExpense.secondDay || "15"
      );

      setTargetMonths(
        recurringExpense.targetMonths ||
          (
            recurringExpense.frequency === "yearly"
              ? ["12"]
              : ["3", "6", "9", "12"]
          )
      );

      setStartDate(
        recurringExpense.startDate ||
          new Date().toISOString().split("T")[0]
      );
    } else {
      setTitle("");
      setAmount("");
      setFrequency("monthly");
      setDay("1");
      setSecondDay("15");
      setTargetMonths(["3", "6", "9", "12"]);

      setStartDate(
        new Date().toISOString().split("T")[0]
      );
    }
  }, [recurringExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !startDate) {
      return;
    }

    onSubmit({
      id: recurringExpense
        ? recurringExpense.id
        : crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString() +
            Math.random()
              .toString(36)
              .substr(2, 9),

      title,
      amount: Number(amount),

      frequency,

      day: Number(day),

      secondDay:
        frequency === "biweekly"
          ? Number(secondDay)
          : null,

      targetMonths:
        frequency === "quarterly" ||
        frequency === "yearly"
          ? targetMonths
          : null,

      startDate,
    });
  };

  const toggleTargetMonth = (month) => {
    if (frequency === "yearly") {
      setTargetMonths([month]);
    } else {
      if (targetMonths.includes(month)) {
        if (targetMonths.length > 1) {
          setTargetMonths(
            targetMonths.filter(
              (m) => m !== month
            )
          );
        }
      } else {
        setTargetMonths([
          ...targetMonths,
          month,
        ]);
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {recurringExpense
            ? "Editar gasto recurrente"
            : "Nuevo gasto recurrente"}
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Configura tus obligaciones fijas periódicas
          y fechas de cargo.
        </p>
      </div>

      <div className="space-y-4">
        {/* CONCEPTO */}

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Concepto
          </label>

          <input
            type="text"
            required
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Ej: Seguro del coche, Suscripción..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* CANTIDAD + FRECUENCIA */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Cantidad (€)
            </label>

            <input
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              placeholder="0.00"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Frecuencia
            </label>

            <select
              value={frequency}
              onChange={(e) => {
                const newFreq =
                  e.target.value;

                setFrequency(newFreq);

                if (newFreq === "yearly") {
                  setTargetMonths(["12"]);
                }

                if (
                  newFreq === "quarterly"
                ) {
                  setTargetMonths([
                    "3",
                    "6",
                    "9",
                    "12",
                  ]);
                }
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="monthly">
                Mensual
              </option>

              <option value="biweekly">
                Quincenal
              </option>

              <option value="quarterly">
                Trimestral
              </option>

              <option value="yearly">
                Anual
              </option>
            </select>
          </div>
        </div>

        {/* FECHA DE INICIO */}

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Fecha de inicio
          </label>

          <input
            type="date"
            required
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
          />

          <p className="mt-1.5 text-xs text-slate-400">
            La recurrencia empezará a aplicarse
            a partir de esta fecha.
          </p>
        </div>

        {/* QUINCENAL */}

        {frequency === "biweekly" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Primer día de cargo
              </label>

              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) =>
                  setDay(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Segundo día de cargo
              </label>

              <input
                type="number"
                min="1"
                max="31"
                value={secondDay}
                onChange={(e) =>
                  setSecondDay(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        ) : frequency === "quarterly" ||
          frequency === "yearly" ? (
          <div className="space-y-4 border-t border-slate-100 pt-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                {frequency === "yearly"
                  ? "Mes del cargo anual"
                  : "Meses de cargo trimestral"}
              </label>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {monthsList.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() =>
                      toggleTargetMonth(m.id)
                    }
                    className={`rounded-xl border px-2 py-2 text-xs font-medium transition-all ${
                      targetMonths.includes(
                        m.id
                      )
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Día del mes en que se carga
              </label>

              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) =>
                  setDay(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Día de cargo habitual
            </label>

            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) =>
                setDay(e.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        )}
      </div>

      {/* BOTONES */}

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          Cancelar
        </button>

        <PrimaryButton type="submit">
          {recurringExpense
            ? "Guardar cambios"
            : "Añadir gasto"}
        </PrimaryButton>
      </div>
    </form>
  );
}