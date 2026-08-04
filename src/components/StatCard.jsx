export default function StatCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="flex h-full flex-col justify-center rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg sm:p-6 lg:p-8">

      <p className="text-xs font-medium text-slate-500 sm:text-sm">
        {title}
      </p>

      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:mt-4 lg:text-5xl xl:text-6xl">
        {value}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm text-slate-500 lg:mt-4 lg:text-base">
          {subtitle}
        </p>
      )}

    </div>
  );
}