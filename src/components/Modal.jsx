import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  children,
}) {
  if (!open) return null;

  return (
    <div
      className="
  fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
       className="
  relative
  w-full
  max-w-2xl
  max-h-[90vh]
  overflow-y-auto
  rounded-t-3xl
  bg-white
  p-5
  shadow-2xl
  sm:rounded-3xl
  sm:p-8
"
      >
        <button
          onClick={onClose}
          className="
  absolute
  right-3
  top-3
            rounded-lg
            p-2
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
        >
          <X size={22} />
        </button>

        {children}
      </div>
    </div>
  );
}