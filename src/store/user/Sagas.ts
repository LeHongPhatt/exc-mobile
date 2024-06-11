/** @format */

import {API_ENDPOINT, axiosClient} from 'utils';
import {takeLatest, put, all, call} from 'redux-saga/effects';
import {IHomeActionPayload, INofifyState} from 'types';
import {UserActions} from './Actions';
import {
  actionRequest,
  actionRequestDone,
  getDataSuccess,
  reset,
} from './Reducer';
import {error} from 'store/notify';
import {NavigationService, Routes} from 'navigation';

function* onGetBaseActionsRequest(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    console.log('onGetBaseActionsRequest-action', JSON.stringify(action));
    const rs = yield axiosClient.get(`${action.payload.endPoint}`);
    console.log('onGetBaseActionsRequest-rs', JSON.stringify(rs.status));

    if (rs.status === 200) {
      const dataKey = action?.payload?.dataKey;
      const payload = dataKey
        ? {
            [`${dataKey}`]: action?.payload?.isObject
              ? rs?.data?.result?.[0]
              : rs?.data?.result,
          }
        : {};
      yield put(getDataSuccess(payload));
      if (action?.callback) {
        action?.callback?.(rs);
      }
    }
  } catch (e: any) {
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
    UserActions.GET_BASE_ACTIONS as any,
    onGetBaseActionsRequest,
  );
}

const resActionRequest = async (action: any) => {
  return axiosClient.post(
    `${action.payload.endPoint}`,
    action?.payload?.isFormData
      ? action?.payload?.formData
      : JSON.stringify(action?.payload?.formData),
    action.payload.headers,
  );
};

function* onPostBaseAction(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    console.log('onPostBaseAction-actionsss', JSON.stringify(action));

    // Sử dụng 'call' để gọi hàm 'resActionRequest' và nhận kết quả trả về
    const rs = yield call(resActionRequest, action);
    console.log('============rs==========', rs);

    const dataKey = action?.payload?.dataKey;
    const payload = dataKey
      ? {
          [`${dataKey}`]: action?.payload?.isObject
            ? rs?.data?.result?.[0]
            : rs?.data?.result,
        }
      : {};
    console.log('onPostBaseAction-rs', JSON.stringify(payload));

    yield put(getDataSuccess(payload));
    if (action?.callback) {
      action?.callback?.(rs);
    }
  } catch (e: any) {
    console.log('============err==========', e);
    if (error?.response?.data?.errorCode === 'OTP_NOT_EXISTED') {
      // Hiển thị thông báo lỗi cho người dùng
      yield put(setError('Số điện thoại không hợp lệ hoặc OTP đã hết hạn.'));
    } else {
      // Xử lý các lỗi khác nếu cần thiết
      // ...
    }
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
  } finally {
    yield put(actionRequestDone());
  }
}

function* watchPostBaseActions() {
  yield takeLatest(UserActions.POST_BASE_ACTIONS as any, onPostBaseAction);
}

function* onLogoutAction(action) {
  try {
    const rs = yield axiosClient.post(`${API_ENDPOINT.LOGOUT}`);
    console.log('axios-onLogoutAction', action, rs);
    yield put(reset());

    action?.payload && NavigationService.reset(Routes.Login);
    action?.callback?.();
  } catch (e: any) {
    action?.callback?.();
    NavigationService.reset(Routes.Login);
  }
}

function* watchLogout() {
  yield takeLatest(UserActions.LOGOUT as any, onLogoutAction);
}

export default function* userSagas() {
  yield all([watchGetBaseActions(), watchPostBaseActions(), watchLogout()]);
}
