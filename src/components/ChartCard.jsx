import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { netWorthData } from "../data/netWorthData";

export default function ChartCard() {
  return (
    <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6 lg:mt-8 lg:p-8">

      <h2 className="text-lg font-semibold md:text-xl">
        Evolución del patrimonio
      </h2>

      <p className="mb-6 text-sm text-slate-500 md:mb-8 md:text-base">
        Resumen anual
      </p>

      <div className="h-72 sm:h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart
            data={netWorthData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >

            <defs>

              <linearGradient
                id="colorValue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="rgb(168,129,240)"
                  stopOpacity={0.65}
                />

                <stop
                  offset="95%"
                  stopColor="rgb(168,129,240)"
                  stopOpacity={0.20}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
            />

            <XAxis
  dataKey="month"
  tickMargin={8}
  minTickGap={20}
  tick={{ fontSize: 11 }}
/>

            <YAxis
              width={45}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
  contentStyle={{
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  }}
/>

            <Area
              type="monotone"
              dataKey="value"
              stroke="rgb(168,129,240)"
              strokeWidth={3}
              fill="url(#colorValue)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}