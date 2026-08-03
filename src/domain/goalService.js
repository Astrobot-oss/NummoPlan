export function createGoal(goals, goal) {
  return [...goals, goal];
}

export function updateGoal(goals, updatedGoal) {
  return goals.map((goal) =>
    goal.id === updatedGoal.id ? updatedGoal : goal
  );
}

export function deleteGoal(goals, goalId) {
  return goals.filter((goal) => goal.id !== goalId);
}

export function addContribution(goals, goalId, amount) {
  return goals.map((goal) => {
    if (goal.id !== goalId) return goal;

    return {
      ...goal,
      movements: [
        ...goal.movements,
        {
  id: Date.now(),
  type: "deposit",
  amount,
  date: new Date().toISOString(),
}
      ],
    };
  });
}