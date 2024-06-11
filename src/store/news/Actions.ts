/** @format */

import {IHomeActionPayload} from 'types';

export const NewsActions = {
  GET_BASE_ACTIONS: 'GET_BASE_ACTIONS_NEWS',
  POST_BASE_ACTIONS: 'POST_BASE_ACTIONS_NEWS',
};

export const getBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: NewsActions.GET_BASE_ACTIONS,
  callback,
});

export const postBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: payload?.type || NewsActions.POST_BASE_ACTIONS,
  callback,
});
