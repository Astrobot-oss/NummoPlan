import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  children,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-2xl
          rounded-t-3xl
          bg-white
          p-6
          shadow-2xl
          max-h-[90vh]
          overflow-y-auto
          sm:rounded-3xl
          sm:p-8
        "
      >
        <button
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            rounded-lg
            p-2
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </div>
  );
}