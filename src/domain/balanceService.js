export function createMovement(
  movements,
  movement
) {
  return [
    {
      ...movement,
      id: Date.now(),
    },
    ...movements,
  ];
}

export function updateMovement(
  movements,
  movement
) {
  return movements.map((item) =>
    item.id === movement.id ? movement : item
  );
}

export function deleteMovement(
  movements,
  id
) {
  return movements.filter(
    (item) => item.id !== id
  );
}

export function createMovement(finance, movement) {
  return {
    ...finance,
    movements: [
      ...finance.movements,
      {
        id: Date.now(),
        ...movement,
      },
    ],
  };
}

export function deleteMovement(finance, id) {
  return {
    ...finance,
    movements: finance.movements.filter(
      (movement) => movement.id !== id
    ),
  };
}

export function updateSalary(finance, salaryData) {
  return {
    ...finance,
    salary: salaryData.salary,
    salaryDay: salaryData.salaryDay,
    extraSalaryMonths: salaryData.extraSalaryMonths,
    extraSalaryAmount: salaryData.extraSalaryAmount,
  };
}

export function createBalance() {
  return {
    salary: {
      amount: 0,
      payDay: 1,
      extraPayments: 12,
      lastGenerated: null,
    },

    movements: [],
  };
}

export function addMovement(balance, movement) {
  return {
    ...balance,
    movements: [
      ...balance.movements,
      {
        id: Date.now(),
        date: new Date().toISOString(),
        ...movement,
      },
    ],
  };
}

export function updateSalary(balance, salary) {
  return {
    ...balance,
    salary,
  };
}