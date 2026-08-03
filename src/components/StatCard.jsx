export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 h-full flex flex-col justify-center">
      <p className="text-slate-500 text-sm font-medium">
  {title}
</p>

<h2 className="text-6xl font-bold tracking-tight mt-4 text-slate-900">
  {value}
</h2>

<p className="text-slate-500 mt-4">
  {subtitle}
</p>
    </div>
  );
}