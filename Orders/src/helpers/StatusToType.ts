import React from 'react';

const types = ['new', 'accept', 'wait', 'reject', 'done'];
export const statusToType = (status: number) => {
  return types[status - 1];
};
export function recalculateSumResult(item) {
    try {
        if (itemHistory.detail.rateCurrency.buy < itemHistory.detail.rateCurrencyTo.buy) {
            return (itemHistory.detail.sum / itemHistory.detail.rate).toFixed(2);
        } else {
            return (itemHistory.detail.sum * itemHistory.detail.rate).toFixed(2);
        }
    } catch (e) {
        this.preloaderHistory.isShowPreloader = false;
    }
}
