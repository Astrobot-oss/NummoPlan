export default function GoalProgressCard({
  progress,
  completed,
  onContribution,
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 lg:p-8 xl:col-span-2">

      <h2 className="text-xl font-bold sm:text-2xl">
        Progreso del objetivo
      </h2>

      <div className="mt-8 flex items-center justify-center sm:mt-10 sm:h-80">

        <div className="text-center">

          <div className="mx-auto flex h-52 w-24 items-end overflow-hidden rounded-full border-4 border-slate-300 bg-slate-100 sm:h-64 sm:w-28">

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

            <p className="text-2xl font-bold sm:text-3xl">
              {Math.round(progress)}%
            </p>

            <p className="mt-2 text-slate-500">
              del objetivo completado
            </p>

            <button
  onClick={onContribution}
  className="mt-6 w-full rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600 sm:mt-8 sm:w-auto"
>
              + Nueva aportación
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}