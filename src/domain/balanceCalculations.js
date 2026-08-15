export function getBalanceStats(
  balance = {}
) {
  const movements =
    balance?.movements || [];

  const totalIncome =
    movements
      .filter(
        (movement) =>
          movement.type === "income"
      )
      .reduce(
        (total, movement) =>
          total +
          Number(
            movement.amount || 0
          ),
        0
      );

  const totalExpenses =
    movements
      .filter(
        (movement) =>
          movement.type === "expense"
      )
      .reduce(
        (total, movement) =>
          total +
          Number(
            movement.amount || 0
          ),
        0
      );

  const savings =
    totalIncome - totalExpenses;

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

export function getBalanceSummary(
  balance = {}
) {
  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    now.getMonth();

  const stats =
    getMonthlyStats(
      balance,
      year,
      month
    );

  const availableToInvest =
    Math.max(
      0,
      stats.savings
    );

  return {
    totalIncome:
      stats.totalIncome,

    totalExpenses:
      stats.totalExpenses,

    savings:
      stats.savings,

    savingsRate:
      stats.savingsRate,

    availableToInvest,
  };
}

// ------------------------------------------------------------
// PATRIMONIO / BALANCE NETO
// ------------------------------------------------------------

export function getNetWorth(
  balance = {}
) {
  const {
    totalIncome,
    totalExpenses,
  } = getBalanceStats(balance);

  return (
    totalIncome -
    totalExpenses
  );
}

// ------------------------------------------------------------
// INGRESOS POR CATEGORÍA
// ------------------------------------------------------------

export function getIncomeByCategory(
  balance = {}
) {
  const result = {};

  (balance?.movements || [])
    .filter(
      (movement) =>
        movement.type === "income"
    )
    .forEach((movement) => {
      const category =
        movement.category ||
        "Otros";

      result[category] =
        (result[category] || 0) +
        Number(
          movement.amount || 0
        );
    });

  return result;
}

// ------------------------------------------------------------
// GASTOS POR CATEGORÍA
// ------------------------------------------------------------

export function getExpenseByCategory(
  balance = {}
) {
  const result = {};

  (balance?.movements || [])
    .filter(
      (movement) =>
        movement.type === "expense"
    )
    .forEach((movement) => {
      const category =
        movement.category ||
        "Otros";

      result[category] =
        (result[category] || 0) +
        Number(
          movement.amount || 0
        );
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
      (movement) =>
        movement.type === "expense"
    )
    .forEach((movement) => {
      const category =
        movement.category ||
        "Otros";

      const amount =
        Math.abs(
          Number(
            movement.amount || 0
          )
        );

      totalExpenses += amount;

      categories[category] =
        (categories[category] || 0) +
        amount;
    });

  const result =
    Object.entries(categories)
      .map(
        ([category, amount]) => ({
          category,
          amount,

          percentage:
            totalExpenses > 0
              ? Number(
                  (
                    (amount /
                      totalExpenses) *
                    100
                  ).toFixed(1)
                )
              : 0,
        })
      )
      .sort(
        (a, b) =>
          b.amount - a.amount
      );

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
    getExpenseByCategory(
      balance
    );

  let category = null;
  let amount = 0;

  Object.entries(
    categories
  ).forEach(
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
  return [
    ...(balance?.movements || []),
  ]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, limit);
}

// ------------------------------------------------------------
// TOTAL INGRESOS RECURRENTES ACTIVOS
// ------------------------------------------------------------

export function getRecurringIncomeTotal(
  balance = {}
) {
  const today =
    new Date();

  const todayKey =
    `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;

  return (
    balance?.recurringIncome || []
  )
    .filter(
      (income) =>
        !income.endDate ||
        income.endDate >= todayKey
    )
    .reduce(
      (total, income) =>
        total +
        Number(
          income.amount || 0
        ),
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
  const movements =
    balance?.movements || [];

  const recurringIncome =
    balance?.recurringIncome || [];

  const recurringExpense =
    balance?.recurringExpense || [];

  // ----------------------------------------------------------
  // 1. MOVIMIENTOS MANUALES
  // ----------------------------------------------------------

  const manualMovements =
    movements.filter(
      (movement) => {
        if (!movement.date) {
          return false;
        }

        const date =
          new Date(
            movement.date
          );

        if (
          Number.isNaN(
            date.getTime()
          )
        ) {
          return false;
        }

        return (
          date.getFullYear() ===
            year &&
          date.getMonth() ===
            month
        );
      }
    );

  // ----------------------------------------------------------
  // 2. DÍA HASTA EL QUE CONTABILIZAMOS
  // ----------------------------------------------------------

  const now =
    new Date();

  const isCurrentMonth =
    now.getFullYear() ===
      year &&
    now.getMonth() ===
      month;

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const currentDay =
    isCurrentMonth
      ? now.getDate()
      : daysInMonth;

  const automaticMovements =
    [];

  // ----------------------------------------------------------
  // 3. INICIO DE RECURRENCIA
  // ----------------------------------------------------------

  function recurringHasStarted(
    item
  ) {
    if (!item?.startDate) {
      return true;
    }

    const startDate =
      new Date(
        `${item.startDate}T00:00:00`
      );

    if (
      Number.isNaN(
        startDate.getTime()
      )
    ) {
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
  // 4. FIN DE RECURRENCIA
  // ----------------------------------------------------------

  function recurringHasEnded(
    item
  ) {
    if (!item?.endDate) {
      return false;
    }

    const endDate =
      new Date(
        `${item.endDate}T00:00:00`
      );

    if (
      Number.isNaN(
        endDate.getTime()
      )
    ) {
      return false;
    }

    const endYear =
      endDate.getFullYear();

    const endMonth =
      endDate.getMonth();

    const endDay =
      endDate.getDate();

    if (year > endYear) {
      return true;
    }

    if (
      year === endYear &&
      month > endMonth
    ) {
      return true;
    }

    if (
      year === endYear &&
      month === endMonth &&
      currentDay > endDay
    ) {
      return true;
    }

    return false;
  }

  // ----------------------------------------------------------
  // 5. CREAR MOVIMIENTO RECURRENTE
  // ----------------------------------------------------------

  function addAutomaticMovement({
    item,
    type,
    day,
    amount,
    extraPay = false,
  }) {
    const numericDay =
      Number(day);

    if (
      !numericDay ||
      numericDay < 1
    ) {
      return;
    }

    if (
      currentDay <
      numericDay
    ) {
      return;
    }

    if (
      !recurringHasStarted(
        item
      )
    ) {
      return;
    }

    if (
      recurringHasEnded(
        item
      )
    ) {
      return;
    }

    const startDate =
      item?.startDate
        ? new Date(
            `${item.startDate}T00:00:00`
          )
        : null;

    if (
      startDate &&
      !Number.isNaN(
        startDate.getTime()
      ) &&
      startDate.getFullYear() ===
        year &&
      startDate.getMonth() ===
        month &&
      numericDay <
        startDate.getDate()
    ) {
      return;
    }

    const safeDay =
      Math.min(
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

      amount:
        Number(
          amount || 0
        ),

      category:
        item.category ||
        (
          type === "income"
            ? "Ingreso recurrente"
            : "Gasto recurrente"
        ),

      title:
        item.title || "",

      description:
        item.description ||
        item.title ||
        "",

      date:
        new Date(
          year,
          month,
          safeDay
        ).toISOString(),

      recurring: true,

      recurringId:
        item.id,

      extraPay,
    });
  }

  // ==========================================================
  // 6. INGRESOS RECURRENTES
  // ==========================================================

  recurringIncome.forEach(
    (item) => {
      const amount =
        Number(
          item.amount || 0
        );

      const frequency =
        item.frequency ||
        "monthly";

      if (
        frequency ===
        "monthly"
      ) {
        addAutomaticMovement({
          item,
          type: "income",
          day: Number(
            item.day || 1
          ),
          amount,
        });

        if (
          item.hasExtraPay &&
          Array.isArray(
            item.extraPayMonths
          )
        ) {
          const currentMonthNumber =
            String(
              month + 1
            );

          if (
            item.extraPayMonths.includes(
              currentMonthNumber
            )
          ) {
            addAutomaticMovement({
              item,
              type: "income",
              day: Number(
                item.day || 1
              ),
              amount,
              extraPay: true,
            });
          }
        }

        return;
      }

      if (
        frequency ===
        "biweekly"
      ) {
        const firstDay =
          Number(
            item.day || 1
          );

        const secondDay =
          Number(
            item.secondDay ||
              firstDay + 14
          );

        if (
          currentDay >=
          firstDay
        ) {
          addAutomaticMovement({
            item,
            type: "income",
            day: firstDay,
            amount,
          });
        }

        if (
          currentDay >=
          secondDay
        ) {
          addAutomaticMovement({
            item,
            type: "income",
            day: secondDay,
            amount,
          });
        }

        return;
      }

      if (
        frequency ===
          "quarterly" ||
        frequency ===
          "trimestral"
      ) {
        const selectedMonths =
          Array.isArray(
            item.targetMonths
          )
            ? item.targetMonths
            : [];

        const currentMonthNumber =
          String(
            month + 1
          );

        if (
          selectedMonths.includes(
            currentMonthNumber
          )
        ) {
          addAutomaticMovement({
            item,
            type: "income",
            day: Number(
              item.day || 1
            ),
            amount,
          });
        }

        return;
      }

      if (
        frequency ===
          "yearly" ||
        frequency ===
          "annual"
      ) {
        const selectedMonths =
          Array.isArray(
            item.targetMonths
          )
            ? item.targetMonths
            : [];

        const currentMonthNumber =
          String(
            month + 1
          );

        if (
          selectedMonths.includes(
            currentMonthNumber
          )
        ) {
          addAutomaticMovement({
            item,
            type: "income",
            day: Number(
              item.day || 1
            ),
            amount,
          });
        }
      }
    }
  );

  // ==========================================================
  // 7. GASTOS RECURRENTES
  // ==========================================================

  recurringExpense.forEach(
    (item) => {
      const amount =
        Number(
          item.amount || 0
        );

      const frequency =
        item.frequency ||
        "monthly";

      if (
        frequency ===
        "monthly"
      ) {
        addAutomaticMovement({
          item,
          type: "expense",
          day: Number(
            item.day || 1
          ),
          amount,
        });

        return;
      }

      if (
        frequency ===
        "biweekly"
      ) {
        const firstDay =
          Number(
            item.day || 1
          );

        const secondDay =
          Number(
            item.secondDay ||
              firstDay + 14
          );

        if (
          currentDay >=
          firstDay
        ) {
          addAutomaticMovement({
            item,
            type: "expense",
            day: firstDay,
            amount,
          });
        }

        if (
          currentDay >=
          secondDay
        ) {
          addAutomaticMovement({
            item,
            type: "expense",
            day: secondDay,
            amount,
          });
        }

        return;
      }

      if (
        frequency ===
          "quarterly" ||
        frequency ===
          "trimestral"
      ) {
        const selectedMonths =
          Array.isArray(
            item.targetMonths
          )
            ? item.targetMonths
            : [];

        const currentMonthNumber =
          String(
            month + 1
          );

        if (
          selectedMonths.includes(
            currentMonthNumber
          )
        ) {
          addAutomaticMovement({
            item,
            type: "expense",
            day: Number(
              item.day || 1
            ),
            amount,
          });
        }

        return;
      }

      if (
        frequency ===
          "yearly" ||
        frequency ===
          "annual"
      ) {
        const selectedMonths =
          Array.isArray(
            item.targetMonths
          )
            ? item.targetMonths
            : [];

        const currentMonthNumber =
          String(
            month + 1
          );

        if (
          selectedMonths.includes(
            currentMonthNumber
          )
        ) {
          addAutomaticMovement({
            item,
            type: "expense",
            day: Number(
              item.day || 1
            ),
            amount,
          });
        }
      }
    }
  );

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
  const movements =
    getMovementsByMonth(
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
    getAvailableBalanceMonths(
      balance
    );

  const selectedMonths =
    availableMonths
      .slice(0, maxMonths)
      .slice()
      .reverse();

  const now =
    new Date();

  return selectedMonths.map(
    ({
      year,
      month,
    }) => {
      const monthlyMovements =
        getMovementsByMonth(
          balance,
          year,
          month
        );

      const stats =
        getBalanceStats({
          ...balance,
          movements:
            monthlyMovements,
        });

      const isCurrentMonth =
        year ===
          now.getFullYear() &&
        month ===
          now.getMonth();

      /*
       * La meta del mes se determina
       * de forma independiente.
       *
       * Si existe una meta específica
       * para ese mes, se utiliza.
       *
       * Si no existe:
       * - mes actual -> targetSavings actual
       * - histórico -> meta por defecto
       */
      const monthlyTarget =
        balance
          ?.monthlyTargets?.[
          `${year}-${month}`
        ];

      const targetSavings =
        monthlyTarget !== undefined &&
        monthlyTarget !== null
          ? Number(
              monthlyTarget
            )
          : isCurrentMonth
            ? Number(
                currentTargetPath
              )
            : Number(
                balance
                  ?.defaultTargetSavings ??
                  300
              );

      return {
        year,
        month,

        monthName:
          new Date(
            year,
            month,
            1
          ).toLocaleString(
            "es-ES",
            {
              month: "short",
            }
          ),

        ...stats,

        targetSavings:
          Number.isFinite(
            targetSavings
          )
            ? Math.max(
                0,
                targetSavings
              )
            : 300,
      };
    }
  );
}

// ============================================================
// AHORRO ACUMULADO + META ACUMULADA + AHORRO EXTRA
// ============================================================

export function getAccumulatedSavingsData(
  historicalData = []
) {
  let accumulatedSavings = 0;
  let accumulatedTarget = 0;

  return historicalData.map(
    (item) => {
      const monthlySavings =
        Number(
          item.savings || 0
        );

      const monthlyTarget =
        Number(
          item.targetSavings || 0
        );

      accumulatedSavings +=
        monthlySavings;

      accumulatedTarget +=
        monthlyTarget;

      const extraSavings =
        accumulatedSavings -
        accumulatedTarget;

      return {
        ...item,

        accumulatedSavings,

        accumulatedTarget,

        extraSavings,
      };
    }
  );
}

// ============================================================
// MESES CON ACTIVIDAD
// ============================================================

export function getAvailableBalanceMonths(
  balance = {}
) {
  const movements =
    balance?.movements || [];

  const monthsMap =
    new Map();

  const now =
    new Date();

  const currentYear =
    now.getFullYear();

  const currentMonth =
    now.getMonth();

  // --------------------------------------------------
  // 1. MOVIMIENTO MANUAL MÁS ANTIGUO
  // --------------------------------------------------

  let earliestDate =
    null;

  movements.forEach(
    (movement) => {
      if (!movement.date) {
        return;
      }

      const date =
        new Date(
          movement.date
        );

      if (
        Number.isNaN(
          date.getTime()
        )
      ) {
        return;
      }

      if (
        !earliestDate ||
        date < earliestDate
      ) {
        earliestDate = date;
      }
    }
  );

  // --------------------------------------------------
  // 2. FECHA INICIAL
  // --------------------------------------------------

  let startYear =
    earliestDate
      ? earliestDate.getFullYear()
      : currentYear;

  let startMonth =
    earliestDate
      ? earliestDate.getMonth()
      : currentMonth;

  const allRecurring = [
    ...(balance?.recurringIncome ||
      []),
    ...(balance?.recurringExpense ||
      []),
  ];

  allRecurring.forEach(
    (item) => {
      if (!item?.startDate) {
        return;
      }

      const startDate =
        new Date(
          `${item.startDate}T00:00:00`
        );

      if (
        Number.isNaN(
          startDate.getTime()
        )
      ) {
        return;
      }

      const itemYear =
        startDate.getFullYear();

      const itemMonth =
        startDate.getMonth();

      const isEarlier =
        itemYear < startYear ||
        (
          itemYear ===
            startYear &&
          itemMonth <
            startMonth
        );

      if (isEarlier) {
        startYear =
          itemYear;

        startMonth =
          itemMonth;
      }
    }
  );

  // --------------------------------------------------
  // 3. RECORRER MESES
  // --------------------------------------------------

  const startDate =
    new Date(
      startYear,
      startMonth,
      1
    );

  const endDate =
    new Date(
      currentYear,
      currentMonth,
      1
    );

  const cursor =
    new Date(
      startDate
    );

  while (
    cursor <= endDate
  ) {
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
      monthlyMovements.length >
      0
    ) {
      const key =
        `${year}-${month}`;

      monthsMap.set(
        key,
        {
          year,
          month,
        }
      );
    }

    cursor.setMonth(
      cursor.getMonth() + 1
    );
  }

  // --------------------------------------------------
  // 4. ORDENAR
  // --------------------------------------------------

  return Array.from(
    monthsMap.values()
  ).sort(
    (a, b) => {
      if (
        a.year !==
        b.year
      ) {
        return (
          b.year -
          a.year
        );
      }

      return (
        b.month -
        a.month
      );
    }
  );
}