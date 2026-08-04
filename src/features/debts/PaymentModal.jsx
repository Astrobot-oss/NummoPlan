import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export default function PaymentModal({
  debt,
  onSubmit,
}) {
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) return;

    onSubmit(Number(amount));

    setAmount("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <h2 className="text-xl font-bold sm:text-2xl">
        Nuevo pago
      </h2>

      <p className="text-slate-500">
        Introduce el importe del pago realizado.
      </p>

<div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Importe del pago
  </label>

      <input
        type="number"
        placeholder="Ej. 500"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
        required
      />
</div>
      <PrimaryButton
  type="submit"
  disabled={!amount || Number(amount) <= 0}
>
        Registrar pago
      </PrimaryButton>
    </form>
  );
}