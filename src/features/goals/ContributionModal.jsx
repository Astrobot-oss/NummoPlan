import { useState } from "react";
import Modal from "../../components/Modal";
import PrimaryButton from "../../components/PrimaryButton";

export default function ContributionModal({
  open,
  onClose,
  onSubmit,
}) {
  const [amount, setAmount] = useState("");

  function handleSubmit() {
  if (!amount || Number(amount) <= 0) return;

  onSubmit(Number(amount));

  setAmount("");
}

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">
            Añadir dinero
          </h2>

          <p className="mt-2 text-slate-500">
            Introduce la cantidad que deseas aportar.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Cantidad
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>

        <div className="flex justify-end">
          <PrimaryButton onClick={handleSubmit}>
            Añadir
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}