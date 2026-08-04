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
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            {title}
          </h2>

          <p className="mt-2 text-slate-500">
            {message}
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
  onClick={onClose}
  className="w-full rounded-xl border border-slate-300 px-5 py-3 transition-colors hover:bg-slate-100 sm:w-auto"
>
            Cancelar
          </button>

          <PrimaryButton
  onClick={onConfirm}
  className="sm:w-auto"
>
            Eliminar
          </PrimaryButton>

        </div>

      </div>
    </Modal>
  );
}