export default function BalanceCard({
  movement,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {movement.concept}
          </h3>

          <p className="text-sm text-slate-500">
            {movement.category}
          </p>
        </div>

        <p
          className={`text-xl font-bold ${
            movement.type === "income"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {movement.type === "income"
            ? "+"
            : "-"}
          {movement.amount.toLocaleString("es-ES")} €
        </p>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {new Date(
          movement.date
        ).toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}