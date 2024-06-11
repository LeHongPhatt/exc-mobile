import {FlatList, View} from 'react-native';
import React, {useEffect, useState, createRef, useCallback} from 'react';
import styles from './styles';
import {
  Buttons,
  HomeLayout,
  IconCus,
  ImageCus,
  TextCus,
  TouchCus,
} from 'components';
import {
  getHeight,
  getPaddingVertical,
  getWidth,
  showImgSrc,
  styleSpacing,
} from 'utils';
import {Divider, List} from 'react-native-paper';
import Icon from 'assets/svg/Icon';
import {Images} from 'assets';
import {Colors} from 'theme';
import {NavigationService, Routes} from 'navigation';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {EAction} from 'types';
import {useDriver} from 'hooks';

const ListDriver = () => {
  const {params}: any = NavigationService.route() || '';
  const [action, setAction] = useState('');
  const {
    loading,
    listDetail,
    onDrivers,
    onGroupDriverChangeAction,
    onGroupDriverDetailChangeAction,
    onJoinGroup,
    onOutGroup,
    onUserSetNotification,
  } = useDriver();
  const [rows, setRows] = useState([]);
  const [elRefs, setElRefs] = useState([]);
  const [pin, setPin] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (params?.province?.is_pin ?? false) {
      setAction(EAction.PIN);
    } else {
      setAction(EAction.UNPIN);
    }
    params?.province?.is_pin && setPin(params?.province?.is_pin);
  }, [params?.province?.is_pin]);

  useEffect(() => {
    setElRefs(e =>
      Array(rows?.length)
        .fill()
        .map((_, i) => e[i] || createRef()),
    );
  }, [rows?.length]);

  useEffect(() => {
    // console.log('useDriver-ListDriver', listDetail, params);
    const data = listDetail?.result || [];
    const copyData = [...data];
    const sortData = copyData.sort((a, b) => b?.is_pin - a?.is_pin);
    setRows(sortData);
  }, [listDetail]);

  const onChangeActionPin = () => {
    if (pin) {
      setAction(EAction.UNPIN);
    } else {
      setAction(EAction.PIN);
    }
    onGroupDriverChangeAction(
      {
        id: params?.id,
        action: pin ? EAction.UNPIN : EAction.PIN,
      },
      () => {
        setPin(!pin);
        onDrivers({});
        setAction();
      },
    );
  };

  const onDetailChangeActionPin = (item, index) => {
    onGroupDriverDetailChangeAction(
      {
        id: item?.id,
        action: item?.is_pin ? EAction.UNPIN : EAction.PIN,
      },
      () => {
        elRefs[index].current?.close();
        onDrivers({id: params?.id});
      },
    );
  };

  const onDetailChangeActionNoti = (item, index) => {
    onUserSetNotification(
      {
        id: item?.id,
        action: item?.is_get_notification ? EAction.NOTI_OFF : EAction.NOTI_ON,
      },
      () => {
        elRefs[index].current?.close();
        onDrivers({id: params?.id});
      },
    );
  };

  const onJoinChatGroup = item => {
    if (item?.is_joined) {
      NavigationService.navigate(Routes.GroupDriverDetail, {
        id: item?.id,
        item,
      });
    } else {
      onJoinGroup({groupId: item?.id}, rs => {
        if (rs) {
          onDrivers({id: params?.id});
          setTimeout(() => {
            NavigationService.navigate(Routes.GroupDriverDetail, {
              id: item?.id,
              item,
            });
          }, 500);
        }
      });
    }
  };

  const onOutChatGroup = (item, index) => {
    onOutGroup({groupId: item?.id}, rs => {
      if (rs) {
        elRefs[index].current?.close();
        onDrivers({id: params?.id});
      }
    });
  };

  const rightSwipeActions = (item, index) => (
    <View style={[styles.row, styles.wrapSwipe]}>
      <TouchCus
        style={[styles.boxSwipe, styles.bgPin, styles.cenItemvh]}
        onPress={() => onDetailChangeActionPin(item, index)}>
        {item?.is_pin ? Icon.UnPin({width: 28, height: 28}) : <Icon.Pin />}
      </TouchCus>
      {item?.is_joined && (
        <TouchCus
          style={[styles.boxSwipe, styles.bgBellOff, styles.cenItemvh]}
          onPress={() => onDetailChangeActionNoti(item, index)}>
          {item?.is_get_notification ? (
            <Icon.BellOff />
          ) : (
            Icon.SolidBell({width: 28, height: 28})
          )}
        </TouchCus>
      )}
      {item?.is_joined && (
        <TouchCus
          style={[styles.boxSwipe, styles.bgDel, styles.cenItemvh]}
          onPress={() => onOutChatGroup(item, index)}>
          <Icon.Logout />
        </TouchCus>
      )}
    </View>
  );

  const renderSwipeableLeft = (item: any) => (
    <ImageCus
      source={showImgSrc('', item?.image, Images.driver)}
      style={styles.wrapImg}
    />
  );

  const renderSwipableRight = item => (
    <View style={styles.cenItemvh}>
      {!item?.is_joined ? (
        <View style={[styles.row, styles.cenItem]}>
          {item?.is_pin &&
            Icon.Pin({color: Colors.border, width: 16, height: 16})}
          <Buttons
            style={styles.btnMain}
            disabled={loading}
            onPress={() => onJoinChatGroup(item)}>
            <TextCus whiteColor>Truy cập</TextCus>
          </Buttons>
        </View>
      ) : (
        <View style={[styles.alignEnd, styles.rightEnd]}>
          <View style={[styles.row, styles.cenItem]}>
            {item?.is_pin &&
              Icon.Pin({color: Colors.border, width: 16, height: 16})}
            {!item?.is_get_notification && (
              <View style={styleSpacing('ml-6')}>
                {Icon.BellOff({color: Colors.border, width: 15, height: 15})}
              </View>
            )}
            <TextCus label2 bgInput ml-6>
              1 giây
            </TextCus>
          </View>
          <View style={getHeight(6)} />
          <View style={[{backgroundColor: Colors.main}, styles.radius12]}>
            <TextCus caption1 medium whiteColor px-4>
              99+
            </TextCus>
          </View>
        </View>
      )}
    </View>
  );

  const renderDriverGroup = (item: any, index) => (
    <>
      <Swipeable
        key={item?.id}
        ref={elRefs[index]}
        renderRightActions={() => rightSwipeActions(item, index)}>
        <View style={styles.pH16} key={item}>
          <List.Item
            title={
              <TextCus body1 medium>
                {item?.name}
              </TextCus>
            }
            disabled={loading}
            onPress={() => onJoinChatGroup(item)}
            style={[getPaddingVertical(1)]}
            description={<TextCus body2>{item?.sub_name}</TextCus>}
            left={() => renderSwipeableLeft(item)}
            right={() => renderSwipableRight(item)}
          />
        </View>
      </Swipeable>
      <Divider style={getHeight(1)} />
    </>
  );

  const headerProps = {
    showCenter: false,
    renderLeft: useCallback(
      () => (
        <View style={[styles.row, styles.cenItemvh]}>
          <IconCus name={'chevron-left'} size={18} color={Colors.white} />
          <ImageCus
            source={showImgSrc('', params?.icon, Images.driver)}
            style={[styles.wrapImg, styles.ml13]}
          />
          <View style={styles.ml6}>
            <TextCus body1 whiteColor semibold>
              {params?.name}
            </TextCus>
            <TextCus body2 whiteColor>
              1 nhóm chat
            </TextCus>
          </View>
        </View>
      ),
      [],
    ),
    renderRight: () => (
      <View style={[styles.row, styles.cenItemvh]}>
        <TouchCus onPress={() => setAction(EAction.SEARCH)}>
          <Icon.Search />
        </TouchCus>
        <View style={getWidth(14)} />
        <TouchCus onPress={() => onChangeActionPin()}>
          {pin
            ? Icon.UnPin({width: 22, height: 22})
            : Icon.Pin({width: 22, height: 22})}
        </TouchCus>
      </View>
    ),
  };
  const optAction = {action, setAction};
  // console.log(rows);
  return (
    <HomeLayout
      statusBarMode={'dark-content'}
      bgColor={Colors.main}
      header={{...headerProps}}
      {...optAction}
      inputProps={{
        onChangeText: text => {
          setSearch(text);
          setTimeout(() => {
            onDrivers({id: params?.id, name: text});
          }, 2000);
        },
        value: search,
      }}
      onPress={() => {
        onDrivers({id: params?.id, name: search});
      }}>
      <View style={styles.container}>
        <FlatList
          data={rows} // rows
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => renderDriverGroup(item, index)}
        />
      </View>
    </HomeLayout>
  );
};
export default ListDriver;
