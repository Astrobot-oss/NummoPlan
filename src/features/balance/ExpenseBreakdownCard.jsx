import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";


import { getExpensesByCategory } from "../../domain/balanceCalculations";


// ============================================================
// COLORES DE CATEGORÍAS
// ============================================================


const CATEGORY_COLORS = {
  Vivienda: "#a78bfa",
  Alimentación: "#6ee7b7",
  Transporte: "#38bdf8",
  Ocio: "#e98f5b",
  Restaurantes: "#fb7185",
  Compras: "#4283b8",
  Salud: "#3af162",
  Mascotas: "#886147",
  Suscripciones: "#7c8a4a",
  Impuestos: "#ffb4b2",
  Otros: "#f7005f",
};


const DEFAULT_COLOR = "#4a5a70";


// ============================================================
// COMPONENTE
// ============================================================


export default function ExpenseBreakdownCard({
  movements = [],
}) {
  const { result, totalExpenses } =
    getExpensesByCategory(movements);


  const data = result.map((item) => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage,
  }));


  const [activeTooltip, setActiveTooltip] =
    useState(null);


  const getCategoryColor = (categoryName) => {
    return (
      CATEGORY_COLORS[categoryName] ||
      DEFAULT_COLOR
    );
  };


  // ==========================================================
  // POSICIÓN DEL TOOLTIP
  //
  // Calculamos la posición a partir del centro angular real
  // del sector que está siendo señalado.
  // ==========================================================


  const handleSectorEnter = (entry) => {
    if (
      !entry ||
      typeof entry.startAngle !== "number" ||
      typeof entry.endAngle !== "number"
    ) {
      return;
    }


    const {
      startAngle,
      endAngle,
      cx,
      cy,
      outerRadius,
    } = entry;


    // Ángulo central del sector.
    const middleAngle =
      (startAngle + endAngle) / 2;


    // Recharts trabaja con ángulos en grados y coordenadas
    // SVG, por eso invertimos el signo para obtener la
    // dirección visual correcta.
    const radians =
      (-middleAngle * Math.PI) / 180;


    const directionX = Math.cos(radians);
    const directionY = Math.sin(radians);


    /*
     * Distancia desde el centro del gráfico hasta el centro
     * del tooltip.
     *
     * El tooltip queda fuera del donut pero sigue próximo
     * al sector correspondiente.
     */
    const tooltipDistance =
      outerRadius + 80;


    const x =
      cx +
      directionX * tooltipDistance;


    const y =
      cy +
      directionY * tooltipDistance;


    setActiveTooltip({
      name: entry.name,
      value: entry.value,
      percentage: entry.percentage,
      x,
      y,
      directionX,
      directionY,
    });
  };


  const handleSectorLeave = () => {
    setActiveTooltip(null);
  };


  return (
    <div>
      {/* ======================================================
          CABECERA
      ====================================================== */}


      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Distribución de gastos
        </h3>


        <p className="mt-1 text-sm text-slate-500">
          Distribución de tus gastos por categoría durante este mes.
        </p>
      </div>


      {/* ======================================================
          SIN GASTOS
      ====================================================== */}


      {data.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-slate-300 py-10 text-center">
          <p className="text-sm text-slate-500">
            No hay gastos registrados durante este mes.
          </p>
        </div>
      ) : (
        <>
          {/* ==================================================
              PIE / DONUT + LEYENDA
          ================================================== */}


          <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(360px,1fr)_minmax(360px,1fr)]">


            {/* ==================================================
                PIE / DONUT
            ================================================== */}


            <div className="relative h-[360px] w-full overflow-visible">
              {/* ----------------------------------------------
                  TOTAL EN EL CENTRO
              ---------------------------------------------- */}


              <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Total
                </span>


                <span className="mt-1 text-xl font-bold text-slate-900">
                  {totalExpenses.toLocaleString(
                    "es-ES",
                    {
                      style: "currency",
                      currency: "EUR",
                    }
                  )}
                </span>
              </div>


              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={115}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    isAnimationActive={false}
                    onMouseEnter={handleSectorEnter}
                    onMouseLeave={handleSectorLeave}
                  >
                    {data.map((entry) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={getCategoryColor(
                          entry.name
                        )}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>


              {/* ==================================================
                  TOOLTIP PERSONALIZADO
                  Se posiciona radialmente respecto al sector.
              ================================================== */}


              {activeTooltip && (
                <div
                  className="pointer-events-none absolute z-30 w-[130px] rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center shadow-lg"
                  style={{
                    left: `${activeTooltip.x}px`,
                    top: `${activeTooltip.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: getCategoryColor(
                          activeTooltip.name
                        ),
                      }}
                    />


                    <p
                      className="truncate text-xs font-semibold"
                      style={{
                        color: getCategoryColor(
                          activeTooltip.name
                        ),
                      }}
                    >
                      {activeTooltip.name}
                    </p>
                  </div>


                  <p
                    className="mt-1 text-sm font-bold"
                    style={{
                      color: getCategoryColor(
                        activeTooltip.name
                      ),
                    }}
                  >
                    {Number(
                      activeTooltip.value
                    ).toLocaleString("es-ES")}{" "}
                    €
                  </p>


                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {activeTooltip.percentage}%
                  </p>
                </div>
              )}
            </div>


            {/* ==================================================
                LEYENDA
            ================================================== */}


            <div
              className={`grid gap-x-6 gap-y-3 ${
                result.length >= 6
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {result.map((item) => (
                <div
                  key={item.category}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          getCategoryColor(
                            item.category
                          ),
                      }}
                    />


                    <span className="truncate text-sm font-medium text-slate-700">
                      {item.category}
                    </span>
                  </div>


                  <div className="shrink-0 text-right">
                    <span className="text-sm font-medium text-slate-700">
                      {item.amount.toLocaleString(
                        "es-ES"
                      )}{" "}
                      €
                    </span>


                    <span className="ml-1 text-xs text-slate-400">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </>
      )}
    </div>
  );
}