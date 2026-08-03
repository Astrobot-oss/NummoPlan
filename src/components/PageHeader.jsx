export default function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

      <div>

        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm text-slate-500 md:text-base">
            {description}
          </p>
        )}

      </div>

      {action && (
        <div className="flex flex-wrap gap-3">
          {action}
        </div>
      )}

    </div>
  );
}