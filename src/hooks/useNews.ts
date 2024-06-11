/**
 * @description the hook to handle all news's action
 */
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNotify} from './useNotify';
import * as NewsActions from 'store/news';
import {API_ENDPOINT} from 'utils';
import {NewsSelectors} from 'store/news';

export const useNews = () => {
  const dispatch = useDispatch();
  const {danger} = useNotify();
  const {t} = useTranslation();
  const loading = useSelector(NewsSelectors.getLoading);

  const newsList = useSelector(NewsSelectors.getAttrByKey('newsList')) || null;

  const newsDetail =
    useSelector(NewsSelectors.getAttrByKey('newsDetail')) || null;

  const onGetNews = useCallback(
    async ({id = ''}) => {
      try {
        const detail = id ? `/${id}` : '';

        dispatch(
          NewsActions.getBaseActionsRequest({
            dataKey: id ? 'newsDetail' : 'newsList',
            isPaginate: true,
            endPoint: `${API_ENDPOINT.NEWS}${detail}`,
          }),
        );
      } catch (error) {
        danger(t('error.general'), error?.message);
      }
    },
    [danger, dispatch, t],
  );

  return {loading, newsList, newsDetail, onGetNews};
};
