import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export default function DividendModal({
  investment,
  onSubmit,
}) {
  const [amount, setAmount] = useState("");

  function handleSubmit() {
  if (!amount || Number(amount) <= 0) return;

  onSubmit(Number(amount));
  setAmount("");
}
  return (
    <div className="space-y-5">

      <h2 className="text-xl font-bold sm:text-2xl">
        Registrar dividendo
      </h2>

      <p className="text-slate-500">
        {investment.name}
      </p>
<div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Importe recibido
  </label>

  <input
    type="number"
    inputMode="decimal"
    placeholder="Importe recibido"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
  />
</div>

      <PrimaryButton onClick={handleSubmit}>
        Registrar dividendo
      </PrimaryButton>

    </div>
  );
}