/** @format */

import {IHomeActionPayload} from 'types';

export const TransactionActions = {
  GET_BASE_ACTIONS: 'GET_BASE_ACTIONS_TRANSACTION',
  POST_BASE_ACTIONS: 'POST_BASE_ACTIONS_TRANSACTION',
};

export const getBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: TransactionActions.GET_BASE_ACTIONS,
  callback,
});

export const postBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: payload?.type || TransactionActions.POST_BASE_ACTIONS,
  callback,
});
