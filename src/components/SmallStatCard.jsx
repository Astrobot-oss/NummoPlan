export default function SmallStatCard({
  title,
  value,
}) {
  return (
    <div className="flex min-h-[90px] flex-col justify-center rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:min-h-[100px] lg:min-h-[110px] lg:p-5">
      <p className="text-xs text-slate-500 sm:text-sm">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl lg:mt-3 lg:text-2xl">
        {value}
      </h3>

    </div>
  );
}