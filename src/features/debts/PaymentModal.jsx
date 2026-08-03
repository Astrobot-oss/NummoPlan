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
      <h2 className="text-2xl font-bold">
        Nuevo pago
      </h2>

      <p className="text-slate-500">
        {debt?.name}
      </p>

      <input
        type="number"
        placeholder="Cantidad (€)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
        required
      />

      <PrimaryButton type="submit">
        Registrar pago
      </PrimaryButton>
    </form>
  );
}