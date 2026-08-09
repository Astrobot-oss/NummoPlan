import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function AccumulatedSavingsChart({
  historicalData = [],
}) {
  if (historicalData.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-semibold text-slate-900">
          Evolución del ahorro acumulado
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Todavía no hay datos suficientes para mostrar la evolución.
        </p>
      </div>
    );
  }

  let accumulated = 0;

  const dataWithAccumulated = historicalData.map((item) => {
    accumulated += Number(item.savings || 0);

    return {
      ...item,
      accumulatedSavings: accumulated,
    };
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-slate-900">
          Evolución del ahorro acumulado
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Cómo evoluciona tu ahorro acumulado a lo largo del tiempo.
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dataWithAccumulated}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="monthName"
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value} €`}
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString("es-ES")} €`,
                "Ahorro acumulado",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 8px 24px rgba(15, 23, 42, 0.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="accumulatedSavings"
              name="Ahorro acumulado"
              stroke="#0f172a"
              fill="#e2e8f0"
              strokeWidth={2}
              activeDot={{
                r: 5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}