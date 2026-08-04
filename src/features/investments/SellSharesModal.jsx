import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export default function SellSharesModal({
  investment,
  onSubmit,
}) {
  const [shares, setShares] = useState("");

  const maxShares = investment.shares;

  const total =
    shares && investment.currentPrice
      ? Number(shares) * investment.currentPrice
      : 0;

  function handleSubmit() {
    if (
  Number(shares) <= 0 ||
  Number(shares) > investment.shares
) {
  return;
}
    onSubmit({
      shares: Number(shares),
      amount: total,
      price: investment.currentPrice,
    });

    setShares("");
  }

  return (
    <div className="space-y-5">

      <h2 className="text-xl font-bold sm:text-2xl">
        Vender participaciones
      </h2>

      <p className="text-slate-500">
        {investment.name}
      </p>

      <div>

        <label className="mb-2 block text-sm font-medium">

          Participaciones

        </label>

        <input
  type="number"
  inputMode="decimal"
  max={maxShares}
  value={shares}
  onChange={(e) => setShares(e.target.value)}
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
/>

      </div>

      <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">

        <p className="text-sm text-slate-500">

          Importe recibido

        </p>

        <p className="break-words text-xl font-bold sm:text-2xl">

          {total.toLocaleString("es-ES")} €

        </p>

      </div>

      <PrimaryButton
  disabled={
    Number(shares) <= 0 ||
    Number(shares) > investment.shares
  }
  onClick={handleSubmit}
>
  Vender
</PrimaryButton>

    </div>
  );
}