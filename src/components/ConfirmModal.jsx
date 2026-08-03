import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-2 text-slate-500">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-100"
          >
            Cancelar
          </button>

          <PrimaryButton onClick={onConfirm}>
            Eliminar
          </PrimaryButton>

        </div>

      </div>
    </Modal>
  );
}