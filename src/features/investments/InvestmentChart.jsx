import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function InvestmentChart({ history = [] }) {
  let data = history.map((item) => ({
    date: new Date(item.date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
    }),
    value: item.price,
  }));

  // Si solo existe un registro, duplicamos el punto
  // para que Recharts pueda dibujar una línea.
  if (data.length === 1) {
    data = [
      {
        ...data[0],
        date: "Inicio",
      },
      data[0],
    ];
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart
        data={data}
        margin={{
  top: 10,
  right: 10,
  left: 0,
  bottom: 0,
}}
      >
        <CartesianGrid
          strokeDasharray="4 4"
        />

        <XAxis
  dataKey="date"
  tick={{ fontSize: 12 }}
  tickMargin={8}
/>

        <YAxis
  width={45}
  domain={["auto", "auto"]}
  tick={{ fontSize: 12 }}
/>

        <Tooltip
  contentStyle={{
    borderRadius: "12px",
  }}
/>

        <Line
          type="monotone"
          dataKey="value"
          stroke="#f97316"
          strokeWidth={3}
          dot={{
            r: 3,
          }}
          activeDot={{
            r: 5,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
