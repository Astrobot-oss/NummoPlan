export function createInvestment(investments, investment) {
  return [...investments, investment];
}

export function updateInvestment(investments, updatedInvestment) {
  return investments.map((investment) =>
    investment.id === updatedInvestment.id
      ? updatedInvestment
      : investment
  );
}

export function deleteInvestment(investments, investmentId) {
  return investments.filter(
    (investment) => investment.id !== investmentId
  );
}

export function addContribution(
  investments,
  investmentId,
  amount
) {
  return investments.map((investment) => {
    if (investment.id !== investmentId) {
      return investment;
    }

    const buyPrice = investment.currentPrice;

    const newShares =
      amount / buyPrice;

    const totalInvestedBefore =
      investment.shares *
      investment.purchasePrice;

    const totalInvestedAfter =
      totalInvestedBefore + amount;

    const totalShares =
      investment.shares + newShares;

    const newAveragePrice =
      totalInvestedAfter / totalShares;

    return {
      ...investment,

      shares: totalShares,

      purchasePrice: newAveragePrice,

      movements: [
        ...investment.movements,
        {
          id: crypto.randomUUID(),

          type: "buy",

          amount,

          shares: newShares,

          price: buyPrice,

          date: new Date().toISOString(),
        },
      ],
    };
  });
}
export function sellInvestment(
  investments,
  investmentId,
  data
) {
  return investments.map((investment) => {

    if (investment.id !== investmentId) {
      return investment;
    }

    const remainingShares =
      investment.shares - data.shares;

    return {

      ...investment,

      shares: remainingShares,

      movements: [

        ...investment.movements,

        {

          id: crypto.randomUUID(),

          type: "sell",

          amount: data.amount,

          shares: data.shares,

          price: data.price,

          date: new Date().toISOString(),

        },

      ],

    };

  });
}
export function addDividend(
  investments,
  investmentId,
  amount
) {
  return investments.map((investment) => {

    if (investment.id !== investmentId) {
      return investment;
    }

    return {

      ...investment,

      movements: [

        ...investment.movements,

        {
          id: crypto.randomUUID(),

          type: "dividend",

          amount,

          date: new Date().toISOString(),
        },

      ],

    };

  });
}

export function updateCurrentValue(
  investments,
  investmentId,
  price
) {
  const today = new Date().toISOString().split("T")[0];

  return investments.map((investment) => {
    if (investment.id !== investmentId) {
      return investment;
    }

    const history = [...investment.history];

    const todayIndex = history.findIndex(
      (item) => item.date === today
    );

    if (todayIndex >= 0) {
      history[todayIndex] = {
        date: today,
        price,
      };
    } else {
      history.push({
        date: today,
        price,
      });
    }

    return {
      ...investment,

      currentPrice: price,

      lastUpdate: new Date().toISOString(),

      history,
    };
  });
}