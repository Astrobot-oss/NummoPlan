import React from "react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export function MonthlySavingsChart({
  historicalData = [],
}) {
  if (historicalData.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-semibold text-slate-900">
          Ahorro mensual vs meta
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Todavía no hay datos suficientes para mostrar el histórico.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-slate-900">
          Ahorro mensual vs meta
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Evolución del ahorro registrado frente a tu objetivo.
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={historicalData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
            barCategoryGap="35%"
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
              formatter={(value, name) => [
                `${Number(value).toLocaleString("es-ES")} €`,
                name,
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
              }}
            />

            <Legend />

            <Bar
              dataKey="savings"
              name="Ahorro real"
              fill="#0f172a"
              radius={[6, 6, 0, 0]}
              maxBarSize={55}
            />

            <Line
              type="monotone"
              dataKey="targetSavings"
              name="Meta"
              stroke="#64748b"
              strokeWidth={2}
              dot={{
                r: 4,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}