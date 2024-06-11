import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {HomeLayout, TextCus, IconCus, Buttons, ImageCus} from 'components';
import styles from './styles';
import {
  width,
  getPaddingHorizontal,
  getPaddingVertical,
  getHeight,
  formatDMY,
  showImgSrc,
} from 'utils';
import {Colors} from 'theme';
import Icon from 'assets/svg/Icon';
import {useNews} from 'hooks';
import RenderHtml from 'react-native-render-html';
import {NavigationService} from 'navigation';

const SponsoredDetail = () => {
  const [detail, setDetail] = useState();
  const {newsDetail, onGetNews} = useNews();
  const {params} = NavigationService.route() || '';

  useEffect(() => {
    console.log('test-sponsored', params);
    onGetNews({id: params?.id});
  }, [params?.id]);

  useEffect(() => {
    const data = newsDetail?.result;
    Array.isArray(data) && setDetail(data[0]);
  }, [newsDetail]);

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Chi tiết
      </TextCus>
    ),
  };

  return (
    <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
      <View style={styles.container}>
        {detail && (
          <ScrollView style={styles.content}>
            <TextCus medium>{detail?.title}</TextCus>
            <View style={[styles.row, styles.cenItem, getPaddingVertical(12)]}>
              <View style={styles.pr8}>
                {Icon.Calendar({color: Colors.border})}
              </View>
              <TextCus caption1 style={{color: Colors.bgInput}}>
                {formatDMY(detail?.createdAt)}
              </TextCus>
            </View>
            <ImageCus
              source={showImgSrc('', detail?.thumbnail)}
              style={styles.wrapImgDetail}
            />
            <RenderHtml contentWidth={width} source={{html: detail?.content}} />
          </ScrollView>
        )}
        {detail && (
          <View style={[getPaddingHorizontal(16), getPaddingVertical(8)]}>
            <Buttons
              style={[
                styles.btnAdv,
                getPaddingVertical(7),
                getPaddingHorizontal(12),
                getHeight(48),
              ]}
              onPress={() => {}}
              disabled={false}>
              <View style={[styles.row, styles.cenItem]}>
                <TextCus medium whiteColor style={styles.pr8}>
                  Xem chi tiết
                </TextCus>
                <IconCus name={'arrow-right'} size={14} color={Colors.white} />
              </View>
            </Buttons>
          </View>
        )}
      </View>
    </HomeLayout>
  );
};
export default SponsoredDetail;
