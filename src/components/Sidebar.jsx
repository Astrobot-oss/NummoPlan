import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Target,
  TrendingUp,
  CreditCard,
  House,
  Settings,
  PiggyBank,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, label: "Resumen", path: "/" },
  { icon: Target, label: "Objetivos", path: "/objetivos" },
  {
  icon: TrendingUp,
  label: "Patrimonio",
  path: "/inversiones",
},
  { icon: CreditCard, label: "Deudas", path: "/deudas" },
  { icon: House, label: "Inmuebles", path: "/inmuebles" },
  { icon: Settings, label: "Ajustes", path: "/ajustes" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-8 py-8">
        <div className="flex items-center gap-3">
          <PiggyBank className="text-orange-500" size={30} />
          <h1 className="text-2xl font-bold text-orange-500">
            NummoPlan
          </h1>
        </div>
      </div>

      <nav className="flex flex-col gap-2 px-4">
        {menu.map((item) => (
          <NavLink
  key={item.label}
  to={item.path}
  className={({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
      isActive
        ? "bg-orange-100 text-orange-600"
        : "text-gray-700 hover:bg-gray-100"
    }`
  }
>
  <item.icon size={20} />
  {item.label}
</NavLink>
        ))}
      </nav>
    </aside>
  );
}