export default function EmptyState({
  icon,
  title,
  description,
  buttonText,
}) {
  const Icon = icon;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8 lg:p-12">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 sm:h-16 sm:w-16">
        <Icon className="h-8 w-8 text-orange-600" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-slate-900 sm:mt-6 sm:text-2xl">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-md leading-6 text-slate-500 sm:leading-7">
        {description}
      </p>

      

    </div>
  );
}