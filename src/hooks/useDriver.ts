/**
 * @description the hook to handle all authentication's action
 */
import {useCallback, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import * as DriverActions from 'store/driver';
import {DriverSelectors} from 'store/driver';
import {useNotify} from './useNotify';
import {API_ENDPOINT, getMsgByDriverAction} from 'utils';
import {NavigationService, Routes} from 'navigation';
import {IDriverDetail, EAction} from 'types';
import {BottomSheetCommon} from 'components/BottomSheet';
import {IItemFormCreateTicket, IRefBottom} from 'types';
import {View, Text} from 'react-native';

export const useDriver = () => {
  const dispatch = useDispatch();
  const {danger, success} = useNotify();
  const {t} = useTranslation();
  const loading = useSelector(DriverSelectors.getLoading);
  const list = useSelector(DriverSelectors.getAttrByKey('list')) || null;
  const listDetail =
    useSelector(DriverSelectors.getAttrByKey('listDetail')) || null;
  const listSearch =
    useSelector(DriverSelectors.getAttrByKey('listSearch')) || null;
  const onDrivers = useCallback(
    async ({id = '', name}) => {
      try {
        const detail = id ? `/${id}` : '';
        const nameParam = name ? `?name=${name}` : '';

        dispatch(
          DriverActions.getBaseActionsRequest({
            dataKey: id ? 'listDetail' : 'list',
            isPaginate: true,
            endPoint: `${API_ENDPOINT.DRIVERS_CITY}${detail}${nameParam}`,
          }),
        );
      } catch (error) {
        danger(t('error.general'), error?.message);
      }
    },
    [danger, dispatch, t],
  );

  const refModalEndDate = useRef<IRefBottom>(null);

  const onGetMessageFromUser = useCallback(
    async ({roomId}, callback?: (a: any) => void) => {
      try {
        dispatch(
          DriverActions.getBaseActionsRequest(
            {
              endPoint: `${API_ENDPOINT.GET_MESSAGE_BY_USER}?roomId=${roomId}&limit=100`,
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

  const onCreateChannel = useCallback(
    async ({userId, ownerId, item, chatInfo}) => {
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            formData: {
              type: 'PRIVATE',
              chatUsers: [{chatId: userId}, {chatId: ownerId}],
              driveId: item?.id,
            },
            endPoint: `${API_ENDPOINT.CREATE_CHAT_ROOM}`,
          },
          rs => {
            console.log('rs-onCreateChannel', JSON.stringify(chatInfo));
            if (rs.status === 200) {
              const data = Array.isArray(rs.data.result)
                ? rs.data?.result?.[0]
                : rs.data;
              data.id &&
                NavigationService.navigate(Routes.Chat, {
                  room: data.id,
                  drive: item,
                  chatInfo: chatInfo,
                });
            }
            // NavigationService.navigate(Routes.ChatDetail)
          },
        ),
      );
    },
    [dispatch],
  );

  const onListOfDetail = useCallback(
    async (
      {group_id, type = 'messages', limit, keyword}: IDriverDetail,
      callback?: (a: any) => void,
    ) => {
      const limitParam = limit ? `?limit=${limit}` : '';
      const keywordParam = keyword ? `?keyword=${keyword}` : '';
      dispatch(
        DriverActions.getBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.DRIVER_DETAIL}/${group_id}/${type}${limitParam}${keywordParam}`,
          },
          rs => callback?.(rs),
        ),
      );
    },
    [dispatch],
  );

  const onCreateTicketInGroup = useCallback(
    async (formData: IItemFormCreateTicket, callback?: (a: any) => void) => {
      console.log('rq-onCreateTicketInGroup', formData);
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            formData: {
              ...formData,
              amount: +formData.amount,
              commission: +formData.commission,
            },
            endPoint: `${API_ENDPOINT.DRIVE}`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
              success('Thành công!', 'Đã tạo thành công cuốc xe');
              const data = Array.isArray(rs.data.result)
                ? rs.data?.result?.[0]
                : rs.data;
              callback?.(rs);
              console.log('======rs====', rs);
            } else {
              // danger(t('error.general'), JSON.stringify(rs?.data));
              callback?.(rs);
            }
          },
        ),
      );
    },
    [dispatch, danger, t],
  );

  const onPickTicket = useCallback(
    async ({phoneNumber, id}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            formData: {phoneNumber},
            endPoint: `${API_ENDPOINT.PICK_TICKET}/${id}`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
              success('Thành công!', 'Đã nhận cuốc xe thành công');
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
    [dispatch, danger, success, t],
  );

  const onReact = useCallback(
    async ({icon, id}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            formData: {icon},
            endPoint: `${API_ENDPOINT.DRIVER_REACT}/${id}`,
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

  const onGetDriveDetail = useCallback(
    async ({driveId}, callback?: (a: any) => void) => {
      try {
        dispatch(
          DriverActions.getBaseActionsRequest(
            {
              endPoint: `${API_ENDPOINT.DRIVE}/${driveId}`,
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

  const onDriveUpdateStatus = useCallback(
    async ({id, status, successMsg}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            formData: {status},
            endPoint: `${API_ENDPOINT.DRIVE_UPDATE_STATUS}/${id}`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
              success('Thành công!', successMsg);
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
    [dispatch, danger, success, t],
  );

  const onDriveUpdate = useCallback(
    async ({formData, driveId}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            formData: {
              name: formData.name,
              payment_type: formData.paymentType,
              amount: +formData.amount,
              commission: +formData.commission,
            },
            endPoint: `${API_ENDPOINT.DRIVE_UPDATE}/${driveId}`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
              success('Thành công!', 'Đã cập nhật cuốc xe');
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
    [dispatch, danger, success, t],
  );

  const onDriveRating = useCallback(
    async ({point, driveId}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            formData: {point},
            endPoint: `${API_ENDPOINT.DRIVE_RATING}/${driveId}`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
              success('Thành công!', 'Đánh giá thành công');
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
    [dispatch, danger, success, t],
  );

  const onGroupDriverChangeAction = useCallback(
    async ({action = EAction.PIN, id}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.DRIVERS_CITY}/${action}/${id}`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
              success('Thành công!', getMsgByDriverAction[action]);
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
    [dispatch, danger, success, t],
  );

  const onGroupDriverDetailChangeAction = useCallback(
    async ({action = EAction.PIN, id}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.DRIVER_DETAIL}/${action}/${id}`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
              success('Thành công!', getMsgByDriverAction[action]);
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
    [dispatch, danger, success, t],
  );

  const onGetMembers = useCallback(
    async ({driverGroupId}, callback?: (a: any) => void) => {
      try {
        dispatch(
          DriverActions.getBaseActionsRequest(
            {
              endPoint: `${API_ENDPOINT.DRIVER_DETAIL}/${driverGroupId}/members`,
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

  const onRemoveMember = useCallback(
    async ({driverGroupId, userId}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.deleteBaseActionsRequest(
          {
            formData: {userId},
            endPoint: `${API_ENDPOINT.DRIVER_DETAIL}/${driverGroupId}/remove_member`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
              success('Thành công!', 'Đã xóa thành công');
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
    [dispatch, danger, success, t],
  );

  const onJoinGroup = useCallback(
    async ({groupId}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.JOIN_GROUP}/${groupId}`,
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

  const onOutGroup = useCallback(
    async ({groupId}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.deleteBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.DRIVER_DETAIL}/${groupId}/out_group`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
              success('Thành công!', 'Đã rời khỏi nhóm');
              const data = Array.isArray(rs.data.result)
                ? rs.data?.result?.[0]
                : rs.data;

              callback?.(data);
              NavigationService.navigate(Routes.Home);
            } else {
              danger(t('error.general'), JSON.stringify(rs?.data));
              callback?.(false);
            }
          },
        ),
      );
    },
    [dispatch, danger, success, t],
  );

  const onUserSetNotification = useCallback(
    async ({action = EAction.NOTI_OFF, id}, callback?: (a: any) => void) => {
      dispatch(
        DriverActions.postBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.SET_NOTIFICATION}/${action}/${id}`,
          },
          rs => {
            if (rs.status >= 200 && rs.status < 300) {
              success('Thành công!', getMsgByDriverAction[action]);
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
    [dispatch, danger, success, t],
  );

  const onSearchDriverGroup = useCallback(
    async ({cityName}, callback?: (a: any) => void) => {
      console.log('cityName', cityName);
      try {
        dispatch(
          DriverActions.getBaseActionsRequest(
            {
              dataKey: 'listSearch',
              isPaginate: true,
              endPoint: `${API_ENDPOINT.DRIVERS_CITY}?cityName=${cityName}`,
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

  return {
    onDrivers,
    list,
    listDetail,
    listSearch,
    onGetMessageFromUser,
    onCreateChannel,
    onListOfDetail,
    onCreateTicketInGroup,
    loading,
    onPickTicket,
    onReact,
    onGetDriveDetail,
    onDriveUpdateStatus,
    onDriveUpdate,
    onDriveRating,
    onGroupDriverChangeAction,
    onGroupDriverDetailChangeAction,
    onGetMembers,
    onRemoveMember,
    onJoinGroup,
    onOutGroup,
    onUserSetNotification,
    onSearchDriverGroup,
  };
};
