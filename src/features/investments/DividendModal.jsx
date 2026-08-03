import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export default function DividendModal({
  investment,
  onSubmit,
}) {
  const [amount, setAmount] = useState("");

  function handleSubmit() {
    onSubmit(Number(amount));
    setAmount("");
  }

  return (
    <div className="space-y-5">

      <h2 className="text-2xl font-bold">
        Registrar dividendo
      </h2>

      <p className="text-slate-500">
        {investment.name}
      </p>

      <input
        type="number"
        placeholder="Importe recibido"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <PrimaryButton onClick={handleSubmit}>
        Registrar dividendo
      </PrimaryButton>

    </div>
  );
}