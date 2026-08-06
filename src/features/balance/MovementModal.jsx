import { useEffect, useState } from "react";
import MovementForm from "./MovementForm";

const categories = {
  income: [
    "Salario",
    "Paga extra",
    "Dividendos",
    "Alquiler",
    "Venta",
    "Regalo",
    "Otros",
  ],
  expense: [
    "Vivienda",
    "Alimentación",
    "Transporte",
    "Ocio",
    "Restaurantes",
    "Compras",
    "Salud",
    "Mascotas",
    "Suscripciones",
    "Impuestos",
    "Otros",
  ],
};

export default function MovementModal({
  movement,
  onSubmit,
}) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Alimentación");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
  if (movement) {
    setType(movement.type);
    setCategory(movement.category);
    setAmount(movement.amount);
    setDescription(movement.description || "");
    return;
  }

  setType("expense");
  setCategory("Alimentación");
  setAmount("");
  setDescription("");
}, [movement]);

  function handleTypeChange(newType) {
    setType(newType);
    setCategory(categories[newType][0]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
  id: movement?.id ?? Date.now(),
  type,
  category,
  amount: Number(amount),
  description,
  date: movement?.date ?? new Date().toISOString(),
});
  }

  return (
    <MovementForm
      type={type}
      category={category}
      amount={amount}
      description={description}
      onTypeChange={handleTypeChange}
      onCategoryChange={setCategory}
      onAmountChange={setAmount}
      onDescriptionChange={setDescription}
      onSubmit={handleSubmit}
    />
  );
}