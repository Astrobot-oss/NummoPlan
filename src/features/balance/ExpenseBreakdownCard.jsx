import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getExpensesByCategory } from "../../domain/balanceCalculations";

// Diccionario exacto con tus categorías y colores pastel únicos
const CATEGORY_COLORS = {
  "Vivienda": "#a78bfa",      // Lavanda / Morado suave
  "Alimentación": "#f881e4d3",  // Verde menta
  "Transporte": "#38bdf8",    // Azul cielo
  "Ocio": "#f3a20b",          // Amarillo / Ámbar
  "Restaurantes": "#fb7185",  // Coral suave
  "Compras": "#f3eb7a",       // Rosa pastel
  "Salud": "#3af162",         // Turquesa
  "Mascotas": "#886147",      // Rojo suave / salmón
  "Suscripciones": "#7c8a4a", // Índigo claro
  "Impuestos": "#ffb4b2",     // Gris azulado
  "Otros": "#cbd5e1"          // Gris suave
};

const DEFAULT_COLOR = "#e2e8f0";

export default function ExpenseBreakdownCard({ movements }) {
  const { result, totalExpenses } = getExpensesByCategory(movements);

  const data = result.map(item => ({
    name: item.category,
    value: item.amount
  }));

  const getCategoryColor = (categoryName) => {
    return CATEGORY_COLORS[categoryName] || DEFAULT_COLOR;
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-900">Distribución de Gastos</h3>
        <p className="text-xs text-slate-500 mt-0.5">Visión circular de tus categorías.</p>
      </div>

      <div className="relative h-60 w-full">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-400">
            No hay gastos registrados todavía.
          </div>
        ) : (
          <>
            {/* Texto en el centro del Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total</span>
              <span className="text-base font-bold text-slate-900">
                {totalExpenses.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={58} // Anillo un poco más ancho
                  outerRadius={82} // Radio exterior equilibrado
                  paddingAngle={3}  // Espaciado más sutil para que no rompa las porciones pequeñas
                  dataKey="value"
                >
                  {data.map((entry) => (
                    <Cell 
                      key={`cell-${entry.name}`} 
                      fill={getCategoryColor(entry.name)} 
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(2)} €`, 'Importe']}
                  contentStyle={{ 
                    borderRadius: '1rem', 
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                    backgroundColor: '#ffffff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </div>

      {result.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
          {result.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full shrink-0" 
                style={{ backgroundColor: getCategoryColor(item.category) }} 
              />
              <div className="text-xs truncate">
                <span className="font-semibold text-slate-700">{item.category}</span>
                <span className="text-slate-400 ml-1">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}