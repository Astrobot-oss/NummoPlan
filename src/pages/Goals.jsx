import { useState } from "react";
import { Plus, Target } from "lucide-react";

import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import PrimaryButton from "../components/PrimaryButton";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

import GoalCard from "../features/goals/GoalCard";
import GoalForm from "../features/goals/GoalForm";
import ContributionModal from "../features/goals/ContributionModal";

import { useGoals } from "../context/GoalContext";

import {
  createGoal,
  updateGoal,
  deleteGoal,
  addContribution,
} from "../domain/goalService";

export default function Goals() {

  const { goals, setGoals } = useGoals();

  const [open, setOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [contributionOpen, setContributionOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);

  function handleCreateGoal(goal) {
    setGoals((prev) =>
      editingGoal
        ? updateGoal(prev, goal)
        : createGoal(prev, goal)
    );

    setEditingGoal(null);
    setOpen(false);
  }

  function handleContribution(amount) {
    setGoals((prev) =>
      addContribution(prev, selectedGoal.id, amount)
    );

    setContributionOpen(false);
    setSelectedGoal(null);
  }

  function handleDeleteGoal() {
    if (!goalToDelete) return;

    setGoals((prev) =>
      deleteGoal(prev, goalToDelete.id)
    );

    setGoalToDelete(null);
  }

  function handleEditGoal(goal) {
    setEditingGoal(goal);
    setOpen(true);
  }

  function handleOpenContribution(goal) {
    setSelectedGoal(goal);
    setContributionOpen(true);
  }

  function handleAskDelete(goalId) {
    const goal = goals.find((g) => g.id === goalId);
    setGoalToDelete(goal);
  }

  function handleOpenNewGoal() {
    setEditingGoal(null);
    setOpen(true);
  }

  function handleCloseGoalModal() {
    setEditingGoal(null);
    setOpen(false);
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        title="Objetivos"
        description="Organiza tus metas financieras y sigue su progreso."
        action={
          <PrimaryButton
            icon={Plus}
            onClick={handleOpenNewGoal}
          >
            Nuevo objetivo
          </PrimaryButton>
        }
      />

      {goals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="Todavía no tienes objetivos"
          description="Empieza creando tu primer objetivo de ahorro, inversión o cualquier meta importante."
          buttonText="Nuevo objetivo"
        />
      ) : (
        <div className="space-y-4 lg:space-y-5">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onAddMoney={handleOpenContribution}
              onDelete={handleAskDelete}
              onEdit={handleEditGoal}
            />
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={handleCloseGoalModal}
      >
        <GoalForm
          goal={editingGoal}
          onSubmit={handleCreateGoal}
        />
      </Modal>

      <ContributionModal
        open={contributionOpen}
        onClose={() => setContributionOpen(false)}
        onSubmit={handleContribution}
      />

      <ConfirmModal
        open={goalToDelete !== null}
        onClose={() => setGoalToDelete(null)}
        onConfirm={handleDeleteGoal}
        title="Eliminar objetivo"
        message={
          goalToDelete
            ? `¿Seguro que quieres eliminar "${goalToDelete.name}"?`
            : ""
        }
      />
    </div>
  );
}
