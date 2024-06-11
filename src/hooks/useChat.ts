import {DriverSelectors} from 'store/driver';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {useNotify} from './useNotify';
import {useTranslation} from 'react-i18next';
import {API_ENDPOINT, KEY_CONTEXT, axiosClient} from 'utils';
import * as DriverActions from 'store/driver';
import {API_HOST} from '@env';
import {useKey} from './useKey';

export const useChat = () => {
  const dispatch = useDispatch();
  const {danger} = useNotify();
  const {t} = useTranslation();
  const listUserChat =
    useSelector(DriverSelectors.getAttrByKey('listUser')) || null;

  const onUserChat = useCallback(async () => {
    try {
      dispatch(
        DriverActions.getBaseActionsRequest({
          dataKey: 'listUser',
          isPaginate: true,
          endPoint: `${API_ENDPOINT.GET_LIST_CHAT_BY_USER}`,
        }),
      );
    } catch (error) {
      danger(t('error.general'), error?.message);
    }
  }, [danger, dispatch, t]);

  const onSearchMessage = useCallback(
    async ({roomId, keyword}, callback?: (a: any) => void) => {
      try {
        dispatch(
          DriverActions.getBaseActionsRequest(
            {
              endPoint: `${API_ENDPOINT.SEARCH_MESSAGE}?roomId=${roomId}&keyword=${keyword}`,
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

  const onImageMessage = useCallback(
    async ({roomId, imageFiles}, callback?: (a: any) => void) => {
      try {
        if (imageFiles.length === 0 || imageFiles.length > 10) {
          console.error('Số lượng tệp hình ảnh không hợp lệ');
          return;
        }
        const formData = new FormData();
        imageFiles.forEach((image, index) => {
          formData.append('imageFiles', {
            uri: image.path,
            type: 'image/jpeg',
            name: 'image.jpg',
          });
        });
        const {getKeyStore} = useKey();
        const token = await getKeyStore(KEY_CONTEXT.ACCESS_TOKEN);
        console.log('====token======', JSON.stringify(token));
        if (token) {
          fetch(
            `${API_HOST}/${API_ENDPOINT.GET_MESSAGE_IMAGE}?roomId=${roomId}`,
            {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + token,
                ContentType: 'multipart/form-data',
              },
              body: formData,
            },
          ).then(async response => {
            const resJson = await response.json();
            callback?.(resJson.data);
          });
        }
      } catch (error) {
        console.error('========error=======:', error);
      }
    },
    [],
  );

  return {
    listUserChat,
    onUserChat,
    onSearchMessage,
    onImageMessage,
  };
};
