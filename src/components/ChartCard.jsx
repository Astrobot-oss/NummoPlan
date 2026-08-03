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
    <div className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

      <h2 className="text-xl font-semibold">
        Evolución del patrimonio
      </h2>

      <p className="text-slate-500 mb-8">
        Resumen anual
      </p>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

         <AreaChart
  data={netWorthData}
  margin={{
    top: 20,
    right: 20,
    left: 20,
    bottom: 10,
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
                <stop offset="5%" stopColor="rgb(168, 129, 240)" stopOpacity={0.65}/>
                <stop offset="95%" stopColor="rgb(168, 129, 240)" stopOpacity={0.25}/>
              </linearGradient>
            </defs>
        <CartesianGrid
  vertical={false}
  stroke="hsl(0, 2%, 63%)"
  strokeDasharray="6 6"
/>

<YAxis
  axisLine={true}
  tickLine={0.5}
  width={55}
  tickMargin={10}
/>

            <XAxis
  dataKey="month"
  tickLine={0.5}
  axisLine={true}
  interval={0}
  tickMargin={10}
/>

            <Area
              type="monotone"
              dataKey="value"
              stroke="rgb(168, 129, 240)"
              strokeWidth={3}
              fill="url(#colorValue)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}