import PrimaryButton from "../../components/PrimaryButton";

export default function MovementForm({
  type,
  category,
  amount,
  description,
  categories,
  onTypeChange,
  onCategoryChange,
  onAmountChange,
  onDescriptionChange,
  onSubmit,
  isEditing = false,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {isEditing ? "Editar movimiento" : "Nuevo movimiento"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditing
            ? "Modifica los datos del movimiento."
            : "Registra un ingreso o un gasto."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onTypeChange("income")}
          className={`rounded-xl border p-3 transition ${
            type === "income"
              ? "border-green-500 bg-green-50 text-green-700"
              : "border-slate-300 hover:bg-slate-50"
          }`}
        >
          Ingreso
        </button>

        <button
          type="button"
          onClick={() => onTypeChange("expense")}
          className={`rounded-xl border p-3 transition ${
            type === "expense"
              ? "border-red-500 bg-red-50 text-red-700"
              : "border-slate-300 hover:bg-slate-50"
          }`}
        >
          Gasto
        </button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Categoría
        </label>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Importe
        </label>

        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.00"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Descripción
        </label>

        <input
          type="text"
          placeholder="Opcional"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <div className="flex justify-end">
        <PrimaryButton type="submit">
          {isEditing ? "Guardar cambios" : "Guardar movimiento"}
        </PrimaryButton>
      </div>
    </form>
  );
}