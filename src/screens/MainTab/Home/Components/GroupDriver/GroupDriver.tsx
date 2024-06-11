import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {ImageCus, TextCus, TouchCus} from 'components';
import {getHeight, showImgSrc} from 'utils';
import {Divider, List} from 'react-native-paper';
import {Images} from 'assets';
import {NavigationService, Routes} from 'navigation';
import {Colors} from 'theme';
import Icon from 'assets/svg/Icon';
import {useDriver} from 'hooks';

const GroupDriver = () => {
  const {list, onDrivers} = useDriver();
  const [rows, setRows] = useState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    list?.result && setRows(list?.result);
    list?.total && setTotal(list?.totalItems);
  }, [list]);

  const renderDriverGroup = item => {
    return (
      <>
        <View style={styles.pH16}>
          <List.Item
            title={<TextCus body1>{item?.city_name}</TextCus>}
            onPress={() => {
              onDrivers({id: item?.id});
              NavigationService.navigate(Routes.ListDriver, {
                icon: item?.image,
                name: item?.city_name,
                id: item?.id,
                province: item,
              });
            }}
            left={() => renderDriverGroupLeft(item)}
            right={() => renderDriverGroupRight(item)}
          />
        </View>

        <Divider style={getHeight(1)} />
      </>
    );
  };

  const renderDriverGroupLeft = item => (
    <ImageCus
      source={showImgSrc('', item?.image, Images.driver)}
      style={styles.wrapImg}
    />
  );

  const renderDriverGroupRight = item =>
    item?.is_ping && (
      <TouchCus style={styles.cenItemvh} onPress={() => {}}>
        {Icon.Pin({color: Colors.border, width: 14, height: 14})}
      </TouchCus>
    );

  return (
    <View style={styles.container}>
      <View style={getHeight(24)} />
      <View style={[styles.row, styles.spaceItem, styles.pH16]}>
        <TextCus mainLightColor body1>
          Nhóm tài xế
        </TextCus>
        <TouchCus
          onPress={() => {
            NavigationService.navigate(Routes.ProvinceList);
          }}>
          <TextCus>
            <TextCus mainLightColor>Tất cả</TextCus>
            <TextCus mainLightColor> ({total})</TextCus>
          </TextCus>
        </TouchCus>
      </View>
      <View style={getHeight(12)} />
      <View>
        <FlatList
          data={rows}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => renderDriverGroup(item)}
        />
      </View>
    </View>
  );
};
export default GroupDriver;
