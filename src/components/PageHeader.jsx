export default function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
          {action}
        </div>
      )}
    </div>
  );
}