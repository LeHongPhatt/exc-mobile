import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HomeLayout, IconCus, TextCus, TouchCus} from 'components';
import {Colors} from 'theme';
import {getPaddingHorizontal} from 'utils';
import styles from './styles';
import {useNotification} from 'hooks';
import moment from 'moment';
import {NavigationService} from 'navigation';

const Notification = () => {
  const {params} = NavigationService.route() || '';
  const {onGetNotification} = useNotification();

  const [noti, setNoti] = useState([]);

  useEffect(() => {
    onGetNotification({id: params?.id}, rs => {
      Array.isArray(rs?.data?.result) && setNoti(rs?.data?.result);
    });
  }, [onGetNotification]);

  const renderStick = isRead => {
    const bellColor = isRead ? Colors.gray82 : Colors.mainLight;
    return (
      <View style={[styles.activeBell, {backgroundColor: bellColor}]}>
        <IconCus name={'bell'} size={12} color={Colors.white} />
      </View>
    );
  };
  const TextCustom = ({style, isRead, ...props}) => {
    const textColor = isRead ? Colors.black : Colors.black;
    return <TextCus style={[{color: textColor}, style]} {...props} />;
  };

  const handleNotificationPress = noti => {
    if (!noti.is_read) {
      onGetNotification({id: noti.id}, rs => {
        const updatedNoti = {...noti, is_read: true};
        const updatedNotiList = noti.map(item =>
          item.id === updatedNoti.id ? updatedNoti : item,
        );
        setNoti(updatedNotiList);
      });
    }
  };

  const renderData = noti => {
    const isRead = noti?.is_read;
    return (
      <View>
        <TouchCus
          onPress={handleNotificationPress(noti)}
          style={styles.notiContainer}>
          <TextCustom isRead={isRead} bold title4 style={{marginBottom: 5}}>
            {noti.title}
          </TextCustom>
          <TextCus grayColor>{noti?.content}</TextCus>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
            {renderStick(isRead)}
            <TextCus grayColor>
              {moment(noti?.createdAt).format('DD/MM/YYYY HH:mm')}
            </TextCus>
          </View>
        </TouchCus>
      </View>
    );
  };
  return (
    <HomeLayout
      bgColor={Colors.white}
      statusBarMode={'dark-content'}
      safeAreaEdges={['left', 'top', 'right']}
      header={{
        notGoBack: false,
        renderLeft: () => (
          <IconCus name={'chevron-left'} size={18} color={Colors.white} />
        ),
        renderCenter: () => (
          <TextCus title3 whiteColor medium>
            Thông báo
          </TextCus>
        ),
        renderRight: () => (
          <View>
            {/* <TouchCus onPress={() => {}} style={[styles.row, styles.endItemvh]}>
              <Icon.ChatIcon />
            </TouchCus> */}
            <TouchCus onPress={() => console.log('==========')}>
              <IconCus size={18} color={Colors.white} />
              <View style={[getPaddingHorizontal(8)]}></View>
            </TouchCus>
          </View>
        ),
      }}>
      <ScrollView>{noti.map(renderData)}</ScrollView>
    </HomeLayout>
  );
};
export default Notification;
