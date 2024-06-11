import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {HomeLayout, TextCus, IconCus, TouchCus, ImageCus} from 'components';
import styles from './styles';
import {Images} from 'assets';
import {
  getPaddingHorizontal,
  getHeight,
  getPaddingVertical,
  showImgSrc,
} from 'utils';
import {Colors} from 'theme';
import Icon from 'assets/svg/Icon';
import {NavigationService, Routes} from 'navigation';
import {Divider} from 'react-native-paper';
import {useDriver} from 'hooks';
import {EAction} from 'types';

const DriverCustom = () => {
  const {params}: any = NavigationService.route() || '';
  const [pin, setPin] = useState(false);
  const [notiOff, setNotiOff] = useState(false);
  const {
    onDrivers,
    onGroupDriverDetailChangeAction,
    onUserSetNotification,
    onOutGroup,
  } = useDriver();

  console.log('---params', params);

  useEffect(() => {
    params?.is_pin && setPin(params?.is_pin);
  }, [params?.is_pin]);

  useEffect(() => {
    if (params?.is_get_notification) {
      setNotiOff(false);
    } else {
      setNotiOff(true);
    }
  }, [params?.is_get_notification]);

  const onDetailChangeActionPin = () => {
    onGroupDriverDetailChangeAction(
      {
        id: params?.id,
        action: pin ? EAction.UNPIN : EAction.PIN,
      },
      () => {
        setPin(!pin);
        onDrivers({id: params?.group_driver_id});
      },
    );
  };

  const onDetailChangeActionNoti = () => {
    onUserSetNotification(
      {
        id: params?.id,
        action: notiOff ? EAction.NOTI_ON : EAction.NOTI_OFF,
      },
      () => {
        setNotiOff(!notiOff);
        onDrivers({id: params?.group_driver_id});
      },
    );
  };

  const onOutChatGroup = () => {
    onOutGroup({groupId: params?.id}, rs => {
      if (rs) {
        onDrivers({id: params?.group_driver_id});
      }
    });
  };

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Tùy chọn
      </TextCus>
    ),
  };

  return (
    <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cenItem}>
            <ImageCus
              source={showImgSrc('', params?.image, Images.driver)}
              style={[styles.wrapAvatar, styles.mt14]}
            />
            <TextCus title4 medium mt-12>
              {params?.name}
            </TextCus>
          </View>
          <View
            style={[
              styles.row,
              styles.spaceAround,
              getPaddingVertical(16),
              getPaddingHorizontal(16),
            ]}>
            <TouchCus onPress={() => {}}>
              <View style={styles.cenItem}>
                <View style={[styles.wrapIcon, styles.cenItemvh]}>
                  {Icon.CupertinoSearch({color: Colors.border})}
                </View>
                <TextCus caption1 style={styles.mt4}>
                  Tìm cuốc xe
                </TextCus>
              </View>
            </TouchCus>
            <TouchCus onPress={() => onDetailChangeActionPin()}>
              <View style={styles.cenItem}>
                <View
                  style={[
                    styles.wrapIcon,
                    styles.cenItemvh,
                    {
                      backgroundColor: pin
                        ? Colors.mainLight
                        : Colors.bgBlocAdv,
                    },
                  ]}>
                  {pin ? (
                    <Icon.UnPin />
                  ) : (
                    Icon.Pin({color: Colors.border, width: 16, height: 16})
                  )}
                </View>
                <TextCus caption1 style={styles.mt4}>
                  Ghim nhóm
                </TextCus>
              </View>
            </TouchCus>
            <TouchCus onPress={() => onDetailChangeActionNoti()}>
              <View style={styles.cenItem}>
                <View
                  style={[
                    styles.wrapIcon,
                    styles.cenItemvh,
                    {
                      backgroundColor: notiOff
                        ? Colors.mainLight
                        : Colors.bgBlocAdv,
                    },
                  ]}>
                  {notiOff
                    ? Icon.BellOff({color: Colors.white, width: 16, height: 16})
                    : Icon.SolidBell({color: Colors.border})}
                </View>
                <TextCus caption1 style={styles.mt4}>
                  Tắt thông báo
                </TextCus>
              </View>
            </TouchCus>
          </View>
          <Divider style={[getHeight(8), {backgroundColor: Colors.whisper}]} />
          <TouchCus
            onPress={() =>
              NavigationService.navigate(Routes.MemberList, {
                ...params,
                driver_group_id: params?.id,
              })
            }>
            <View
              style={[
                styles.row,
                styles.cenItem,
                styles.wrapOption,
                getPaddingVertical(8),
              ]}>
              <View style={getPaddingHorizontal(16)}>
                {Icon.Members({color: Colors.border})}
              </View>
              <TextCus style={styles.flex}>Xem thành viên</TextCus>
              <View style={getPaddingHorizontal(16)}>
                {Icon.ChevronRight({color: Colors.border})}
              </View>
            </View>
          </TouchCus>
          {/* <View
            style={[
              styles.row,
              styles.cenItem,
              styles.wrapOption,
              getPaddingVertical(8),
            ]}>
            <View style={getPaddingHorizontal(16)}>
              {Icon.Key({color: Colors.border})}
            </View>
            <TextCus style={styles.flex}>Chuyển quyền quản trị</TextCus>
            <View style={getPaddingHorizontal(16)}>
              {Icon.ChevronRight({color: Colors.border})}
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.cenItem,
              styles.wrapOption,
              getPaddingVertical(8),
            ]}>
            <View style={getPaddingHorizontal(16)}>
              {Icon.Comment({color: Colors.border})}
            </View>
            <TextCus style={styles.flex}>Tạo bảng tin thông báo</TextCus>
            <View style={getPaddingHorizontal(16)}>
              {Icon.ChevronRight({color: Colors.border})}
            </View>
          </View>
          <TouchCus
            onPress={() => {
              // NavigationService.navigate(Routes.Vote);
            }}
            style={[
              styles.row,
              styles.cenItem,
              styles.wrapOption,
              getPaddingVertical(8),
            ]}>
            <View style={getPaddingHorizontal(16)}>
              {Icon.Vote({color: Colors.border})}
            </View>
            <TextCus style={styles.flex}>Tạo bình chọn</TextCus>
            <View style={getPaddingHorizontal(16)}>
              {Icon.ChevronRight({color: Colors.border})}
            </View>
          </TouchCus> */}
          <TouchCus onPress={() => onOutChatGroup()}>
            <View
              style={[
                styles.row,
                styles.cenItem,
                styles.wrapOption,
                getPaddingVertical(8),
              ]}>
              <View style={getPaddingHorizontal(16)}>
                {Icon.SolidLogout({color: Colors.colorRed})}
              </View>
              <TextCus style={[styles.flex, {color: Colors.colorRed}]}>
                Rời nhóm
              </TextCus>
            </View>
          </TouchCus>
        </ScrollView>
      </View>
    </HomeLayout>
  );
};

export default DriverCustom;
