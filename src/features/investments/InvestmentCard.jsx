import ClickableCardHeader from "../../components/ClickableCardHeader";
import ActionMenu from "../../components/ActionMenu";
import { getInvestmentStats } from "../../domain/investmentCalculations";
import PrimaryButton from "../../components/PrimaryButton";

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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

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

        <div className="ml-3 flex items-start gap-2 sm:gap-3">

          <div className="text-right">

            <p className="text-lg font-bold sm:text-xl">
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

      <div className="mt-5 space-y-3 text-sm">

  <div className="flex items-center justify-between gap-4">
    <span className="text-slate-500">Invertido</span>
    <span className="break-words text-right font-medium text-slate-700">
      {totalInvested.toLocaleString("es-ES")} €
    </span>
  </div>

  <div className="flex items-center justify-between gap-4">
    <span className="text-slate-500">Participaciones</span>
    <span className="break-words text-right font-medium text-slate-700">
      {totalShares.toLocaleString("es-ES", {
        maximumFractionDigits: 4,
      })}
    </span>
  </div>

  <div className="flex items-center justify-between gap-4">
    <span className="text-slate-500">Precio medio</span>
    <span className="break-words text-right font-medium text-slate-700">
      {averagePrice.toLocaleString("es-ES")} €
    </span>
  </div>

  <div className="flex items-center justify-between gap-4">
    <span className="text-slate-500">Precio actual</span>
    <span className="break-words text-right font-medium text-slate-700">
      {investment.currentPrice.toLocaleString("es-ES")} €
    </span>
  </div>

  <div className="flex items-center justify-between gap-4">
    <span className="text-slate-500">Actualizado</span>
    <span className="break-words text-right font-medium text-slate-700">
      {new Date(investment.lastUpdate).toLocaleDateString("es-ES")}
    </span>
  </div>

</div>

      <div className="mt-6 flex flex-col gap-3">

        <PrimaryButton onClick={() => onUpdateValue(investment)}>
  Actualizar valor
</PrimaryButton>

<PrimaryButton
  onClick={() => onContribution(investment)}
  className="bg-slate-900 hover:bg-slate-800"
>
  Añadir aportación
</PrimaryButton>

      </div>

    </div>
  );
}