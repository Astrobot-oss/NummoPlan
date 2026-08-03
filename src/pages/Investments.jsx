import { useState } from "react";
import { Landmark, Plus } from "lucide-react";

import { useInvestments } from "../context/InvestmentContext";

import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import PrimaryButton from "../components/PrimaryButton";
import ConfirmModal from "../components/ConfirmModal";

import InvestmentCard from "../features/investments/InvestmentCard";
import InvestmentForm from "../features/investments/InvestmentForm";
import UpdateValueModal from "../features/investments/UpdateValueModal";
import BuySharesModal from "../features/investments/BuySharesModal";

import {
  createInvestment,
  updateInvestment,
  deleteInvestment,
  updateCurrentValue,
  addContribution,
} from "../domain/investmentService";

export default function Investments() {
  const { investments, setInvestments } = useInvestments();

  const [open, setOpen] = useState(false);

  const [editingInvestment, setEditingInvestment] =
    useState(null);

  const [investmentToDelete, setInvestmentToDelete] =
    useState(null);

  const [updateValueOpen, setUpdateValueOpen] =
    useState(false);

  const [investmentToUpdate, setInvestmentToUpdate] =
    useState(null);

  const [contributionOpen, setContributionOpen] =
    useState(false);

  const [
    investmentToContribute,
    setInvestmentToContribute,
  ] = useState(null);

  function handleCreateInvestment(investment) {
    setInvestments((prev) =>
      editingInvestment
        ? updateInvestment(prev, investment)
        : createInvestment(prev, investment)
    );

    setEditingInvestment(null);
    setOpen(false);
  }

  function handleEditInvestment(investment) {
    setEditingInvestment(investment);
    setOpen(true);
  }

  function handleDeleteInvestment() {
    if (!investmentToDelete) return;

    setInvestments((prev) =>
      deleteInvestment(prev, investmentToDelete.id)
    );

    setInvestmentToDelete(null);
  }

  function handleOpenUpdateValue(investment) {
    setInvestmentToUpdate(investment);
    setUpdateValueOpen(true);
  }

  function handleUpdateCurrentValue(value) {
    setInvestments((prev) =>
      updateCurrentValue(
        prev,
        investmentToUpdate.id,
        value
      )
    );

    setUpdateValueOpen(false);
    setInvestmentToUpdate(null);
  }

  function handleOpenContribution(investment) {
    setInvestmentToContribute(investment);
    setContributionOpen(true);
  }

  function handleContribution(data) {
    setInvestments((prev) =>
      addContribution(
        prev,
        investmentToContribute.id,
        data
      )
    );

    setContributionOpen(false);
    setInvestmentToContribute(null);
  }

  console.log(investments);
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="Patrimonio"
        description="Controla la evolución de tus inversiones."
        action={
          <PrimaryButton
            icon={Plus}
            onClick={() => {
              setEditingInvestment(null);
              setOpen(true);
            }}
          >
            Nueva inversión
          </PrimaryButton>
        }
      />

      {investments.length === 0 ? (
        <EmptyState
          icon={Landmark}
          title="Todavía no tienes inversiones"
          description="Empieza registrando tu primera inversión."
          buttonText="Nueva inversión"
        />
      ) : (
        <div className="space-y-4">
          {investments.map((investment) => (
            <InvestmentCard
              key={investment.id}
              investment={investment}
              onEdit={handleEditInvestment}
              onDelete={() =>
                setInvestmentToDelete(investment)
              }
              onUpdateValue={handleOpenUpdateValue}
              onContribution={handleOpenContribution}
            />
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => {
          setEditingInvestment(null);
          setOpen(false);
        }}
      >
        <InvestmentForm
          investment={editingInvestment}
          onSubmit={handleCreateInvestment}
        />
      </Modal>

      <Modal
        open={updateValueOpen}
        onClose={() => {
          setUpdateValueOpen(false);
          setInvestmentToUpdate(null);
        }}
      >
        <UpdateValueModal
          investment={investmentToUpdate}
          onSubmit={handleUpdateCurrentValue}
        />
      </Modal>

      <Modal
        open={contributionOpen}
        onClose={() => {
          setContributionOpen(false);
          setInvestmentToContribute(null);
        }}
      >
        <BuySharesModal
          investment={investmentToContribute}
          onSubmit={handleContribution}
        />
      </Modal>

      <ConfirmModal
        open={investmentToDelete !== null}
        onClose={() =>
          setInvestmentToDelete(null)
        }
        onConfirm={handleDeleteInvestment}
        title="Eliminar inversión"
        message={
          investmentToDelete
            ? `¿Seguro que quieres eliminar "${investmentToDelete.name}"?`
            : ""
        }
      />
    </div>
  );
}