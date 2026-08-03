import { Plus } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

export default function EmptyState({
  icon,
  title,
  description,
  buttonText,
}) {
  const Icon = icon;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
        <Icon className="h-8 w-8 text-orange-600" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-3 text-slate-500 max-w-md mx-auto leading-7">
        {description}
      </p>

      

    </div>
  );
}