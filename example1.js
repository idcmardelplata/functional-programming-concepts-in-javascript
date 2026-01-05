const Currency = {
  empty: (currency = 'USD') => ({ amount: 0, currency }),
  concat: (a, b) => {
    if (a.currency !== b.currency) {
      throw new Error("Error al combinar 2 monedas diferentes")
    }
    return {
      amount: a.amount + b.amount,
      currency: a.currency
    }
  }
}

const calculate = (monoid) => (values) => {
  if (values.length === 0) return monoid.empty();
  return values.reduce((acc, val) => monoid.concat(acc, val))
}

const transaction1 = { amount: 100.50, currency: 'USD' };
const transaction2 = { amount: 250.75, currency: 'USD' };
const transaction3 = { amount: 50.25, currency: 'USD' };
// const transaction4 = { amount: 36.25, currency: 'ARS' };

const total = calculate(Currency)([transaction1, transaction2, transaction3]);
console.log('Total de transacciones:', total);

const withIdentity = Currency.concat(transaction1, Currency.empty('USD'));
console.log(withIdentity);
