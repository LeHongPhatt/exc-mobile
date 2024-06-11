/**
 * @description the hook to handle all account's action
 */
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNotify} from './useNotify';
import {API_ENDPOINT, KEY_CONTEXT} from 'utils';
import {AccountSelectors} from 'store/account';
import {IUtilParams} from 'types';
import {UserSelectors} from 'store/user';
import * as AccountActions from 'store/account';
import {DriverSelectors} from 'store/driver';
import * as DriverActions from 'store/driver';
import {API_HOST} from '@env';
import {useKey} from './useKey';

export const useNotification = () => {
  const dispatch = useDispatch();
  const {danger} = useNotify();
  const [countNoti, setcountNoti] = useState(0);
  const {t} = useTranslation();
  const loading = useSelector(AccountSelectors.getLoading);

  const onGetNotification = useCallback(
    async ({id}, callback?: (a: any) => void) => {
      console.log('=============anh-=============', id);

      try {
        const detail = id ? `/${id}` : '';

        dispatch(
          AccountActions.getBaseActionsRequest(
            {
              endPoint: `${API_ENDPOINT.NOTIFICATION}${detail}`,
            },
            rs => {
              callback?.(rs);
              console.log('=========res noti========', rs.data.result);
            },
          ),
        );
      } catch (error) {
        danger(t('error.general'), error?.message);
      }
    },
    [danger, dispatch, t],
  );

  const onGetNumberNotification = useCallback(
    async ({}, callback?: (a: any) => void) => {
      try {
        dispatch(
          AccountActions.getBaseActionsRequest(
            {
              endPoint: `${API_ENDPOINT.NUMBER_NOTIFICATION}`,
            },
            rs => {
              callback?.(rs);
              console.log('=========res========', rs.data.result[0]);
            },
          ),
        );
      } catch (error) {
        danger(t('error.general'), error?.message);
      }
    },
    [danger, dispatch, t],
  );
  // const onGetDetailNotification = useCallback(
  //   async ({id}, callback?: (a: any) => void) => {
  //     console.log('============id==========', id);
  //     try {
  //       dispatch(
  //         AccountActions.getBaseActionsRequest(
  //           {
  //             endPoint: `${API_ENDPOINT.DETAIL_NOTIFICATION}${detail}`,
  //           },
  //           rs => {
  //             callback?.(rs);
  //             console.log('=========res========', rs);
  //           },
  //         ),
  //       );
  //     } catch (error) {
  //       danger(t('error.general'), error?.message);
  //     }
  //   },
  //   [danger, dispatch, t],
  // );

  return {
    loading,
    onGetNotification,
    onGetNumberNotification,
    // onGetDetailNotification,
  };
};
