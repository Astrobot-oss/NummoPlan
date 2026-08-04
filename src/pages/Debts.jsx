import { useState } from "react";
import { Plus, CreditCard } from "lucide-react";

import { useDebts } from "../context/DebtsContext";

import PageHeader from "../components/PageHeader";
import PrimaryButton from "../components/PrimaryButton";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

import DebtCard from "../features/debts/DebtCard";
import DebtForm from "../features/debts/DebtForm";
import PaymentModal from "../features/debts/PaymentModal";

import {
  createDebt,
  updateDebt,
  deleteDebt,
  addPayment,
} from "../domain/debtService";

export default function Debts() {
  const { debts, setDebts } = useDebts();

  const [open, setOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState(null);

  const [debtToDelete, setDebtToDelete] = useState(null);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [debtToPay, setDebtToPay] = useState(null);

  function handleCreateDebt(debt) {
    setDebts((prev) =>
      editingDebt
        ? updateDebt(prev, debt)
        : createDebt(prev, debt)
    );

    setEditingDebt(null);
    setOpen(false);
  }

  function handleEditDebt(debt) {
    setEditingDebt(debt);
    setOpen(true);
  }

  function handleDeleteDebt() {
    if (!debtToDelete) return;

    setDebts((prev) =>
      deleteDebt(prev, debtToDelete.id)
    );

    setDebtToDelete(null);
  }

  function handleOpenPayment(debt) {
    setDebtToPay(debt);
    setPaymentOpen(true);
  }

  function handlePayment(paymentData) {
    setDebts((prev) =>
      addPayment(
        prev,
        debtToPay.id,
        paymentData
      )
    );

    setPaymentOpen(false);
    setDebtToPay(null);
  }

  function handleOpenCreateDebt() {
  setEditingDebt(null);
  setOpen(true);
}

  return (
    <div className="space-y-8">
      <PageHeader
        title="Deudas"
        description="Controla el pago de tus préstamos y obligaciones."
        action={
          <PrimaryButton
            icon={Plus}
            onClick={handleOpenCreateDebt}
          >
            Nueva deuda
          </PrimaryButton>
        }
      />

      {debts.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="Todavía no tienes deudas"
          description="Empieza registrando tu primera deuda."
          buttonText="Nueva deuda"
          onClick={handleOpenCreateDebt}
        />
      ) : (
        <div className="space-y-3 sm:space-y-4">

          {debts.map((debt) => (
            <DebtCard
              key={debt.id}
              debt={debt}
              onEdit={handleEditDebt}
              onDelete={() => setDebtToDelete(debt)}
              onPayment={handleOpenPayment}
            />
          ))}

        </div>
      )}

      <Modal
        open={open}
        onClose={() => {
          setEditingDebt(null);
          setOpen(false);
        }}
      >
        <DebtForm
          debt={editingDebt}
          onSubmit={handleCreateDebt}
        />
      </Modal>

      <Modal
        open={paymentOpen}
        onClose={() => {
          setPaymentOpen(false);
          setDebtToPay(null);
        }}
      >
        <PaymentModal
          debt={debtToPay}
          onSubmit={handlePayment}
        />
      </Modal>

      <ConfirmModal
        open={debtToDelete !== null}
        onClose={() => setDebtToDelete(null)}
        onConfirm={handleDeleteDebt}
        title="Eliminar deuda"
        message={
          debtToDelete
            ? `¿Seguro que quieres eliminar "${debtToDelete.name}"?`
            : ""
        }
      />

    </div>
  );
}