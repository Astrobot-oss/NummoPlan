import { useState, useEffect } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export function RecurringIncomeModal({
  recurringIncome,
  onClose,
  onSubmit,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [day, setDay] = useState("1");
  const [secondDay, setSecondDay] = useState("15");

  const [targetMonths, setTargetMonths] =
    useState(["3", "6", "9", "12"]);

  const [hasExtraPay, setHasExtraPay] =
    useState(false);

  const [extraPayMonths, setExtraPayMonths] =
    useState(["6", "12"]);

  const [startDate, setStartDate] =
    useState("");

  useEffect(() => {
    if (recurringIncome) {
      setTitle(recurringIncome.title || "");

      setAmount(
        recurringIncome.amount || ""
      );

      setFrequency(
        recurringIncome.frequency ||
          "monthly"
      );

      setDay(
        recurringIncome.day || "1"
      );

      setSecondDay(
        recurringIncome.secondDay || "15"
      );

      setTargetMonths(
        recurringIncome.targetMonths ||
          (
            recurringIncome.frequency ===
            "yearly"
              ? ["12"]
              : ["3", "6", "9", "12"]
          )
      );

      setHasExtraPay(
        recurringIncome.hasExtraPay ||
          false
      );

      setExtraPayMonths(
        recurringIncome.extraPayMonths ||
          ["6", "12"]
      );

      setStartDate(
        recurringIncome.startDate ||
          new Date()
            .toISOString()
            .split("T")[0]
      );
    } else {
      setTitle("");
      setAmount("");
      setFrequency("monthly");
      setDay("1");
      setSecondDay("15");

      setTargetMonths([
        "3",
        "6",
        "9",
        "12",
      ]);

      setHasExtraPay(false);

      setExtraPayMonths([
        "6",
        "12",
      ]);

      setStartDate(
        new Date()
          .toISOString()
          .split("T")[0]
      );
    }
  }, [recurringIncome]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !startDate) {
      return;
    }

    onSubmit({
      id: recurringIncome
        ? recurringIncome.id
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

      hasExtraPay:
        frequency === "monthly"
          ? hasExtraPay
          : false,

      extraPayMonths:
        frequency === "monthly" &&
        hasExtraPay
          ? extraPayMonths
          : [],

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

  const toggleExtraPayMonth = (month) => {
    if (
      extraPayMonths.includes(month)
    ) {
      setExtraPayMonths(
        extraPayMonths.filter(
          (m) => m !== month
        )
      );
    } else {
      setExtraPayMonths([
        ...extraPayMonths,
        month,
      ]);
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
          {recurringIncome
            ? "Editar ingreso recurrente"
            : "Nuevo ingreso recurrente"}
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Configura tus entradas de dinero
          periódicas y fechas de cobro.
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
            placeholder="Ej: Nómina, Alquiler cobrado..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* CANTIDAD + FRECUENCIA */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Cantidad Neta (€)
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

                if (
                  newFreq === "yearly"
                ) {
                  setTargetMonths([
                    "12",
                  ]);
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
                Primer día de cobro
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
                Segundo día de cobro
              </label>

              <input
                type="number"
                min="1"
                max="31"
                value={secondDay}
                onChange={(e) =>
                  setSecondDay(
                    e.target.value
                  )
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
                  ? "Mes del cobro anual"
                  : "Meses de cobro trimestral"}
              </label>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {monthsList.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() =>
                      toggleTargetMonth(
                        m.id
                      )
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
                Día del mes en que se cobra
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
              Día de cobro habitual
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

        {/* PAGAS EXTRA */}

        {frequency === "monthly" && (
          <div className="space-y-3 border-t border-slate-100 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                ¿Incluye pagas extra?
              </label>

              <input
                type="checkbox"
                checked={hasExtraPay}
                onChange={(e) =>
                  setHasExtraPay(
                    e.target.checked
                  )
                }
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
            </div>

            {hasExtraPay && (
              <div className="space-y-2">
                <span className="block text-xs text-slate-500">
                  Selecciona los meses de paga
                  extra:
                </span>

                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {monthsList.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() =>
                        toggleExtraPayMonth(
                          m.id
                        )
                      }
                      className={`rounded-xl border px-2 py-2 text-xs font-medium transition-all ${
                        extraPayMonths.includes(
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
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          Cancelar
        </button>

        <PrimaryButton type="submit">
          {recurringIncome
            ? "Guardar cambios"
            : "Añadir ingreso"}
        </PrimaryButton>
      </div>
    </form>
  );
}