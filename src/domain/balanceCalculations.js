// ============================================================
// BALANCE CALCULATIONS
// ============================================================

// ------------------------------------------------------------
// ESTADÍSTICAS GENERALES
// ------------------------------------------------------------

export function getBalanceStats(balance = {}) {
  const movements = balance?.movements || [];

  const totalIncome = movements
    .filter((movement) => movement.type === "income")
    .reduce(
      (total, movement) => total + Number(movement.amount || 0),
      0
    );

  const totalExpenses = movements
    .filter((movement) => movement.type === "expense")
    .reduce(
      (total, movement) => total + Number(movement.amount || 0),
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

// ------------------------------------------------------------
// RESUMEN DEL BALANCE
// ------------------------------------------------------------

export function getBalanceSummary(balance = {}) {
  const stats = getBalanceStats(balance);

  return {
    totalIncome: stats.totalIncome,
    totalExpenses: stats.totalExpenses,
    savings: stats.savings,
    savingsRate: stats.savingsRate,
    availableToInvest: getAvailableToInvest(balance),
  };
}

// ------------------------------------------------------------
// DINERO DISPONIBLE PARA INVERTIR
// ------------------------------------------------------------

export function getAvailableToInvest(balance = {}) {
  const { savings } = getBalanceStats(balance);

  return Math.max(0, savings);
}

// ------------------------------------------------------------
// PATRIMONIO / BALANCE NETO
// ------------------------------------------------------------

export function getNetWorth(balance = {}) {
  const { totalIncome, totalExpenses } =
    getBalanceStats(balance);

  return totalIncome - totalExpenses;
}

// ------------------------------------------------------------
// INGRESOS POR CATEGORÍA
// ------------------------------------------------------------

export function getIncomeByCategory(balance = {}) {
  const result = {};

  (balance?.movements || [])
    .filter((movement) => movement.type === "income")
    .forEach((movement) => {
      const category = movement.category || "Otros";

      result[category] =
        (result[category] || 0) +
        Number(movement.amount || 0);
    });

  return result;
}

// ------------------------------------------------------------
// GASTOS POR CATEGORÍA
// ------------------------------------------------------------

export function getExpenseByCategory(balance = {}) {
  const result = {};

  (balance?.movements || [])
    .filter((movement) => movement.type === "expense")
    .forEach((movement) => {
      const category = movement.category || "Otros";

      result[category] =
        (result[category] || 0) +
        Number(movement.amount || 0);
    });

  return result;
}

// ------------------------------------------------------------
// GASTOS POR CATEGORÍA - FORMATO PARA GRÁFICAS
// ------------------------------------------------------------

export function getExpensesByCategory(movements = []) {
  const categories = {};
  let totalExpenses = 0;

  movements
    .filter((movement) => movement.type === "expense")
    .forEach((movement) => {
      const category = movement.category || "Otros";
      const amount = Math.abs(
        Number(movement.amount || 0)
      );

      totalExpenses += amount;

      categories[category] =
        (categories[category] || 0) + amount;
    });

  const result = Object.entries(categories)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage:
        totalExpenses > 0
          ? Number(
              ((amount / totalExpenses) * 100).toFixed(1)
            )
          : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  return {
    result,
    totalExpenses,
  };
}

// ------------------------------------------------------------
// MAYOR CATEGORÍA DE GASTO
// ------------------------------------------------------------

export function getLargestExpenseCategory(balance = {}) {
  const categories = getExpenseByCategory(balance);

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

// ------------------------------------------------------------
// MOVIMIENTOS RECIENTES
// ------------------------------------------------------------

export function getRecentMovements(
  balance = {},
  limit = 5
) {
  return [...(balance?.movements || [])]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, limit);
}

// ------------------------------------------------------------
// TOTAL INGRESOS RECURRENTES
// ------------------------------------------------------------

export function getRecurringIncomeTotal(balance = {}) {
  return (balance?.recurringIncome || []).reduce(
    (total, income) =>
      total + Number(income.amount || 0),
    0
  );
}

// ============================================================
// MOVIMIENTOS DE UN MES
// ============================================================

export function getMovementsByMonth(
  balance = {},
  year,
  month
) {
  const movements = balance?.movements || [];
  const recurringIncome =
    balance?.recurringIncome || [];
  const recurringExpense =
    balance?.recurringExpense || [];

  // ----------------------------------------------------------
  // 1. MOVIMIENTOS MANUALES
  // ----------------------------------------------------------

  const manualMovements = movements.filter(
    (movement) => {
      if (!movement.date) {
        return false;
      }

      const date = new Date(movement.date);

      return (
        date.getFullYear() === year &&
        date.getMonth() === month
      );
    }
  );

  // ----------------------------------------------------------
  // 2. DÍA HASTA EL QUE CONTABILIZAMOS
  // ----------------------------------------------------------

  const now = new Date();

  const isCurrentMonth =
    now.getFullYear() === year &&
    now.getMonth() === month;

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const currentDay = isCurrentMonth
    ? now.getDate()
    : daysInMonth;

  const automaticMovements = [];

  // ----------------------------------------------------------
  // 3. CREAR MOVIMIENTO RECURRENTE
  // ----------------------------------------------------------

  function addAutomaticMovement({
    item,
    type,
    day,
    amount,
    extraPay = false,
  }) {
    const numericDay = Number(day);

    if (!numericDay || numericDay < 1) {
      return;
    }

    // En el mes actual todavía no contamos
    // movimientos cuya fecha no ha llegado.
    if (currentDay < numericDay) {
      return;
    }

    const safeDay = Math.min(
      numericDay,
      daysInMonth
    );

    automaticMovements.push({
      id: [
        "recurring",
        type,
        item.id,
        year,
        month,
        safeDay,
        extraPay ? "extra" : "normal",
      ].join("-"),

      type,

      amount: Number(amount || 0),

      category:
        item.category ||
        (type === "income"
          ? "Ingreso recurrente"
          : "Gasto recurrente"),

      title: item.title || "",

      description:
        item.description ||
        item.title ||
        "",

      date: new Date(
        year,
        month,
        safeDay
      ).toISOString(),

      recurring: true,
      recurringId: item.id,
      extraPay,
    });
  }

  // ==========================================================
  // 4. INGRESOS RECURRENTES
  // ==========================================================

  recurringIncome.forEach((item) => {
    const amount = Number(item.amount || 0);
    const frequency =
      item.frequency || "monthly";

    // --------------------------------------------------------
    // MENSUAL
    // --------------------------------------------------------

    if (frequency === "monthly") {
      addAutomaticMovement({
        item,
        type: "income",
        day: Number(item.day || 1),
        amount,
      });

      // PAGA EXTRA
      if (
        item.hasExtraPay &&
        Array.isArray(item.extraPayMonths)
      ) {
        const currentMonthNumber =
          String(month + 1);

        if (
          item.extraPayMonths.includes(
            currentMonthNumber
          )
        ) {
          addAutomaticMovement({
            item,
            type: "income",
            day: Number(item.day || 1),
            amount,
            extraPay: true,
          });
        }
      }

      return;
    }

    // --------------------------------------------------------
    // QUINCENAL
    // --------------------------------------------------------

    if (frequency === "biweekly") {
      const firstDay = Number(
        item.day || 1
      );

      const secondDay = Number(
        item.secondDay || firstDay + 14
      );

      if (currentDay >= firstDay) {
        addAutomaticMovement({
          item,
          type: "income",
          day: firstDay,
          amount,
        });
      }

      if (currentDay >= secondDay) {
        addAutomaticMovement({
          item,
          type: "income",
          day: secondDay,
          amount,
        });
      }

      return;
    }

    // --------------------------------------------------------
    // TRIMESTRAL
    // --------------------------------------------------------

    if (
      frequency === "quarterly" ||
      frequency === "trimestral"
    ) {
      const selectedMonths =
        Array.isArray(item.targetMonths)
          ? item.targetMonths
          : [];

      const currentMonthNumber =
        String(month + 1);

      if (
        selectedMonths.includes(
          currentMonthNumber
        )
      ) {
        addAutomaticMovement({
          item,
          type: "income",
          day: Number(item.day || 1),
          amount,
        });
      }

      return;
    }

    // --------------------------------------------------------
    // ANUAL
    // --------------------------------------------------------

    if (
      frequency === "yearly" ||
      frequency === "annual"
    ) {
      const selectedMonths =
        Array.isArray(item.targetMonths)
          ? item.targetMonths
          : [];

      const currentMonthNumber =
        String(month + 1);

      if (
        selectedMonths.includes(
          currentMonthNumber
        )
      ) {
        addAutomaticMovement({
          item,
          type: "income",
          day: Number(item.day || 1),
          amount,
        });
      }
    }
  });

  // ==========================================================
  // 5. GASTOS RECURRENTES
  // ==========================================================

  recurringExpense.forEach((item) => {
    const amount = Number(item.amount || 0);
    const frequency =
      item.frequency || "monthly";

    // --------------------------------------------------------
    // MENSUAL
    // --------------------------------------------------------

    if (frequency === "monthly") {
      addAutomaticMovement({
        item,
        type: "expense",
        day: Number(item.day || 1),
        amount,
      });

      return;
    }

    // --------------------------------------------------------
    // QUINCENAL
    // --------------------------------------------------------

    if (frequency === "biweekly") {
      const firstDay = Number(
        item.day || 1
      );

      const secondDay = Number(
        item.secondDay || firstDay + 14
      );

      if (currentDay >= firstDay) {
        addAutomaticMovement({
          item,
          type: "expense",
          day: firstDay,
          amount,
        });
      }

      if (currentDay >= secondDay) {
        addAutomaticMovement({
          item,
          type: "expense",
          day: secondDay,
          amount,
        });
      }

      return;
    }

    // --------------------------------------------------------
    // TRIMESTRAL
    // --------------------------------------------------------

    if (
      frequency === "quarterly" ||
      frequency === "trimestral"
    ) {
      const selectedMonths =
        Array.isArray(item.targetMonths)
          ? item.targetMonths
          : [];

      const currentMonthNumber =
        String(month + 1);

      if (
        selectedMonths.includes(
          currentMonthNumber
        )
      ) {
        addAutomaticMovement({
          item,
          type: "expense",
          day: Number(item.day || 1),
          amount,
        });
      }

      return;
    }

    // --------------------------------------------------------
    // ANUAL
    // --------------------------------------------------------

    if (
      frequency === "yearly" ||
      frequency === "annual"
    ) {
      const selectedMonths =
        Array.isArray(item.targetMonths)
          ? item.targetMonths
          : [];

      const currentMonthNumber =
        String(month + 1);

      if (
        selectedMonths.includes(
          currentMonthNumber
        )
      ) {
        addAutomaticMovement({
          item,
          type: "expense",
          day: Number(item.day || 1),
          amount,
        });
      }
    }
  });

  // ----------------------------------------------------------
  // 6. RESULTADO
  // ----------------------------------------------------------

  return [
    ...manualMovements,
    ...automaticMovements,
  ];
}

// ============================================================
// ESTADÍSTICAS MENSUALES
// ============================================================

export function getMonthlyStats(
  balance = {},
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

// ============================================================
// HISTÓRICO
// ============================================================

export function getHistoricalStats(
  balance = {},
  maxMonths = 6,
  currentTargetSavings = 300
) {
  const movements = balance?.movements || [];

  const recurringIncome =
    balance?.recurringIncome || [];

  const recurringExpense =
    balance?.recurringExpense || [];

  // Sin ningún tipo de dato no mostramos histórico.
  if (
    movements.length === 0 &&
    recurringIncome.length === 0 &&
    recurringExpense.length === 0
  ) {
    return [];
  }

  // ----------------------------------------------------------
  // FECHA DEL MOVIMIENTO MANUAL MÁS ANTIGUO
  // ----------------------------------------------------------

  const dates = movements
    .map((movement) => {
      const value =
        movement.date ||
        movement.createdAt;

      if (!value) {
        return null;
      }

      const date = new Date(value);

      return Number.isNaN(date.getTime())
        ? null
        : date;
    })
    .filter(Boolean);

  const oldestDate =
    dates.length > 0
      ? new Date(Math.min(...dates))
      : null;

  // ----------------------------------------------------------
  // CONSTRUIR HISTÓRICO
  // ----------------------------------------------------------

  const history = [];
  const now = new Date();

  let current = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  while (history.length < maxMonths) {
    const year = current.getFullYear();
    const month = current.getMonth();

    const monthlyMovements =
      getMovementsByMonth(
        balance,
        year,
        month
      );

    if (monthlyMovements.length > 0) {
      const stats = getBalanceStats({
        ...balance,
        movements: monthlyMovements,
      });

      const isCurrentMonth =
        year === now.getFullYear() &&
        month === now.getMonth();

      const targetSavings =
        isCurrentMonth
          ? currentTargetSavings
          : (
              balance?.monthlyTargets?.[
                `${year}-${month}`
              ] ??
              balance?.defaultTargetSavings ??
              300
            );

      history.unshift({
        year,
        month,

        monthName:
          current.toLocaleString(
            "es-ES",
            { month: "short" }
          ),

        ...stats,

        targetSavings,
      });
    }

    current.setMonth(
      current.getMonth() - 1
    );

    // Si hemos pasado el movimiento manual
    // más antiguo y no existen recurrentes,
    // no tiene sentido continuar.
    if (
      oldestDate &&
      current <
        new Date(
          oldestDate.getFullYear(),
          oldestDate.getMonth(),
          1
        ) &&
      recurringIncome.length === 0 &&
      recurringExpense.length === 0
    ) {
      break;
    }
  }

  return history;
}