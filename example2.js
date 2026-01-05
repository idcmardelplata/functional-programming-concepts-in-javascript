
const Transaction = {
  empty: () => ({
    debits: [],
    credits: [],
    balance: 0
  }),

  concat: (a, b) => ({
    debits: [...a.debits, ...b.debits],
    credits: [...a.credits, ...b.credits],
    balance: a.balance + b.balance
  })
};

const calculate = (monoid) => (values) => {
  if (values.length === 0) return monoid.empty();
  return values.reduce((acc, val) => monoid.concat(acc, val))
}

const morning = {
  debits: [{ desc: 'Cafe', amount: 5 }],
  credits: [{ desc: 'Salario', amount: 1000 }],
  balance: 995
};

const afternoon = {
  debits: [{ desc: 'Almuerzo', amount: 15 }, { desc: 'Nafta', amount: 50 }],
  credits: [],
  balance: -65
};

const evening = {
  debits: [{ desc: 'Cena', amount: 30 }],
  credits: [{ desc: 'Freelance', amount: 200 }],
  balance: 170
};

const dailyReport = calculate(Transaction)([morning, afternoon, evening]);
console.log('Reporte diario:', dailyReport);
console.log('Balance final:', dailyReport.balance);
