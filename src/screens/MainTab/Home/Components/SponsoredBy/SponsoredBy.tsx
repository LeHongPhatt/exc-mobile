import {FlatList, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {Buttons, IconCus, ImageCus, TextCus, TouchCus} from 'components';
import {getHeight, getWidth, showImgSrc, styleSpacing} from 'utils';
import {Card} from 'react-native-paper';
import Icon from 'assets/svg/Icon';
import {Colors} from 'theme';
import {NavigationService, Routes} from 'navigation';
import {useNews} from 'hooks';

const SponsoredBy = () => {
  const [rows, setRows] = useState([]);
  const {newsList} = useNews();

  useEffect(() => {
    newsList?.result && setRows(newsList.result);
  }, [newsList]);

  const separatorItem = () => <View style={getWidth(16)} />;

  const renderItems = (item: any) => (
    <>
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
          <View style={styles.pv16}>
            <Card.Content>
              <TextCus numberOfLines={2}>{`${item?.title}\n`}</TextCus>
            </Card.Content>
          </View>
        </Card>
      </TouchCus>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={getHeight(24)} />
      <View style={[styles.row, styles.spaceItem, styles.pH16]}>
        <TextCus mainLightColor body1>
          Được Tài Trợ
        </TextCus>
        <TouchCus
          onPress={() => {
            NavigationService.navigate(Routes.SponsoredList);
          }}>
          <TextCus mainLightColor>Tất cả ({newsList?.totalItems ?? 0})</TextCus>
        </TouchCus>
      </View>
      <View style={getHeight(12)} />
      <View>
        <FlatList
          data={rows}
          scrollEnabled={true}
          horizontal
          contentContainerStyle={[styleSpacing('px-16'), styleSpacing('pb-24')]}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={separatorItem}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => renderItems(item)}
        />
      </View>
      <View style={styles.pH16}>
        <View style={[styles.p8, styles.wrapBlockAdv]}>
          <View style={[styles.row, styles.cenItem]}>
            <Icon.Gift />
            <TextCus body2> Tích dặm thưởng không giới hạn</TextCus>
          </View>
          <View style={[styles.wrapInnerBlockAdv]}>
            <TextCus caption1>
              Mở thẻ premier Boundless VIB nhận ngay quà tặng 2000 dặm thưởng
              bông sen vàng. Xem ngay!
            </TextCus>
            <View style={getHeight(8)} />
            <View style={[styles.row, styles.spaceItem]}>
              <Buttons
                style={styles.btnAdv}
                onPress={() => {
                  // NavigationService.navigate(Routes.OTP, {
                  //   phone: getValues('account'),
                  // });
                }}
                disabled={false}>
                <TextCus body2>Ngân hàng Quốc Tế VIB</TextCus>
              </Buttons>
              <TouchCus
                onPress={() => {
                  NavigationService.navigate(Routes.SponsoredDetail);
                }}
                style={[styles.row, styles.cenItem]}>
                <TextCus body2>Chi tiết </TextCus>
                <IconCus name={'arrow-right'} size={18} color={Colors.main} />
              </TouchCus>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SponsoredBy;
