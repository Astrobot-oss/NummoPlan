import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export default function ContributionModal({
  investment,
  onSubmit,
}) {
  const [amount, setAmount] = useState("");

  const shares =
    amount && investment
      ? Number(amount) / investment.currentPrice
      : 0;

  function handleSubmit() {
  if (!amount || Number(amount) <= 0) return;

  onSubmit(Number(amount));
  setAmount("");
}
  return (
    <div className="space-y-5">

      <h2 className="text-xl font-bold sm:text-2xl">
        Comprar participaciones
      </h2>

      <p className="text-slate-500">
        {investment?.name}
      </p>

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Cantidad invertida
        </label>

        <input
  type="number"
  inputMode="decimal"
  placeholder="1000"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
/>

      </div>

      <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">

        <div className="flex items-center justify-between gap-4">

          <span className="text-slate-500">
            Precio actual
          </span>

          <span className="font-semibold">
            {investment?.currentPrice.toLocaleString("es-ES")} €
          </span>

        </div>

        <div className="mt-3 flex items-center justify-between gap-4">

          <span className="text-slate-500">
            Participaciones
          </span>

          <span className="font-semibold">
            {shares.toLocaleString("es-ES", {
              maximumFractionDigits: 4,
            })}
          </span>

        </div>

      </div>

      <PrimaryButton onClick={handleSubmit}>
        Comprar participaciones
      </PrimaryButton>

    </div>
  );
}