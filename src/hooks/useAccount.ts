/**
 * @description the hook to handle all account's action
 */
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNotify} from './useNotify';
import * as AccountActions from 'store/account';
import {API_ENDPOINT} from 'utils';
import {AccountSelectors} from 'store/account';
import {IFormChangePass, IUserRequestParams, IUtilParams} from 'types';

export const useAccount = () => {
  const dispatch = useDispatch();
  const {danger} = useNotify();
  const {t} = useTranslation();
  const loading = useSelector(AccountSelectors.getLoading);

  const onGetUtils = useCallback(
    async ({type}: IUtilParams, callback?: (a: any) => void) => {
      console.log('=======type====', type);
      try {
        dispatch(
          AccountActions.getBaseActionsRequest(
            {
              endPoint: `${API_ENDPOINT.UTILS}/${type}`,
            },
            rs => callback?.(rs),
          ),
        );
      } catch (error) {
        danger(t('error.general'), error?.message);
      }
    },
    [danger, dispatch, t],
  );

  const onUserRequest = useCallback(
    async (formData: IUserRequestParams, callback?: (a: any) => void) => {
      dispatch(
        AccountActions.postBaseActionsRequest(
          {
            formData: {...formData},
            endPoint: `${API_ENDPOINT.USER_REQUEST}`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
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
    },
    [dispatch, danger, t],
  );

  const onChangePassword = useCallback(
    async (formData: IFormChangePass, callback?: (a: any) => void) => {
      dispatch(
        AccountActions.postBaseActionsRequest(
          {
            formData: {
              oldPassword: formData.oldPassword,
              newPassword: formData.newPassword,
            },
            endPoint: `${API_ENDPOINT.CHANGE_PASSWORD}`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
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
    },
    [dispatch, danger, t],
  );

  return {loading, onGetUtils, onUserRequest, onChangePassword};
};
