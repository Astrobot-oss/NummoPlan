export default function Header() {
  return (
    <header className="flex items-center justify-between mb-10">
      <div>
        <p className="text-4xl font-bold text-slate-900 mt-1">
          ¡Bienvenido!
        </p>

        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          Resumen de tus finanzas
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-11 h-11 rounded-full bg-white shadow-sm border border-slate-200 hover:shadow-md transition-all">
          🔔
        </button>

        <button className="w-11 h-11 rounded-full bg-orange-500 text-white font-semibold hover:scale-105 transition">
          M
        </button>
      </div>
    </header>
  );
}