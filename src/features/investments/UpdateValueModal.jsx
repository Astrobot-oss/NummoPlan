import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export default function UpdateValueModal({
  investment,
  onSubmit,
}) {
  const [price, setPrice] = useState(
    investment?.currentPrice || ""
  );

  function handleSubmit() {
    onSubmit(Number(price));
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">
        Actualizar precio
      </h2>

      <p className="text-slate-500">
        {investment?.name}
      </p>

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Precio actual por participación (€)"
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />

      <PrimaryButton onClick={handleSubmit}>
        Actualizar precio
      </PrimaryButton>
    </div>
  );
}