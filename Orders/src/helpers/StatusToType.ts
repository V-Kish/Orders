const types = ['new', 'accept', 'wait', 'reject', 'done'];
export const statusToType = (status: number) => {
  return types[status - 1];
};
export function recalculateSumResult(item) {
  if (item.detail.operationType !== 'cross') {
    return (item.detail.sum * item.detail.rate).toFixed(2);
  }
  try {
    if (item.detail.rateCurrency.buy < item.detail.rateCurrencyTo.buy) {
      return (item.detail.sum / item.detail.rate).toFixed(2);
    } else {
      return (item.detail.sum * item.detail.rate).toFixed(2);
    }
  } catch (ex) {
    console.warn('recalculateSumResult', ex);
  }
}
