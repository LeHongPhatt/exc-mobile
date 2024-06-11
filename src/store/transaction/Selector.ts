/**
 * @format
 * @description get data from redux store when perform the transaction
 */

import {createSelector} from 'reselect';
import {ITransactionState} from 'types';

const selector = (state: {transaction: ITransactionState}) => state.transaction;

export const getError = createSelector(
  selector,
  ({error}: ITransactionState) => error,
);

export const getLoading = createSelector(
  selector,
  ({loading}: ITransactionState) => loading,
);

export const getAttrByKey = (k: keyof ITransactionState) =>
  createSelector(selector, transaction => transaction[k]);
