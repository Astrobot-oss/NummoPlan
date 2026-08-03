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
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="4 4"
        />

        <XAxis dataKey="date" />

        <YAxis
          domain={["auto", "auto"]}
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#f97316"
          strokeWidth={3}
          dot={{
            r: 4,
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
