const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD', style: 'currency',
});

function formatMoney(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

export default formatMoney;
