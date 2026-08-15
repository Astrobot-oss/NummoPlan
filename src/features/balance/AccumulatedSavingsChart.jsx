import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export function AccumulatedSavingsChart({
  historicalData = [],
}) {
  const data = Array.isArray(historicalData)
    ? historicalData
    : [];

  let accumulatedSavings = 0;
  let accumulatedTarget = 0;

  const chartData = data.map((item) => {
    const monthlySavings = Number(
      item?.savings || 0
    );

    const monthlyTarget = Number(
      item?.targetSavings || 0
    );

    accumulatedSavings += monthlySavings;
    accumulatedTarget += monthlyTarget;

    return {
      month:
        item?.monthName ||
        new Date(
          item?.year,
          item?.month,
          1
        ).toLocaleString("es-ES", {
          month: "short",
        }),

      accumulatedSavings,

      accumulatedTarget,

      extraSavings:
        accumulatedSavings -
        accumulatedTarget,
    };
  });

  const latest =
    chartData.length > 0
      ? chartData[chartData.length - 1]
      : null;

  const extraSavings = latest
    ? latest.extraSavings
    : 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* CABECERA DE LA TARJETA */}

      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Evolución del ahorro
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Ahorro acumulado real frente a tu meta acumulada.
        </p>
      </div>

      {/* GRÁFICA */}

      <div className="mt-6 h-[320px] w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-sm text-slate-500">
              Todavía no hay datos suficientes para mostrar la evolución.
            </p>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                stroke="#e2e8f0"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  `${Number(value).toLocaleString(
                    "es-ES"
                  )} €`
                }
              />

              <Tooltip
                formatter={(value, name) => {
                  const labels = {
                    accumulatedSavings:
                      "Ahorro acumulado",
                    accumulatedTarget:
                      "Meta acumulada",
                  };

                  return [
                    `${Number(value).toLocaleString(
                      "es-ES"
                    )} €`,
                    labels[name] || name,
                  ];
                }}
                labelFormatter={(label) =>
                  String(label)
                }
              />

              <Legend
                formatter={(value) => {
                  const labels = {
                    accumulatedSavings:
                      "Ahorro acumulado",
                    accumulatedTarget:
                      "Meta acumulada",
                  };

                  return labels[value] || value;
                }}
              />

              {/* AHORRO REAL */}

              <Line
                type="monotone"
                dataKey="accumulatedSavings"
                stroke="#0f172a"
                strokeWidth={3}
                dot={{
                  r: 3,
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 5,
                }}
              />

              {/* META */}

              <Line
                type="monotone"
                dataKey="accumulatedTarget"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{
                  r: 2,
                  strokeWidth: 1,
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 4,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* AHORRO EXTRA */}

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Ahorro extra
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Diferencia entre tu ahorro acumulado y la meta acumulada.
            </p>
          </div>

          <p
            className={`shrink-0 text-2xl font-bold ${
              extraSavings >= 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {extraSavings >= 0 ? "+" : ""}
            {extraSavings.toLocaleString(
              "es-ES"
            )}{" "}
            €
          </p>
        </div>
      </div>
    </div>
  );
}