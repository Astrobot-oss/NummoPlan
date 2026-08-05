import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

const categories = {
  income: [
    "Salario",
    "Paga extra",
    "Dividendos",
    "Alquiler",
    "Venta",
    "Regalo",
    "Otros",
  ],
  expense: [
    "Vivienda",
    "Alimentación",
    "Transporte",
    "Ocio",
    "Restaurantes",
    "Compras",
    "Salud",
    "Mascotas",
    "Suscripciones",
    "Impuestos",
    "Otros",
  ],
};

export default function MovementModal({
  onSubmit,
}) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Alimentación");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  function handleTypeChange(newType) {
    setType(newType);
    setCategory(categories[newType][0]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      id: Date.now(),
      type,
      category,
      amount: Number(amount),
      description,
      date: new Date().toISOString(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>

        <h2 className="text-xl font-bold sm:text-2xl">
          Nuevo movimiento
        </h2>

        <p className="text-slate-500">
          Registra un ingreso o un gasto.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-3">

        <button
          type="button"
          onClick={() => handleTypeChange("income")}
          className={`rounded-xl border p-3 ${
            type === "income"
              ? "border-green-500 bg-green-50"
              : "border-slate-300"
          }`}
        >
          Ingreso
        </button>

        <button
          type="button"
          onClick={() => handleTypeChange("expense")}
          className={`rounded-xl border p-3 ${
            type === "expense"
              ? "border-red-500 bg-red-50"
              : "border-slate-300"
          }`}
        >
          Gasto
        </button>

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Categoría
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >
          {categories[type].map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Importe
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Descripción
        </label>

        <input
          type="text"
          placeholder="Opcional"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

      </div>

      <div className="flex justify-end">

        <PrimaryButton type="submit">
          Guardar movimiento
        </PrimaryButton>

      </div>

    </form>
  );
}