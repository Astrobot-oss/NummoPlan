import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  children,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-2xl
          max-h-[90vh]
          flex
          flex-col
          rounded-t-3xl
          sm:rounded-3xl
          bg-white
          shadow-2xl
          overflow-hidden
        "
      >
        <button
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            z-20
            rounded-full
            p-2
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
        >
          <X size={22} />
        </button>

        <div className="overflow-y-auto p-5 sm:p-8 pr-12">
          {children}
        </div>
      </div>
    </div>
  );
}