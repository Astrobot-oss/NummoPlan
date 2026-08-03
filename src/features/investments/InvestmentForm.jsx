import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export default function InvestmentForm({
  investment,
  onSubmit,
}) {

const [name, setName] = useState(investment?.name || "");
const [type, setType] = useState(investment?.type || "");
const [broker, setBroker] = useState(investment?.broker || "");
const [investedAmount, setInvestedAmount] = useState("");
const [purchasePrice, setPurchasePrice] = useState("");

 function handleSubmit() {
  const shares =
    Number(investedAmount) / Number(purchasePrice);

  onSubmit({
  id: investment?.id ?? crypto.randomUUID(),

  name,
  type,
  broker,

  shares,

  purchasePrice: Number(purchasePrice),

  currentPrice: Number(purchasePrice),

  lastUpdate: new Date().toISOString(),

  movements: [
    {
      id: crypto.randomUUID(),

      type: "buy",

      amount: Number(investedAmount),

      shares,

      price: Number(purchasePrice),

      date: new Date().toISOString(),
    },
  ],

  history: [
    {
      date: new Date().toISOString().split("T")[0],

      price: Number(purchasePrice),
    },
  ],
});
}
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">
        {investment ? "Editar inversión" : "Nueva inversión"}
      </h2>

<input
  placeholder="Nombre"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full rounded-xl border p-3"
/>

     <input
  type="number"
  placeholder="Dinero invertido (€)"
  value={investedAmount}
  onChange={(e) => setInvestedAmount(e.target.value)}
  className="w-full rounded-xl border p-3"
/>

<input
  type="number"
  placeholder="Precio de la participación (€)"
  value={purchasePrice}
  onChange={(e) => setPurchasePrice(e.target.value)}
  className="w-full rounded-xl border p-3"
/>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full rounded-xl border p-3"
      >
        <option value="">Tipo</option>
        <option>ETF</option>
        <option>Acción</option>
        <option>Fondo</option>
        <option>Cripto</option>
        <option>Cuenta remunerada</option>
        <option>Depósito</option>
      </select>

      <input
        placeholder="Broker"
        value={broker}
        onChange={(e) => setBroker(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

      <PrimaryButton onClick={handleSubmit}>
        {investment ? "Guardar cambios" : "Crear inversión"}
      </PrimaryButton>
    </div>
  );
}