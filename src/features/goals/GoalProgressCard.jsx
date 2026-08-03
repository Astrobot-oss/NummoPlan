export default function GoalProgressCard({
  progress,
  completed,
  onContribution,
}) {
  return (
    <div className="col-span-2 rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        Progreso del objetivo
      </h2>

      <div className="mt-10 flex h-80 items-center justify-center">

        <div className="text-center">

          <div className="mx-auto flex h-64 w-28 items-end overflow-hidden rounded-full border-4 border-slate-300 bg-slate-100">

            <div
              className={`w-full transition-all duration-700 ${
                completed
                  ? "bg-green-500"
                  : "bg-orange-500"
              }`}
              style={{
                height: `${progress}%`,
              }}
            />

          </div>

          <div className="mt-6 text-center">

            <p className="text-3xl font-bold">
              {Math.round(progress)}%
            </p>

            <p className="mt-2 text-slate-500">
              del objetivo completado
            </p>

            <button
              onClick={onContribution}
              className="mt-8 rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
            >
              + Nueva aportación
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}