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
    onSubmit({
      shares: Number(shares),
      amount: total,
      price: investment.currentPrice,
    });

    setShares("");
  }

  return (
    <div className="space-y-5">

      <h2 className="text-2xl font-bold">
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
          max={maxShares}
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div className="rounded-2xl bg-slate-50 p-4">

        <p className="text-sm text-slate-500">

          Importe recibido

        </p>

        <p className="text-xl font-bold">

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