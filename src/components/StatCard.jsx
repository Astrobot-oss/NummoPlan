export default function StatCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="flex h-full flex-col justify-center rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg md:p-8">

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:mt-4 md:text-5xl xl:text-6xl">
        {value}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm text-slate-500 md:mt-4 md:text-base">
          {subtitle}
        </p>
      )}

    </div>
  );
}