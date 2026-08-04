import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Target,
  TrendingUp,
  CreditCard,
  House,
  Settings,
  PiggyBank,
  X,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, label: "Resumen", path: "/" },
  { icon: Target, label: "Objetivos", path: "/objetivos" },
  { icon: TrendingUp, label: "Patrimonio", path: "/inversiones" },
  { icon: CreditCard, label: "Deudas", path: "/deudas" },
  { icon: House, label: "Inmuebles", path: "/inmuebles" },
  { icon: Settings, label: "Ajustes", path: "/ajustes" },
];

export default function MobileSidebar({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
      />

      <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white shadow-xl lg:hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <PiggyBank
              size={30}
              className="text-orange-500"
            />

            <span className="text-xl font-bold text-orange-500">
              NummoPlan
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 p-4">
          {menu.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-4 text-base transition ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <item.icon size={22} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}