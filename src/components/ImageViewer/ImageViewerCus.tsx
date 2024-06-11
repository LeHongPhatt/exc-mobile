import {
  ImageCus,
  Header,
  IconCus,
  TextCus,
  TouchCus,
  SafeAreaViewCus,
} from 'components';
import React, {useRef, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {width, height} from 'utils';
import Icon from 'assets/svg/Icon';
import styles from './styles';
import {Colors} from 'theme';

export function ImageViewerCus(props: IImageViewerCus) {
  const {
    style,
    images,
    imageIndex = 0,
    avatar,
    userName,
    time,
    showDownload = true,
    onPressLeft,
  } = props;
  const ref = useRef();

  useEffect(() => scrollToIndex(imageIndex), []);

  const scrollToIndex = index => {
    setTimeout(() => {
      ref?.current?.scrollToIndex({
        animated: false,
        index: index,
      });
    }, 200);
  };

  const renderImage = (item: any) => (
    <View
      key={item}
      style={{
        width: width,
        height: height,
        backgroundColor: Colors.black,
      }}>
      <ImageCus
        style={[styles.flex1, styles.asStretch]}
        source={item}
        resizeMode="contain"
      />
    </View>
  );

  const headerProps = {
    style: styles.bgTrans,
    onPressLeft: onPressLeft,
    renderLeft: () => (
      <View style={[styles.row, styles.cenItemvh]}>
        <IconCus name={'chevron-left'} size={18} color={Colors.white} />
        {avatar && (
          <ImageCus source={avatar} style={[styles.wrapImg, styles.ml13]} />
        )}
        <View style={styles.ml6}>
          {userName && (
            <TextCus body1 whiteColor medium>
              {userName}
            </TextCus>
          )}
          {time && (
            <TextCus overline whiteColor>
              {time}
            </TextCus>
          )}
        </View>
      </View>
    ),
    renderRight: () => (
      <View>
        {showDownload && (
          <TouchCus onPress={() => {}}>
            <Icon.Download />
          </TouchCus>
        )}
      </View>
    ),
  };

  return (
    <View style={[styles.flex, style]}>
      <FlatList
        horizontal
        pagingEnabled
        ref={ref}
        data={images}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => renderImage(item)}
      />
      <SafeAreaViewCus bgColor={Colors.transparent} style={styles.header}>
        <Header {...headerProps} />
      </SafeAreaViewCus>
    </View>
  );
}

export interface IImageViewerCus {
  style?: any;
  images?: [];
  imageIndex?: number;
  avatar?: any;
  userName?: string;
  time?: string;
  showDownload?: bool;
  onPressLeft?: () => void;
}
