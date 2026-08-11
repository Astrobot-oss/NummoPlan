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
      (total, movement) =>
        total + Number(movement.amount || 0),
      0
    );

  const totalExpenses = movements
    .filter((movement) => movement.type === "expense")
    .reduce(
      (total, movement) =>
        total + Number(movement.amount || 0),
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
// RESUMEN DEL MES ACTUAL
// ------------------------------------------------------------

export function getBalanceSummary(balance = {}) {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();

  // Incluye movimientos manuales + movimientos recurrentes
  // que correspondan al mes actual.
  const stats = getMonthlyStats(
    balance,
    year,
    month
  );

  const availableToInvest = Math.max(
    0,
    stats.savings
  );

  return {
    totalIncome: stats.totalIncome,
    totalExpenses: stats.totalExpenses,
    savings: stats.savings,
    savingsRate: stats.savingsRate,
    availableToInvest,
  };
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
      const category =
        movement.category || "Otros";

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
      const category =
        movement.category || "Otros";

      result[category] =
        (result[category] || 0) +
        Number(movement.amount || 0);
    });

  return result;
}

// ------------------------------------------------------------
// GASTOS POR CATEGORÍA - FORMATO PARA GRÁFICAS
// ------------------------------------------------------------

export function getExpensesByCategory(
  movements = []
) {
  const categories = {};
  let totalExpenses = 0;

  movements
    .filter(
      (movement) => movement.type === "expense"
    )
    .forEach((movement) => {
      const category =
        movement.category || "Otros";

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
              (
                (amount / totalExpenses) *
                100
              ).toFixed(1)
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

export function getLargestExpenseCategory(
  balance = {}
) {
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
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, limit);
}

// ------------------------------------------------------------
// TOTAL INGRESOS RECURRENTES
// ------------------------------------------------------------

export function getRecurringIncomeTotal(
  balance = {}
) {
  return (
    balance?.recurringIncome || []
  ).reduce(
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

  const manualMovements =
    movements.filter((movement) => {
      if (!movement.date) {
        return false;
      }

      const date = new Date(movement.date);

      if (Number.isNaN(date.getTime())) {
        return false;
      }

      return (
        date.getFullYear() === year &&
        date.getMonth() === month
      );
    });

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

  function recurringHasStarted(item) {
  if (!item?.startDate) {
    return true;
  }

  const startDate = new Date(
    `${item.startDate}T00:00:00`
  );

  if (Number.isNaN(startDate.getTime())) {
    return true;
  }

  const startYear =
    startDate.getFullYear();

  const startMonth =
    startDate.getMonth();

  const startDay =
    startDate.getDate();

  if (year < startYear) {
    return false;
  }

  if (
    year === startYear &&
    month < startMonth
  ) {
    return false;
  }

  if (
    year === startYear &&
    month === startMonth &&
    currentDay < startDay
  ) {
    return false;
  }

  return true;
}

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

  // El movimiento todavía no ha llegado
  // dentro del mes actual.
  if (currentDay < numericDay) {
    return;
  }

  // La recurrencia todavía no ha comenzado.
  if (!recurringHasStarted(item)) {
    return;
  }

  const startDate = item?.startDate
    ? new Date(
        `${item.startDate}T00:00:00`
      )
    : null;

  // Si estamos en el mismo mes en que
  // comienza la recurrencia, no generamos
  // cargos anteriores a la fecha de inicio.
  if (
    startDate &&
    !Number.isNaN(startDate.getTime()) &&
    startDate.getFullYear() === year &&
    startDate.getMonth() === month &&
    numericDay < startDate.getDate()
  ) {
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
      extraPay
        ? "extra"
        : "normal",
    ].join("-"),

    type,

    amount: Number(amount || 0),

    category:
      item.category ||
      (
        type === "income"
          ? "Ingreso recurrente"
          : "Gasto recurrente"
      ),

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
    const amount = Number(
      item.amount || 0
    );

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
        item.secondDay ||
          firstDay + 14
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
    const amount = Number(
      item.amount || 0
    );

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
        item.secondDay ||
          firstDay + 14
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
  currentTargetPath = 300
) {
  const availableMonths =
    getAvailableBalanceMonths(balance);

  const selectedMonths =
    availableMonths.slice(0, maxMonths);

  const now = new Date();

  return selectedMonths
    .slice()
    .reverse()
    .map(({ year, month }) => {
      const monthlyMovements =
        getMovementsByMonth(
          balance,
          year,
          month
        );

      const stats = getBalanceStats({
        ...balance,
        movements: monthlyMovements,
      });

      const isCurrentMonth =
        year === now.getFullYear() &&
        month === now.getMonth();

      const targetSavings =
        isCurrentMonth
          ? currentTargetPath
          : (
              balance?.monthlyTargets?.[
                `${year}-${month}`
              ] ??
              balance?.defaultTargetSavings ??
              300
            );

      return {
        year,
        month,

        monthName: new Date(
          year,
          month,
          1
        ).toLocaleString("es-ES", {
          month: "short",
        }),

        ...stats,

        targetSavings,
      };
    });
}

// ============================================================
// MESES CON ACTIVIDAD
// ============================================================

export function getAvailableBalanceMonths(
  balance = {}
) {
  const movements =
    balance?.movements || [];

  const monthsMap = new Map();

  const now = new Date();

  const currentYear =
    now.getFullYear();

  const currentMonth =
    now.getMonth();

  // --------------------------------------------------
  // 1. Detectar el movimiento manual más antiguo
  // --------------------------------------------------

  let earliestDate = null;

  movements.forEach((movement) => {
    if (!movement.date) return;

    const date = new Date(
      movement.date
    );

    if (Number.isNaN(date.getTime())) {
      return;
    }

    if (
      !earliestDate ||
      date < earliestDate
    ) {
      earliestDate = date;
    }
  });

  // --------------------------------------------------
  // 2. Determinar desde qué mes comprobamos actividad
  // --------------------------------------------------
  //
  // Si existen movimientos manuales:
  // empezamos desde su mes más antiguo.
  //
  // Así podemos encontrar meses históricos
  // que no tengan movimientos manuales pero sí
  // actividad generada por recurrencias.
  //
  // Si no existen movimientos manuales:
  // solo comprobamos el mes actual.
  //
  // Esto es necesario porque actualmente las
  // recurrencias no tienen una fecha de inicio.
  // --------------------------------------------------

  const startYear =
    earliestDate
      ? earliestDate.getFullYear()
      : currentYear;

  const startMonth =
    earliestDate
      ? earliestDate.getMonth()
      : currentMonth;

  // --------------------------------------------------
  // 3. Recorrer todos los meses hasta el actual
  // --------------------------------------------------
  //
  // Para cada mes utilizamos getMovementsByMonth().
  //
  // Esto incluye:
  //
  // - movimientos manuales
  // - ingresos recurrentes
  // - gastos recurrentes
  // - quincenales
  // - trimestrales
  // - anuales
  // - pagas extra
  //
  // Por tanto, un mes histórico producido únicamente
  // por recurrencias también aparece.
  // --------------------------------------------------

  const startDate = new Date(
    startYear,
    startMonth,
    1
  );

  const endDate = new Date(
    currentYear,
    currentMonth,
    1
  );

  const cursor = new Date(
    startDate
  );

  while (cursor <= endDate) {
    const year =
      cursor.getFullYear();

    const month =
      cursor.getMonth();

    const monthlyMovements =
      getMovementsByMonth(
        balance,
        year,
        month
      );

    if (
      monthlyMovements.length > 0
    ) {
      const key =
        `${year}-${month}`;

      monthsMap.set(key, {
        year,
        month,
      });
    }

    cursor.setMonth(
      cursor.getMonth() + 1
    );
  }

  // --------------------------------------------------
  // 4. Ordenar del más reciente al más antiguo
  // --------------------------------------------------

  return Array.from(
    monthsMap.values()
  ).sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }

    return b.month - a.month;
  });
}