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
  if (!price || Number(price) <= 0) return;

  onSubmit(Number(price));
}

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold sm:text-2xl">
        Actualizar precio
      </h2>

      <p className="text-slate-500">
        {investment?.name}
      </p>

      <input
  type="number"
  inputMode="decimal"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  placeholder="Precio actual por participación (€)"
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
/>

      <PrimaryButton onClick={handleSubmit}>
        Actualizar precio
      </PrimaryButton>
    </div>
  );
}