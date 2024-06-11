/**
 * @description the hook to handle all authentication's action
 */
// import {useKey} from 'hooks';
// import {NavigationService, Routes} from 'navigation';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import * as UserActions from 'store/user';
import {UserSelectors} from 'store/user';
import {IFormDataLogin, IFormVerifyOTP, IUser} from 'types';
import {useNotify} from './useNotify';
import {useKey} from './useKey';
import {
  API_ENDPOINT,
  EnumOTPType,
  KEY_CONTEXT,
  formatDMYIso,
  formatDBYMDHM,
} from 'utils';
import {NavigationService, Routes} from 'navigation';
import {API_HOST} from '@env';

export const useAuth = () => {
  const dispatch = useDispatch();
  const {danger, success} = useNotify();
  const {saveKeyStore, resetKeyStore} = useKey();
  const {t} = useTranslation();
  const loading = useSelector(UserSelectors.getLoading);

  const token = useSelector(UserSelectors.getAttrByKey('accessToken'));

  const user =
    (useSelector(UserSelectors.getAttrByKey('user')) as IUser) || null;
  console.log('===============user============', user);

  const profile = useSelector(UserSelectors.getAttrByKey('profile')) || null;
  console.log('===============profile============', profile);
  const onRequestOTP = useCallback(
    async (formData: IFormDataLogin) => {
      try {
        dispatch(
          UserActions.postBaseActionsRequest(
            {
              formData,
              endPoint: API_ENDPOINT.REQUEST_OTP,
            },
            async res => {
              console.log('================staa==========', res);
              if ([200, 406].includes(res?.status)) {
                const data = res?.data?.result?.[0] || '';
                const r =
                  res?.status === 406 ? Routes.InputPassword : Routes.OTP;
                NavigationService.navigate(r, {
                  ...data,
                  phone_number: formData.phoneNumber,
                  ...formData,
                  typeCheck: EnumOTPType.REGISTER,
                });
              } else {
                danger(t('error.general'), `${API_HOST}${JSON.stringify(res)}`);
              }
            },
          ),
        );
      } catch (error) {
        console.log('================error==========', error);
        danger(t('error.general'), `${API_HOST}catch`);
      }
    },
    [danger, dispatch, t],
  );

  const onForgotPWOTP = useCallback(
    async (formData: IFormDataLogin) => {
      try {
        dispatch(
          UserActions.postBaseActionsRequest(
            {
              formData,
              endPoint: API_ENDPOINT.FORGOT_PW_OTP,
            },
            async res => {
              if (res?.status === 200) {
                const data = res?.data?.result?.[0] || '';
                NavigationService.navigate(Routes.OTP, {
                  ...data,
                  ...formData,
                });
              } else {
                danger(t('error.general'), `${API_HOST}${JSON.stringify(res)}`);
              }
            },
          ),
        );
      } catch (error) {
        danger(t('error.general'), `${API_HOST}catch`);
      }
    },
    [danger, dispatch, t],
  );

  const onResendOTP = useCallback(
    async (
      {phoneNumber, typeCheck}: {phoneNumber: string; typeCheck: string},
      callback?: (a: any) => void,
    ) => {
      console.log('rq-resendOTP', phoneNumber, typeCheck);
      try {
        dispatch(
          UserActions.postBaseActionsRequest(
            {
              formData: {phoneNumber},
              endPoint:
                typeCheck === EnumOTPType.FORGOT
                  ? API_ENDPOINT.FORGOT_PW_OTP
                  : API_ENDPOINT.REQUEST_OTP,
            },
            async res => {
              if (res?.status === 200) {
                const data = res?.data?.result?.[0] || '';
                callback?.(data);
              } else {
                danger(t('error.general'), `${API_HOST}${JSON.stringify(res)}`);
              }
            },
          ),
        );
      } catch (error) {
        danger(t('error.general'), `${API_HOST}catch`);
      }
    },
    [danger, dispatch, t],
  );

  // const onVerifyOTP = useCallback(
  //   async (formData: IFormVerifyOTP) => {
  //     try {
  //       dispatch(
  //         UserActions.postBaseActionsRequest(
  //           {
  //             formData,
  //             endPoint: API_ENDPOINT.VERIFY_OTP,
  //           },
  //           async res => {
  //             if (res?.status === 200) {
  //               const data = res.data.result[0] || {};
  //               NavigationService.navigate(Routes.ResetPassword, {
  //                 ...data,
  //                 ...formData,
  //               });
  //             } else {
  //               // danger(t('error.general'), `${res?.data?.message}`);
  //               console.log('==res==============', res);
  //             }
  //           },
  //         ),
  //       );
  //     } catch (error) {
  //       danger(t('error.general'), `${error?.message}`);
  //     }
  //   },
  //   [danger, dispatch, t],
  // );

  const onVerifyOTP = useCallback(
    async (formData: IFormVerifyOTP, callback?: (data: any) => void) => {
      try {
        dispatch(
          UserActions.postBaseActionsRequest(
            {
              formData,
              endPoint: API_ENDPOINT.VERIFY_OTP,
            },
            async res => {
              if (res?.status === 200) {
                const data = res.data.result[0] || {};
                NavigationService.navigate(Routes.ResetPassword, {
                  ...data,
                  ...formData,
                });
              } else {
                callback(res);
                // danger(t('error.general'), `${res?.data?.message}`);
                console.log('==res==============', res);
              }
            },
          ),
        );
      } catch (error) {
        console.log('Error in onVerifyOTP:', error); // Thêm dòng này để log lỗi
        danger(t('error.general'), `${error?.message}`);
      }
    },
    [danger, dispatch, t],
  );

  const onLogin = useCallback(
    async ({phoneNumber, password}, callback?: (a: any) => void) => {
      try {
        dispatch(
          UserActions.postBaseActionsRequest(
            {
              formData: {phoneNumber, password},
              dataKey: 'user',
              isObject: true,
              endPoint: API_ENDPOINT.LOGIN,
            },
            async res => {
              const data = res?.data;
              if (res?.status === 200) {
                const result = data?.result[0] || {};
                console.log('data-onLogin', data);
                saveKeyStore(KEY_CONTEXT.ACCESS_TOKEN, result.accessToken);
                saveKeyStore(KEY_CONTEXT.USER, JSON.stringify(result));
                callback?.(data);
                console.log('=============res===========', data);
              } else {
                callback?.(false, data?.message ?? '');
                danger(t('error.general'), data.message ?? '');
                console.log('====error=========', data.message);
              }
            },
          ),
        );
      } catch (error) {
        danger(t('error.general'), `${error?.message}`);
        callback?.(false);
      }
    },
    [danger, dispatch, t],
  );

  const onResetPassword = useCallback(
    async (
      {
        password,
        phoneNumber,
        typeCheck,
      }: {password: string; phoneNumber: string; typeCheck?: string},
      callback?: (a: any) => void,
    ) => {
      try {
        dispatch(
          UserActions.postBaseActionsRequest(
            {
              dataKey: 'user',
              formData: {password, phoneNumber},
              endPoint:
                typeCheck === EnumOTPType.REGISTER
                  ? API_ENDPOINT.FORGOT_PW
                  : API_ENDPOINT.CREATE_USER,
            },
            async res => {
              if (res?.status === 200) {
                const data = res.data.result[0] || {};
                saveKeyStore(KEY_CONTEXT.ACCESS_TOKEN, data.accessToken);
                saveKeyStore(KEY_CONTEXT.USER, JSON.stringify(data));
                callback?.(data);
              } else {
                danger(t('error.general'), `${res?.data?.message}`);
                callback?.(false);
              }
            },
          ),
        );
      } catch (error) {
        danger(t('error.general'), `${error?.message}`);
        callback?.(false);
      }
    },
    [danger, dispatch, t],
  );

  const onLogout = useCallback(async () => {
    await resetKeyStore();

    dispatch(UserActions.logoutRequest({redirect: true}));
  }, [danger, dispatch, t]);

  const getUserProfile = useCallback(async () => {
    try {
      dispatch(
        UserActions.getBaseActionsRequest({
          dataKey: 'profile',
          endPoint: `${API_ENDPOINT.GET_PROFILE}`,
        }),
      );
    } catch (error) {
      danger(t('error.general'), error?.message);
    }
  }, [danger, dispatch, t]);

  const onUpdateInfoUser = useCallback(
    async (
      {formData, userId, showToast = true},
      callback?: (a: any) => void,
    ) => {
      console.log('=======formData1========', formData);
      console.log('=======userId========', userId);
      try {
        const _formData = new FormData();
        if (formData?.avatar?.uri) {
          _formData.append('avatar', {
            type: formData?.avatar?.fileType,
            name: 'image.jpg',
            uri: formData?.avatar?.uri,
          });
        }
        _formData.append('fullName', formData.fullName);
        _formData.append('phone', formData.phone);
        if (formData?.email) {
          _formData.append('email', formData.email);
        }
        if (formData?.accountBank) {
          _formData.append('accountBank', formData.accountBank);
        }
        if (formData?.identificationFront) {
          if (typeof formData?.identificationFront === 'object') {
            _formData.append('identificationFront', {
              type: formData?.identificationFront?.fileType,
              name: 'image.jpg',
              uri: formData?.identificationFront?.uri,
            });
          }
        }
        if (formData?.identificationBack) {
          if (typeof formData?.identificationBack === 'object') {
            _formData.append('identificationBack', {
              type: formData?.identificationBack?.fileType,
              name: 'image.jpg',
              uri: formData?.identificationBack?.uri,
            });
          }
        }
        if (formData?.licenseFront) {
          if (typeof formData?.licenseFront === 'object') {
            _formData.append('licenseFront', {
              type: formData?.licenseFront?.fileType,
              name: 'image.jpg',
              uri: formData?.licenseFront?.uri,
            });
          }
        }
        if (formData?.licenseBack) {
          if (typeof formData?.licenseBack === 'object') {
            _formData.append('licenseBack', {
              type: formData?.licenseBack?.fileType,
              name: 'image.jpg',
              uri: formData?.licenseBack?.uri,
            });
          }
        }
        if (formData?.birthday) {
          _formData.append('birthday', formatDMYIso(formData?.birthday));
        }
        if (formData?.address) {
          _formData.append('address', formData.address);
        }
        dispatch(
          UserActions.postBaseActionsRequest(
            {
              formData: _formData,
              endPoint: `${API_ENDPOINT.UPDATE_PROFILE}/${userId}`,
              isFormData: true,
              headers: {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            },
            rs => {
              console.log('=======rs========', rs);
              if (rs?.status === 200) {
                showToast && success('Thành công', 'Cập nhật thành công');
                const data = Array.isArray(rs.data.result)
                  ? rs.data?.result?.[0]
                  : rs.data;
                callback?.(data);
              } else {
                danger(t('error.general'), JSON.stringify(rs?.data));
                callback?.(false);
              }
            },
          ),
        );
      } catch (error) {
        console.log('error-useAuth');
        danger(t('error.general'), `${error?.message}`);
      }
    },
    [dispatch, success, danger, t],
  );

  return {
    onRequestOTP,
    onForgotPWOTP,
    onResendOTP,
    onVerifyOTP,
    onResetPassword,
    token,
    user,
    profile,
    loading,
    onLogin,
    onLogout,
    getUserProfile,
    onUpdateInfoUser,
  };
};
