/** @format */

import {axiosClient} from 'utils';
import {takeLatest, put, all} from 'redux-saga/effects';
import {IHomeActionPayload, INofifyState} from 'types';
import {DriverActions} from './Actions';
import {actionRequest, getDataSuccess} from './Reducer';
import {error} from 'store/notify';

function* onGetBaseActionsRequest(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    console.log(
      'onGetBaseActions-action',
      JSON.stringify(action),
      `${action.payload.endPoint}`,
    );
    const rs = yield axiosClient.get(`${action.payload.endPoint}`);
    console.log(
      'onGetBaseActions-rs',
      `${action.payload.endPoint}`,
      rs.status === 200,
    );

    if (rs.status === 200) {
      const dataKey = action?.payload?.dataKey;
      const data = action?.payload?.isPaginate
        ? rs?.data
        : action?.payload?.isObject
        ? rs?.data?.result[0]
        : rs?.data?.result;
      const payload = dataKey ? {[`${dataKey}`]: data} : {};
      console.log(
        'onGetBaseActions-payload',
        `${action.payload.endPoint}`,
        data,
      );
      yield put(getDataSuccess(payload));
      if (action?.callback) {
        action?.callback?.(rs);
      }
    }
  } catch (e: any) {
    console.log('driver-action-err', JSON.stringify(e));
    yield put(
      error({
        message: 'some_thing_wrong',
        options: {useI18n: true},
      } as INofifyState),
    );
    yield put(getDataSuccess({}));
    return action?.callback?.({...e});
  }
}

function* watchGetBaseActions() {
  yield takeLatest(
    DriverActions.GET_BASE_ACTIONS as any,
    onGetBaseActionsRequest,
  );
}

function* onPostBaseAction(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    console.log(
      'onPostBaseAction-action',
      JSON.stringify(action),
      `${action.payload.endPoint}`,
    );
    const rs = yield axiosClient.post(
      `${action.payload.endPoint}`,
      JSON.stringify(action?.payload?.formData),
    );
    console.log(
      'onPostBaseAction-rs',
      JSON.stringify(rs.status),
      `${action.payload.endPoint}`,
    );

    const dataKey = action?.payload?.dataKey;
    const data = action?.payload?.isPaginate
      ? rs?.data
      : action?.payload?.isObject
      ? rs?.data?.result[0]
      : rs?.data?.result;
    const payload = dataKey && rs?.data?.result ? {[`${dataKey}`]: data} : {};
    yield put(getDataSuccess(payload));
    if (action?.callback) {
      action?.callback?.(rs);
    }
  } catch (e: any) {
    console.log('driver-action-err', JSON.stringify(e));
    yield put(
      error({
        message: 'some_thing_wrong',
        options: {useI18n: true},
      } as INofifyState),
    );
    yield put(getDataSuccess({}));
    if (action?.callback) {
      action?.callback?.({success: false, ...e});
    }
  }
}

function* watchPostBaseActions() {
  yield takeLatest(DriverActions.POST_BASE_ACTIONS as any, onPostBaseAction);
}

function* onDeleteBaseAction(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    console.log(
      'onDeleteBaseActions-action',
      JSON.stringify(action),
      `${action.payload.endPoint}`,
    );
    const rs = yield axiosClient.delete(`${action.payload.endPoint}`, {
      data: JSON.stringify(action?.payload?.formData),
    });
    console.log(
      'onDeleteBaseActions-rs',
      `${action.payload.endPoint}`,
      rs.status === 200,
    );

    if (rs.status === 200) {
      const dataKey = action?.payload?.dataKey;
      const data = action?.payload?.isPaginate
        ? rs?.data
        : action?.payload?.isObject
        ? rs?.data?.result[0]
        : rs?.data?.result;
      const payload = dataKey ? {[`${dataKey}`]: data} : {};
      console.log(
        'onDeleteBaseActions-payload',
        `${action.payload.endPoint}`,
        data,
      );

      yield put(getDataSuccess(payload));
      if (action?.callback) {
        action?.callback?.(rs);
      }
    }
  } catch (e: any) {
    console.log('driver-action-err', JSON.stringify(e));
    yield put(
      error({
        message: 'some_thing_wrong',
        options: {useI18n: true},
      } as INofifyState),
    );
    yield put(getDataSuccess({}));
    return action?.callback?.({...e});
  }
}

function* watchDeleteBaseActions() {
  yield takeLatest(
    DriverActions.DELETE_BASE_ACTIONS as any,
    onDeleteBaseAction,
  );
}

export default function* driverSagas() {
  yield all([
    watchGetBaseActions(),
    watchPostBaseActions(),
    watchDeleteBaseActions(),
  ]);
}
