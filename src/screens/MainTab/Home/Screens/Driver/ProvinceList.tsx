import {FlatList, View} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import styles from './styles';
import {HomeLayout, IconCus, ImageCus, TextCus, TouchCus} from 'components';
import {getHeight, showImgSrc, styleSpacing} from 'utils';
import {Divider, List} from 'react-native-paper';
import Icon from 'assets/svg/Icon';
import {Images} from 'assets';
import {Colors} from 'theme';
import {NavigationService, Routes} from 'navigation';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {EAction} from 'types';
import {useDriver} from 'hooks';

const ProvinceList = () => {
  const [action, setAction] = useState('');
  const {
    list,
    listSearch,
    onDrivers,
    onGroupDriverChangeAction,
    onSearchDriverGroup,
  } = useDriver();
  const [rows, setRows] = useState([]);
  const [elRefs, setElRefs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data = listSearch?.result || [];
    const copyData = [...data];
    const sortData = copyData.sort((a, b) => b?.is_pin - a?.is_pin);
    setRows(sortData);
  }, [listSearch]);

  useEffect(() => {
    const data = list?.result || [];
    const copyData = [...data];
    const sortData = copyData.sort((a, b) => b?.is_pin - a?.is_pin);
    setRows(sortData);
  }, [list]);

  useEffect(() => {
    setElRefs(e =>
      Array(rows?.length)
        .fill()
        .map((_, i) => e[i] || createRef()),
    );
  }, [rows?.length]);

  const onChangeAction = (item, index) => {
    onGroupDriverChangeAction(
      {
        id: item?.id,
        action: item?.is_pin ? EAction.UNPIN : EAction.PIN,
      },
      () => {
        elRefs[index].current?.close();
        onDrivers({});
      },
    );
  };

  const callApiSearchGroupDriver = text => {
    if (text !== null && text !== '') {
      onSearchDriverGroup({cityName: text});
    }
  };

  const rightSwipeActions = (item: any, index) => (
    <View style={[styles.row, styles.wrapSwipe]}>
      <TouchCus
        style={[styles.boxSwipe, styles.bgPin, styles.cenItemvh]}
        onPress={() => onChangeAction(item, index)}>
        {item?.is_pin ? Icon.UnPin({width: 28, height: 28}) : <Icon.Pin />}
      </TouchCus>
    </View>
  );

  const renderProvinceAvatar = (item: any) => (
    <ImageCus
      source={showImgSrc('', item?.image, Images.driver)}
      style={styles.wrapImg}
    />
  );

  const renderProvinceInfo = (item: any, index) =>
    item?.is_pin && (
      <TouchCus
        style={styles.cenItemvh}
        onPress={() => onChangeAction(item, index)}>
        {Icon.Pin({color: Colors.border, width: 16, height: 16})}
      </TouchCus>
    );

  const renderProvinceItem = (item: any, index) => (
    <View>
      <Swipeable
        key={item?.id}
        ref={elRefs[index]}
        renderRightActions={() => rightSwipeActions(item, index)}>
        <List.Item
          style={[styleSpacing('px-16'), styleSpacing('py-6')]}
          title={<TextCus body1>{item?.city_name}</TextCus>}
          onPress={() => {
            onDrivers({id: item?.id});
            NavigationService.navigate(Routes.ListDriver, {
              icon: item?.image,
              name: item?.city_name,
              id: item?.id,
              is_pin: item?.is_pin,
              province: item,
            });
          }}
          left={() => renderProvinceAvatar(item)}
          right={() => renderProvinceInfo(item, index)}
        />
      </Swipeable>
      <Divider style={[getHeight(1), {backgroundColor: Colors.whisper}]} />
    </View>
  );

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Nhóm tài xế
      </TextCus>
    ),
    renderRight: () => (
      <View style={[styles.row, styles.cenItemvh]}>
        <TouchCus onPress={() => setAction(EAction.SEARCH)}>
          <Icon.Search />
        </TouchCus>
        {/* <View style={getWidth(14)} />
        <TouchCus onPress={() => setAction(EAction.PIN)}>
          {Icon.Pin({width: 22, height: 22})}
        </TouchCus> */}
      </View>
    ),
  };
  const optAction = {action, setAction};

  return (
    <HomeLayout
      statusBarMode={'dark-content'}
      bgColor={Colors.main}
      header={{...headerProps}}
      {...optAction}
      inputProps={{
        onChangeText: text => {
          setSearch(text);
          setTimeout(() => callApiSearchGroupDriver(text), 2000);
        },
        value: search,
      }}
      onPress={() => {
        callApiSearchGroupDriver(search);
      }}>
      <View style={styles.container}>
        <FlatList
          data={rows}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => renderProvinceItem(item, index)}
        />
      </View>
    </HomeLayout>
  );
};

export default ProvinceList;
