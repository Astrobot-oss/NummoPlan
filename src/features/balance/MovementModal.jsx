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
  movement = null,
  onSubmit,
}) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Alimentación");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (movement) {
      const movementType =
        movement.type === "income" ? "income" : "expense";

      setType(movementType);
      setCategory(
        movement.category || categories[movementType][0]
      );
      setAmount(
        movement.amount !== undefined
          ? String(movement.amount)
          : ""
      );
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

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return;
    }

    onSubmit({
      id: movement?.id ?? crypto.randomUUID(),
      type,
      category,
      amount: numericAmount,
      description: description.trim(),
      date: movement?.date ?? new Date().toISOString(),
    });
  }

  return (
    <MovementForm
      type={type}
      category={category}
      amount={amount}
      description={description}
      categories={categories[type]}
      isEditing={Boolean(movement)}
      onTypeChange={handleTypeChange}
      onCategoryChange={setCategory}
      onAmountChange={setAmount}
      onDescriptionChange={setDescription}
      onSubmit={handleSubmit}
    />
  );
}