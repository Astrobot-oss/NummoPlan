import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Target,
  TrendingUp,
  CreditCard,
  House,
  Settings,
  PiggyBank,
  Menu,
  ChevronLeft,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, label: "Resumen", path: "/" },
  { icon: Target, label: "Objetivos", path: "/objetivos" },
  { icon: TrendingUp, label: "Patrimonio", path: "/inversiones" },
  { icon: CreditCard, label: "Deudas", path: "/deudas" },
  { icon: House, label: "Inmuebles", path: "/inmuebles" },
  { icon: Settings, label: "Ajustes", path: "/ajustes" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-6">

        {!collapsed && (
          <div className="flex items-center gap-3">
            <PiggyBank
              className="text-orange-500"
              size={30}
            />

            <h1 className="text-2xl font-bold text-orange-500">
              NummoPlan
            </h1>
          </div>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="rounded-lg p-2 transition hover:bg-slate-100"
        >
          {collapsed ? (
            <Menu size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>

      </div>

      <nav className="flex flex-col gap-2 px-3">

        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-orange-100 text-orange-600"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <item.icon size={20} />

            {!collapsed && (
              <span>{item.label}</span>
            )}
          </NavLink>
        ))}

      </nav>
    </aside>
  );
}