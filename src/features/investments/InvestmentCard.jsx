import ClickableCardHeader from "../../components/ClickableCardHeader";
import ActionMenu from "../../components/ActionMenu";
import { getInvestmentStats } from "../../domain/investmentCalculations";

export default function InvestmentCard({
  investment,
  onUpdateValue,
  onContribution,
  onEdit,
  onDelete,
}) {
  const {
  totalShares,
  totalInvested,
  averagePrice,
  currentValue,
} = getInvestmentStats(investment);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <ClickableCardHeader to={`/inversiones/${investment.id}`}>

        <div>

          <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-orange-500">
            {investment.name}
          </h3>

          <p className="text-slate-500">
            {investment.type}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            {investment.broker}
          </p>

        </div>

        <div className="flex items-start gap-3">

          <div className="text-right">

            <p className="text-xl font-bold">
              {currentValue.toLocaleString("es-ES")} €
            </p>

          </div>

          <ActionMenu
            items={[
              {
                label: "Editar",
                onClick: () => onEdit(investment),
              },
              {
                label: "Eliminar",
                danger: true,
                onClick: () => onDelete(investment.id),
              },
            ]}
          />

        </div>

      </ClickableCardHeader>

      <div className="mt-5 space-y-2 text-sm text-slate-500">

        <p>
          Invertido{" "}
          <span className="font-medium text-slate-700">
            {totalInvested.toLocaleString("es-ES")} €
          </span>
        </p>

        <p>
          Participaciones{" "}
          <span className="font-medium text-slate-700">
            {totalShares.toLocaleString("es-ES", {
              maximumFractionDigits: 4,
            })}
          </span>
        </p>

        <p>
          Precio medio{" "}
          <span className="font-medium text-slate-700">
            {averagePrice.toLocaleString("es-ES")} €
          </span>
        </p>

        <p>
          Precio actual{" "}
          <span className="font-medium text-slate-700">
            {investment.currentPrice.toLocaleString("es-ES")} €
          </span>
        </p>

        <p>
          Última actualización{" "}
          <span className="font-medium text-slate-700">
            {new Date(investment.lastUpdate).toLocaleDateString("es-ES")}
          </span>
        </p>

      </div>

      <div className="mt-6 flex flex-col gap-2">

        <button
          onClick={() => onUpdateValue(investment)}
          className="w-full rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          Actualizar valor
        </button>

        <button
          onClick={() => onContribution(investment)}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Añadir aportación
        </button>

      </div>

    </div>
  );
}