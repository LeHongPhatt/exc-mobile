/**
 * @format
 * @description get data from redux store when perform the statistic
 */

import {createSelector} from 'reselect';
import {IStatisticState} from 'types';

const selector = (state: {statistic: IStatisticState}) => state.statistic;

export const getError = createSelector(
  selector,
  ({error}: IStatisticState) => error,
);

export const getLoading = createSelector(
  selector,
  ({loading}: IStatisticState) => loading,
);

export const getAttrByKey = (k: keyof IStatisticState) =>
  createSelector(selector, statistic => statistic[k]);
