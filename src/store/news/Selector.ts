/**
 * @format
 * @description get data from redux store when perform the user authentication
 */

import {createSelector} from 'reselect';
import {INewsState} from 'types';

const selector = (state: {news: INewsState}) => state.news;

export const getError = createSelector(
  selector,
  ({error}: INewsState) => error,
);

export const getLoading = createSelector(
  selector,
  ({loading}: INewsState) => loading,
);

export const getAttrByKey = (k: keyof INewsState) =>
  createSelector(selector, news => news[k]);
