import { X } from "lucide-react";
export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
  onClick={onClose}
>
      <div
  className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
  onClick={(e) => e.stopPropagation()}
><button
  onClick={onClose}
  className="absolute right-5 top-5 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
>
  <X size={20} />
</button>
        {children}
      </div>
    </div>
  );
}