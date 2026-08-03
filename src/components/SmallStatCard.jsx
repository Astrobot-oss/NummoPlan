export default function SmallStatCard({
  title,
  value,
}) {
  return (
    <div className="flex min-h-[100px] flex-col justify-center rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:min-h-[110px] md:p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-semibold text-slate-900 md:mt-3 md:text-2xl">
        {value}
      </h3>

    </div>
  );
}