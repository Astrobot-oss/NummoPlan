import {
  getMonthlyStats,
  getExpensesByCategory,
  getMovementsByMonth,
} from "./balanceCalculations";

export function generateMonthlyInsights(
  balance,
  targetSavings = 300,
  year = null,
  month = null
) {
  const insights = [];

  const now = new Date();

  // Si no se indica un mes concreto,
  // utilizamos el mes actual.
  const selectedYear =
    year !== null ? Number(year) : now.getFullYear();

  const selectedMonth =
    month !== null ? Number(month) : now.getMonth();

  // --------------------------------------------------
  // ESTADÍSTICAS DEL MES
  // --------------------------------------------------

  const monthlyStats = getMonthlyStats(
    balance,
    selectedYear,
    selectedMonth
  );

  const {
    totalIncome,
    totalExpenses,
    savings,
  } = monthlyStats;

  // --------------------------------------------------
  // MOVIMIENTOS DEL MES
  // Incluye movimientos manuales + recurrentes
  // --------------------------------------------------

  const currentMonthMovements =
    getMovementsByMonth(
      balance,
      selectedYear,
      selectedMonth
    );

  // --------------------------------------------------
  // GASTOS POR CATEGORÍA
  // --------------------------------------------------

  const {
    result: categoryList,
    totalExpenses: totalVariableSpent,
  } = getExpensesByCategory(
    currentMonthMovements
  );

  const topCategoryData =
    categoryList.length > 0
      ? categoryList[0]
      : null;

  const topCategory =
    topCategoryData
      ? topCategoryData.category
      : null;

  const maxCategorySpent =
    topCategoryData
      ? topCategoryData.amount
      : 0;

  const differenceFromTarget =
    savings - targetSavings;

  // --------------------------------------------------
  // INSIGHTS GLOBALES DE AHORRO
  // --------------------------------------------------

  if (totalIncome > 0 || totalExpenses > 0) {
    if (differenceFromTarget > 50) {
      insights.push({
        type: "success",
        title: "¡Excelente ritmo de ahorro!",
        description:
          "Has superado tu meta mensual. Tienes margen para darte un capricho o, si prefieres blindar tu futuro, subir tu listón de ahorro.",
      });
    } else if (
      differenceFromTarget >= 0 &&
      differenceFromTarget <= 50
    ) {
      insights.push({
        type: "success",
        title: "Vas por buen camino",
        description: `Estás cumpliendo tu objetivo de ahorro de ${targetSavings} € de forma ajustada este mes. Mantén el ritmo actual en los próximos días para asegurarlo.`,
      });
    } else if (
      savings >= 0 &&
      differenceFromTarget < 0
    ) {
      insights.push({
        type: "warning",
        title: "Mes ajustado",
        description: `Tus gastos están muy cerca de tus ingresos y te quedan ${Math.abs(
          differenceFromTarget
        ).toFixed(
          2
        )} € para alcanzar la meta de ahorro. Conviene vigilar los pequeños gastos.`,
      });
    } else {
      insights.push({
        type: "error",
        title: "Alerta de déficit",
        description:
          "Tus gastos superan los ingresos este mes por un margen crítico. Es momento de congelar compras no esenciales y enfocar el foco en la contención.",
      });
    }
  }

  // --------------------------------------------------
  // INSIGHTS DE CATEGORÍAS
  // --------------------------------------------------

  if (
    topCategory &&
    maxCategorySpent > 0
  ) {
    const percentageOfTotal =
      totalVariableSpent > 0
        ? (
            (maxCategorySpent /
              totalVariableSpent) *
            100
          ).toFixed(0)
        : 0;

    const isGlobalSavingsBad =
      savings < 0 ||
      differenceFromTarget < 0;

    if (isGlobalSavingsBad) {
      insights.push({
        type: "neutral",
        title: `Mayor peso en ${topCategory}`,
        description: `La categoría que más recursos está absorbiendo este mes es ${topCategory} con ${maxCategorySpent.toFixed(
          2
        )} € (${percentageOfTotal}% de tus gastos). Revisar esta partida te dará mayor margen.`,
      });
    } else {
      insights.push({
        type: "success",
        title: "Distribución equilibrada",
        description: `Tu mayor gasto actual se concentra en ${topCategory} (${maxCategorySpent.toFixed(
          2
        )} €), manteniéndose dentro de un equilibrio saludable con tus ingresos.`,
      });
    }
  }

  // --------------------------------------------------
  // SIN DATOS
  // --------------------------------------------------

  if (insights.length === 0) {
    insights.push({
      type: "neutral",
      title: "Presupuesto listo",
      description:
        "Empieza a registrar tus movimientos y categorías para ver tu margen disponible en tiempo real.",
    });
  }

  return insights;
}