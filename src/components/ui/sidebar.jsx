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
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Target, label: "Objetivos" },
  { icon: TrendingUp, label: "Inversiones" },
  { icon: CreditCard, label: "Deudas" },
  { icon: House, label: "Inmuebles" },
  { icon: Settings, label: "Ajustes" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-8 py-8">
        <div className="flex items-center gap-3">
          <PiggyBank className="text-orange-500" size={30} />
          <h1 className="text-2xl font-bold text-orange-500">
            PiggyVault
          </h1>
        </div>
      </div>

      <nav className="flex flex-col gap-2 px-4">
        {menu.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all
            ${
              item.label === "Dashboard"
                ? "bg-orange-100 text-orange-600"
                : "hover:bg-gray-100"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}