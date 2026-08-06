import PrimaryButton from "../../components/PrimaryButton";

export default function MovementForm() {
  return (
    <form className="space-y-5">

      <div>

        <h2 className="text-xl font-bold sm:text-2xl">
          Nuevo movimiento
        </h2>

        <p className="text-slate-500">
          Registra un ingreso o un gasto.
        </p>

      </div>

      <PrimaryButton type="submit">
        Guardar movimiento
      </PrimaryButton>

    </form>
  );
}