/** @format */

import {IHomeActionPayload} from 'types';
// import {ROUTES} from 'utils';

export const DriverActions = {
  GET_BASE_ACTIONS: 'GET_BASE_ACTIONS_DRIVER',
  POST_BASE_ACTIONS: 'POST_BASE_ACTIONS_DRIVER',
  DELETE_BASE_ACTIONS: 'DELETE_BASE_ACTIONS_DRIVER',
};

export const getBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: DriverActions.GET_BASE_ACTIONS,
  callback,
});

export const postBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: payload?.type || DriverActions.POST_BASE_ACTIONS,
  callback,
});

export const deleteBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: DriverActions.DELETE_BASE_ACTIONS,
  callback,
});
