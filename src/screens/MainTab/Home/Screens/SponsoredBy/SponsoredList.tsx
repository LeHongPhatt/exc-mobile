import {
  Buttons,
  HomeLayout,
  IconCus,
  ImageCus,
  TextCus,
  TouchCus,
} from 'components';
import {useNews} from 'hooks';
import {NavigationService, Routes} from 'navigation';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Card} from 'react-native-paper';
import {Colors} from 'theme';
import {
  formatDMY,
  getHeight,
  getPaddingHorizontal,
  getPaddingVertical,
  showImgSrc,
} from 'utils';
import styles from './styles';

const SponsoredList = () => {
  const [rows, setRows] = useState([]);
  const {newsList} = useNews();

  useEffect(() => {
    newsList?.result && setRows(newsList.result);
  }, [newsList]);

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Được tài trợ
      </TextCus>
    ),
  };

  const itemDivider = () => {
    return <View style={getHeight(16)} />;
  };

  const renderItem = (item: any) => (
    <TouchCus
      key={item?.id}
      onPress={() => {
        NavigationService.navigate(Routes.SponsoredDetail, {id: item?.id});
      }}
      style={[styles.radius6]}>
      <Card style={styles.wrapBlock}>
        <ImageCus
          source={showImgSrc('', item?.thumbnail)}
          style={styles.wrapImg}
        />
        <View style={[getPaddingVertical(12), getPaddingHorizontal(12)]}>
          <TextCus>{item?.title}</TextCus>
          <View
            style={[styles.row, styles.spaceItem, styles.cenItem, styles.pt12]}>
            <TextCus caption1 style={{color: Colors.bgInput}}>
              {formatDMY(item?.createdAt)}
            </TextCus>
            <Buttons
              style={[
                styles.btnAdv,
                getPaddingVertical(7),
                getPaddingHorizontal(12),
                getHeight(31),
              ]}
              onPress={() => {
                NavigationService.navigate(Routes.SponsoredDetail, {
                  id: item?.id,
                });
              }}
              disabled={false}>
              <TextCus caption1 medium whiteColor>
                Xem ngay
              </TextCus>
            </Buttons>
          </View>
        </View>
      </Card>
    </TouchCus>
  );

  return (
    <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
      <View style={styles.container}>
        <FlatList
          data={rows}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            getPaddingHorizontal(16),
            getPaddingVertical(10),
          ]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => renderItem(item)}
          ItemSeparatorComponent={itemDivider}
        />
      </View>
    </HomeLayout>
  );
};
export default SponsoredList;
