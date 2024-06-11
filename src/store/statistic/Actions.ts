/** @format */

import {IHomeActionPayload} from 'types';

export const StatisticActions = {
  GET_BASE_ACTIONS: 'GET_BASE_ACTIONS_STATISTIC',
  POST_BASE_ACTIONS: 'POST_BASE_ACTIONS_STATISTIC',
};

export const getBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: StatisticActions.GET_BASE_ACTIONS,
  callback,
});

export const postBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: payload?.type || StatisticActions.POST_BASE_ACTIONS,
  callback,
});
