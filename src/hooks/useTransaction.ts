/**
 * @description the hook to handle all transaction's action
 */
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNotify} from './useNotify';
import * as TransactionActions from 'store/transaction';
import {API_ENDPOINT} from 'utils';
import {TransactionSelectors} from 'store/transaction';
import {ITransactionParams} from 'types';

export const useTransaction = () => {
  const dispatch = useDispatch();
  const {danger} = useNotify();
  const {t} = useTranslation();
  const loading = useSelector(TransactionSelectors.getLoading);

  const onGetTransaction = useCallback(
    async (
      {page, limit, type, start_time, end_time}: ITransactionParams,

      callback?: (a: any) => void,
    ) => {
      console.log('========page=========', page);
      const typeParams = type ? `&type=${type}` : '';
      const startTimeParams = start_time ? `&start_time=${start_time}` : '';
      const endTimeParams = end_time ? `&end_time=${end_time}` : '';
      try {
        dispatch(
          TransactionActions.getBaseActionsRequest(
            {
              isPaginate: true,
              endPoint: `${API_ENDPOINT.TRANSACTION}?limit=${limit}&page=${page}${typeParams}${startTimeParams}${endTimeParams}`,
            },
            rs => {
              console.log('========res=========', rs.data.result);
              callback?.(rs); // Gọi hàm callback và truyền giá trị rs
            },
          ),
        );
      } catch (error) {
        danger(t('error.general'), error?.message);
      }
    },
    [danger, dispatch, t],
  );

  return {loading, onGetTransaction};
};
