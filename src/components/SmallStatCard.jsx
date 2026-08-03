export default function SmallStatCard({ title, value }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all min-h-[110px] flex flex-col justify-center">
      <p className="text-sm text-slate-500">{title}</p>

      <h3 className="text-2xl font-semibold mt-3">
        {value}
      </h3>
    </div>
  );
}