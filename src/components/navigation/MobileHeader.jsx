import { Menu, PiggyBank } from "lucide-react";

export default function MobileHeader({ onOpenMenu }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
      <button
        onClick={onOpenMenu}
        className="rounded-lg p-2 transition hover:bg-slate-100"
        aria-label="Abrir menú"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-2">
        <PiggyBank
          size={28}
          className="text-orange-500"
        />

        <span className="text-xl font-bold text-orange-500">
          NummoPlan
        </span>
      </div>

      {/* Equilibra visualmente el botón izquierdo */}
      <div className="w-10" />
    </header>
  );
}