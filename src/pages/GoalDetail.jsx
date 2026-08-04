import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useGoals } from "../context/GoalContext";
import { useState } from "react";
import ContributionModal from "../features/goals/ContributionModal";
import { addContribution } from "../domain/goalService";  

import GoalSummaryCard from "../features/goals/GoalSummaryCard";
import GoalInfoCard from "../features/goals/GoalInfoCard";
import GoalHistoryCard from "../features/goals/GoalHistoryCard";
import GoalProgressCard from "../features/goals/GoalProgressCard";

export default function GoalDetail() {
  const [contributionOpen, setContributionOpen] =
  useState(false);
  const { id } = useParams();
  const { goals, setGoals } = useGoals();
  const goal = goals.find(
    (g) => g.id === Number(id)
  );

  if (!goal) {
    return (
      <div className="p-8">
        Objetivo no encontrado.
      </div>
    );
  }

  const savedAmount = goal.movements.reduce(
    (total, movement) => total + movement.amount,
    0
  );

  const remainingAmount = Math.max(
    goal.targetAmount - savedAmount,
    0
  );

  const progress =
    goal.targetAmount > 0
      ? Math.min(
          (savedAmount / goal.targetAmount) * 100,
          100
        )
      : 0;

  const completed =
    savedAmount >= goal.targetAmount;
    function handleContribution(amount) {
  setGoals((prev) =>
    addContribution(prev, goal.id, amount)
  );

  setContributionOpen(false);
}

  return (
  <div className="space-y-6 lg:space-y-8">

    <PageHeader
      title={goal.name}
      description="Consulta el progreso de tu objetivo."  
    />

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

      <GoalProgressCard
        progress={progress}
        completed={completed}
        onContribution={() => setContributionOpen(true)}
      />

      <div className="space-y-6 xl:col-span-1">

        <GoalSummaryCard
          goal={goal}
          savedAmount={savedAmount}
          remainingAmount={remainingAmount}
          progress={progress}
          completed={completed}
        />

        <GoalInfoCard
          goal={goal}
          savedAmount={savedAmount}
        />

        <GoalHistoryCard
          goal={goal}
        />

      </div>

      <ContributionModal
        open={contributionOpen}
        onClose={() => setContributionOpen(false)}
        onSubmit={handleContribution}
      />

    </div>

  </div>
);
}