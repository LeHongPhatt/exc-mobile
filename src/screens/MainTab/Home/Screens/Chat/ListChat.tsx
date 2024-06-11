import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {HomeLayout, IconCus, ImageCus, TextCus, TouchCus} from 'components';
import {getHeight, getPaddingVertical, getWidth} from 'utils';
import {Divider, List} from 'react-native-paper';
import Icon from 'assets/svg/Icon';
import {Images} from 'assets';
import {Colors} from 'theme';
import {NavigationService, Routes} from 'navigation';
import {EAction} from 'types';
import {useChat} from 'hooks';

const ListChat = () => {
  const {params}: any = NavigationService.route() || '';
  const [action, setAction] = useState('');
  const {listUserChat} = useChat();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log('useDriver-result', listUserChat);
    listUserChat?.result && setRows(listUserChat?.result);
  }, [listUserChat]);

  const renderListUser = (item: any) => (
    <>
      <View style={styles.pH16} key={item}>
        <List.Item
          title={
            <TextCus body1 medium>
              {item?.name}
            </TextCus>
          }
          onPress={() => {
            console.log('params-onPress', params);
            NavigationService.navigate(Routes.Chat, {
              room: item.id,
              item: params.item,
            });
            // const items = params?.item;
            // onCreateChannel({
            //   userId: user.sub,
            //   driverId: item.id,
            //   item: items,
            // });
          }}
          style={[getPaddingVertical(1)]}
          description={<TextCus body2>{item?.sub_name}</TextCus>}
          left={() => (
            <ImageCus source={Images.flash_01} style={styles.wrapImg} />
          )}
        />
      </View>
      <Divider style={getHeight(1)} />
    </>
  );

  const headerProps = {
    showCenter: false,
    renderLeft: () => (
      <View style={[styles.row, styles.cenItemvh]}>
        <IconCus name={'chevron-left'} size={18} color={Colors.white} />
        <ImageCus
          source={params?.icon ?? Images.hd_user}
          style={[styles.wrapImg, styles.ml13]}
        />
        <View style={styles.ml6}>
          <TextCus body1 whiteColor semibold>
            {params?.name}
          </TextCus>
          <TextCus body2 whiteColor>
            12 nhóm chat
          </TextCus>
        </View>
      </View>
    ),
    renderRight: () => (
      <View style={[styles.row, styles.cenItemvh]}>
        <TouchCus onPress={() => setAction(EAction.SEARCH)}>
          <Icon.Search />
        </TouchCus>
        <View style={getWidth(14)} />
        <TouchCus onPress={() => setAction(EAction.PIN)}>
          {Icon.Pin({width: 22, height: 22})}
        </TouchCus>
      </View>
    ),
  };
  const optAction = {action, setAction};
  console.log(rows);
  return (
    <HomeLayout
      statusBarMode={'dark-content'}
      bgColor={Colors.main}
      header={{...headerProps}}
      {...optAction}>
      <View style={styles.container}>
        <FlatList
          data={rows} // rows
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => renderListUser(item)}
        />
      </View>
    </HomeLayout>
  );
};
export default ListChat;
