/**
 * @description the hook to handle all statistic's action
 */
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNotify} from './useNotify';
import * as StatisticActions from 'store/statistic';
import {API_ENDPOINT} from 'utils';
import {StatisticSelectors} from 'store/statistic';
import {EStatisticTab, IStatisticParams} from 'types';

export const useStatistic = () => {
  const dispatch = useDispatch();
  const {danger} = useNotify();
  const {t} = useTranslation();
  const loading = useSelector(StatisticSelectors.getLoading);

  const onGetStatistic = useCallback(
    async (
      {
        page,
        limit,
        type = EStatisticTab.pick,
        start_time,
        end_time,
        keyword,
      }: IStatisticParams,
      callback?: (a: any) => void,
    ) => {
      console.log('======page=====', page);
      const startTimeParam = start_time ? `&start_time=${start_time}` : '';
      const endTimeParam = end_time ? `&endTime=${end_time}` : '';
      const keywordParam = keyword ? `&keyword=${keyword}` : '';
      try {
        dispatch(
          StatisticActions.getBaseActionsRequest(
            {
              isPaginate: true,
              endPoint: `${API_ENDPOINT.STATISTIC}/${type}?limit=${limit}&page=${page}${startTimeParam}${endTimeParam}${keywordParam}`,
            },
            rs => {
              callback?.(rs),
                console.log('======rs=========', rs.data.result[0]);
            },
          ),
        );
      } catch (error) {
        danger(t('error.general'), error?.message);
      }
    },
    [danger, dispatch, t],
  );

  return {loading, onGetStatistic};
};
