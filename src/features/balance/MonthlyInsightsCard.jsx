import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, AlertCircle, Info, Settings2 } from "lucide-react";

export default function MonthlyInsightsCard({ insights = [], targetSavings, onTargetChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState(targetSavings);

  // Sincroniza el estado local si la prop targetSavings cambia desde el componente padre
  useEffect(() => {
    setTempTarget(targetSavings);
  }, [targetSavings]);

  const handleSave = (e) => {
    e.preventDefault();
    onTargetChange(Number(tempTarget));
    setIsEditing(false);
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <TrendingUp className="h-5 w-5 text-emerald-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-rose-600" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-slate-600" />;
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 border-emerald-100 text-emerald-900";
      case "warning":
        return "bg-amber-50 border-amber-100 text-amber-900";
      case "error":
        return "bg-rose-50 border-rose-100 text-rose-900";
      case "info":
        return "bg-blue-50 border-blue-100 text-blue-900";
      default:
        return "bg-slate-50 border-slate-100 text-slate-900";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-slate-100 p-2.5 text-slate-700">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Análisis mensual</h2>
            <p className="text-xs text-slate-500">Meta de ahorro fijada: {targetSavings} €</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 transition-colors"
          title="Ajustar objetivo de ahorro"
        >
          <Settings2 size={18} />
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="mb-4 flex items-center gap-2 rounded-2xl bg-slate-50 p-3 border border-slate-200">
          <input
            type="number"
            value={tempTarget}
            onChange={(e) => setTempTarget(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="Ej: 300"
          />
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Guardar
          </button>
        </form>
      )}

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`flex items-start gap-3.5 rounded-2xl border p-4 transition-all ${getBadgeStyle(
              insight.type
            )}`}
          >
            <div className="mt-0.5 shrink-0">{getIcon(insight.type)}</div>
            <div>
              <h3 className="text-sm font-semibold">{insight.title}</h3>
              <p className="mt-1 text-xs opacity-90 leading-relaxed">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}