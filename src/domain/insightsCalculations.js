export function generateMonthlyInsights(balance, targetSavings = 300) {
  const insights = [];
  const movements = balance?.movements ?? [];
  const recurringIncome = balance?.recurringIncome ?? [];
  const recurringExpense = balance?.recurringExpense ?? [];

  const totalMonthlyIncome = recurringIncome.reduce((acc, inc) => {
    if (inc.frequency === "monthly") return acc + Number(inc.amount || 0);
    if (inc.frequency === "biweekly") return acc + (Number(inc.amount || 0) * 2);
    return acc;
  }, 0);

  const totalMonthlyExpense = recurringExpense.reduce((acc, exp) => {
    if (exp.frequency === "monthly") return acc + Number(exp.amount || 0);
    if (exp.frequency === "biweekly") return acc + (Number(exp.amount || 0) * 2);
    return acc;
  }, 0);

  const now = new Date();
  const currentMonthMovements = movements.filter(m => {
    const movementDate = new Date(m.date);
    return movementDate.getMonth() === now.getMonth() && movementDate.getFullYear() === now.getFullYear();
  });

  const totalVariableSpent = currentMonthMovements
    .filter(m => m.type === "expense")
    .reduce((acc, m) => acc + Number(m.amount || 0), 0);

  const categoryTotals = currentMonthMovements
    .filter(m => m.type === "expense")
    .reduce((acc, m) => {
      const cat = m.category || "Otros";
      acc[cat] = (acc[cat] || 0) + Number(m.amount || 0);
      return acc;
    }, {});

  const ocioSpent = categoryTotals["Ocio"] || categoryTotals["ocio"] || 0;
  const ocioBudgetLimit = 150; 

  if (ocioSpent > 0) {
    if (ocioSpent <= ocioBudgetLimit) {
      const availableForLeisure = ocioBudgetLimit - ocioSpent;
      insights.push({
        type: "success",
        title: "¡Buen control en Ocio!",
        description: `Llevas gastados ${ocioSpent.toFixed(2)} € en ocio este mes. Todavía te quedan ${availableForLeisure.toFixed(2)} € disponibles de tu margen previsto para disfrutar sin salirte de lo planificado.`,
      });
    } else {
      const exceeded = ocioSpent - ocioBudgetLimit;
      insights.push({
        type: "warning",
        title: "Aviso en categoría Ocio",
        description: `Has superado en ${exceeded.toFixed(2)} € el límite previsto para ocio este mes (${ocioSpent.toFixed(2)} € gastados). Conviene moderar los próximos días.`,
      });
    }
  }

  if (totalMonthlyIncome > 0) {
    const currentEstimatedSavings = (totalMonthlyIncome - totalMonthlyExpense) - totalVariableSpent;
    const differenceFromTarget = currentEstimatedSavings - targetSavings;

    if (differenceFromTarget >= 0) {
      insights.push({
        type: "success",
        title: "Vas bien con tu objetivo de ahorro",
        description: `Estás cumpliendo tu meta de ahorrar ${targetSavings} € este mes. De hecho, vas ${differenceFromTarget.toFixed(2)} € por encima de lo estimado gracias a tus movimientos actuales.`,
      });
    } else {
      insights.push({
        type: "warning",
        title: "Meta de ahorro ajustada",
        description: `Te faltan ${Math.abs(differenceFromTarget).toFixed(2)} € para alcanzar tu objetivo de ahorro de ${targetSavings} € este mes debido a los gastos registrados.`,
      });
    }
  }

  if (insights.length === 0) {
    insights.push({
      type: "neutral",
      title: "Presupuesto listo",
      description: "Empieza a registrar tus movimientos y categorías para ver tu margen disponible en tiempo real.",
    });
  }

  return insights;
}