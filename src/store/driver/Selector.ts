/**
 * @format
 * @description get data from redux store when perform the user authentication
 */

import {createSelector} from 'reselect';
import {IDriverState} from 'types';

const selector = (state: {driver: IDriverState}) => state.driver;

export const getError = createSelector(
  selector,
  ({error}: IDriverState) => error,
);

export const getLoading = createSelector(
  selector,
  ({loading}: IDriverState) => loading,
);

// export const getAuthUser = createSelector(selector, app => app?.user);

export const getAttrByKey = (k: keyof IDriverState) =>
  createSelector(selector, driver => driver[k]);
