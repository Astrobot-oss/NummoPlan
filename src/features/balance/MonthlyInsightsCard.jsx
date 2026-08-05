export default function MonthlyInsightsCard({
  insights = [],
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h3 className="text-lg font-semibold">
        Análisis del mes
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        NummoPlan analiza automáticamente tus hábitos financieros.
      </p>

      <div className="mt-6 space-y-3">

        {insights.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">
            <p className="text-slate-500">
              Registra algunos movimientos para recibir recomendaciones personalizadas.
            </p>
          </div>
        ) : (
          insights.map((insight, index) => (
            <div
              key={index}
              className="rounded-2xl bg-slate-50 p-4"
            >
              <p className="font-medium">
                {insight}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}