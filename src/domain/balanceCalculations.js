export function getBalanceStats(balance) {
  const movements = balance.movements || [];

  const incomes = movements.filter(
    (movement) => movement.type === "income"
  );

  const expenses = movements.filter(
    (movement) => movement.type === "expense"
  );

  const totalIncome = incomes.reduce(
    (total, movement) => total + movement.amount,
    0
  );

  const totalExpenses = expenses.reduce(
    (total, movement) => total + movement.amount,
    0
  );

  const savings = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0
      ? (savings / totalIncome) * 100
      : 0;

  return {
    totalIncome,
    totalExpenses,
    savings,
    savingsRate,
  };
}

export function getAvailableToInvest(balance) {
  const { savings } = getBalanceStats(balance);

  return Math.max(0, savings);
}

export function getIncomeByCategory(balance) {
  const result = {};

  balance.movements
    .filter((movement) => movement.type === "income")
    .forEach((movement) => {
      result[movement.category] =
        (result[movement.category] || 0) +
        movement.amount;
    });

  return result;
}

export function getExpenseByCategory(balance) {
  const result = {};

  balance.movements
    .filter((movement) => movement.type === "expense")
    .forEach((movement) => {
      result[movement.category] =
        (result[movement.category] || 0) +
        movement.amount;
    });

  return result;
}

export function getLargestExpenseCategory(balance) {
  const categories =
    getExpenseByCategory(balance);

  let category = null;
  let amount = 0;

  Object.entries(categories).forEach(
    ([key, value]) => {
      if (value > amount) {
        category = key;
        amount = value;
      }
    }
  );

  return {
    category,
    amount,
  };
}

export function getMonthlyStats(
  balance,
  year,
  month
) {
  const movements = getMovementsByMonth(
    balance,
    year,
    month
  );

  return getBalanceStats({
    ...balance,
    movements,
  });
}

export function getRecentMovements(
  balance,
  limit = 5
) {
  return [...balance.movements]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, limit);
}

export function getRecurringIncomeTotal(balance) {
  return balance.recurringIncome.reduce(
    (total, income) => total + income.amount,
    0
  );
}

export function getNetWorth(balance) {
  const {
    totalIncome,
    totalExpenses,
  } = getBalanceStats(balance);

  return totalIncome - totalExpenses;
}

export function getBalanceSummary(balance = { movements: [], recurringIncome: [] }) {
  const stats = getBalanceStats(balance);
  const availableToInvest = getAvailableToInvest(balance);

  return {
    totalIncome: stats.totalIncome,
    totalExpenses: stats.totalExpenses,
    savings: stats.savings,
    savingsRate: stats.savingsRate,
    availableToInvest,
  };
}
  
export function getExpensesByCategory(movements = []) {
  // Filtramos solo los gastos
  const expenses = movements.filter((m) => m.type === "expense" || m.amount < 0);
  
  const categories = {};
  let totalExpenses = 0;

  expenses.forEach((item) => {
    const category = item.category || "Otros";
    const amount = Math.abs(item.amount);
    
    totalExpenses += amount;
    if (!categories[category]) {
      categories[category] = 0;
    }
    categories[category] += amount;
  });

  // Convertimos a array y ordenamos de mayor a menor gasto
  const result = Object.keys(categories).map((cat) => ({
    category: cat,
    amount: categories[cat],
    percentage: totalExpenses > 0 ? ((categories[cat] / totalExpenses) * 100).toFixed(1) : 0,
  })).sort((a, b) => b.amount - a.amount);

  return { result, totalExpenses };
}

export function getMovementsByMonth(balance, year, month) {
  const movements = balance.movements || [];
  const recurringIncome = balance.recurringIncome || [];
  const recurringExpense = balance.recurringExpense || [];

  // 1. Filtrar movimientos manuales del mes y año especificados
  const manualMovements = movements.filter((movement) => {
    const date = new Date(movement.date);
    return date.getFullYear() === year && date.getMonth() === month;
  });

  const now = new Date();
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month;
  const currentDay = isCurrentMonth ? now.getDate() : 31; // Si es un mes pasado, se asume completo

  const automaticMovements = [];

  const processRecurrent = (list, type) => {
    list.forEach((item) => {
      const day = item.day || 1;
      let shouldAdd = false;
      let multiplier = 1; // Para pagas extraordinarias o multiplicadores de frecuencia

      // Si se especifica que es una paga extraordinaria, multiplicamos por 2 el importe
      if (item.isExtraPay || item.extraPay) {
        multiplier = 2;
      }

      switch (item.frequency) {
        case "monthly":
          shouldAdd = currentDay >= day;
          break;

        case "biweekly": // Quincenal (aprox. cada 14-15 días)
          // Comprobamos cuántas quincenas han pasado en el mes actual respecto al día de inicio
          if (currentDay >= day) {
            shouldAdd = true;
            // Si el mes es largo y da tiempo a una segunda quincena (ej: día 1 y día 15/16)
            if (currentDay >= day + 14) {
              multiplier *= 2; // O se pueden inyectar dos movimientos separados si se prefiere
            }
          }
          break;

        case "trimestral": // Cada 3 meses
        case "quarterly":
          // Comprobamos si el mes actual toca según el mes de inicio del recurrente
          {
            const startMonth = item.startMonth !== undefined ? item.startMonth : (item.month || 0); // 0 a 11
            const monthDiff = (year * 12 + month) - (year * 12 + startMonth); // Simplificado o ajustado por meses absolutos
            // Si la diferencia de meses es múltiplo de 3 y ya ha llegado el día
            if (monthDiff >= 0 && monthDiff % 3 === 0 && currentDay >= day) {
              shouldAdd = true;
            }
          }
          break;

        case "yearly":
        case "annual":
          // Se aplica si el mes actual coincide con el mes configurado (ej: item.month = 11 para diciembre)
          {
            const targetMonth = item.month !== undefined ? item.month : 0; // 0 a 11
            if (month === targetMonth && currentDay >= day) {
              shouldAdd = true;
            }
          }
          break;

        default:
          shouldAdd = currentDay >= day;
          break;
      }

      if (shouldAdd) {
        automaticMovements.push({
          type: type,
          amount: Number(item.amount) * multiplier,
          category: item.category || (type === "income" ? "Ingreso recurrente" : "Gasto recurrente"),
          date: new Date(year, month, day).toISOString(),
        });
      }
    });
  };

  processRecurrent(recurringIncome, "income");
  processRecurrent(recurringExpense, "expense");

  return [...manualMovements, ...automaticMovements];
}

export function getHistoricalStats(balance, numberOfMonths = 6) {
  const history = [];
  const now = new Date();

  for (let i = numberOfMonths - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth();

    // Obtenemos las estadísticas reales del mes usando tu motor actual
    const stats = getMonthlyStats(balance, year, month);

    // Opcional: Si guardas metas mensuales personalizadas, puedes buscarlas aquí. 
    // Si no, puedes pasar una meta por defecto o la que estuviera activa.
    const targetSavings = balance?.monthlyTargets?.[`${year}-${month}`] ?? balance?.defaultTargetSavings ?? 300;

    history.push({
      year,
      month,
      monthName: d.toLocaleString('es-ES', { month: 'short' }), // Ej: "ene", "feb"
      ...stats,
      targetSavings,
    });
  }

  return history;
}