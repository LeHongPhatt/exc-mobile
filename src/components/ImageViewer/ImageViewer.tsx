import SvgIconNew from 'assets/IconSVG';
import {ImageCus} from 'components/ImageCus';
import {TextCus} from 'components/TextCus';
import {TouchCus} from 'components/TouchCus';
import {useAuth, useModal} from 'hooks';
import React, {useCallback, useEffect, useState} from 'react';
import {Modal, Platform, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Swiper from 'react-native-swiper';
import {Colors} from 'theme';
import {IImageViewerProps} from 'types';
import {getUrlImg, height, isArray, width} from 'utils/libs';
import ImageDefaultHeader from './DefaultHeader';

export function ImageViewer(props: IImageViewerProps) {
  const {visible, toggleModalImage} = useModal();
  const [files, setFiles] = useState();

  const {
    data,
    isDocumentCode,
    isCustom = false,
    seletedItem,
    projectname,
  } = props;

  const {access_token} = useAuth();

  useEffect(() => {
    if (data) {
      setFiles(data);
    }
  }, [data]);

  const renderImage = useCallback(
    (item: any) => {
      if (typeof item === 'string') {
        return (
          <ImageCus
            source={{
              uri: item,
            }}
            resizeMode="contain"
            style={styles.flex1}
          />
        );
      } else {
        const img = getUrlImg(
          'slider',
          `${isDocumentCode ? item?.documentcode : item?.docnum}`,
          `${access_token}`,
        );
        return img ? (
          <ImageCus
            key={item?.docnum}
            source={{
              uri: img,
              cache: 'immutable',
            }}
            resizeMode={`${isCustom ? 'cover' : 'contain'}`}
            style={styles.flex1}
          />
        ) : null;
      }
    },
    [data],
  );

  const renderPagination = (idx: number, total: number) => {
    return (
      <View style={[styles.centerItem, styles.mb20]}>
        <TextCus
          whiteColor
          style={[styles.fs16, styles.fontRoboto, styles.fw400, styles.lh28]}>
          {seletedItem?.title}
        </TextCus>
        <TextCus
          whiteColor
          style={[styles.fs16, styles.fontRoboto, styles.fw400, styles.lh28]}>
          {`${idx + 1}/${total}`}
        </TextCus>
      </View>
    );
  };

  return (
    <Modal onRequestClose={() => null} visible={visible} transparent={false}>
      <View style={styles.container}>
        {isCustom ? (
          <View style={[styles.header, styles.rowItem, styles.centerHItem]}>
            <TouchCus
              onPress={() => toggleModalImage(!visible)}
              style={styles.w20}>
              <SvgIconNew.ArrowLeft />
            </TouchCus>
            <View style={[styles.flex1, styles.centerItem]}>
              <TextCus
                style={[styles.fs20, styles.fontRoboto, styles.fw400]}
                whiteColor>
                {projectname}
              </TextCus>
            </View>
          </View>
        ) : (
          <ImageDefaultHeader
            onRequestClose={() => toggleModalImage(!visible)}
          />
        )}
        {isArray(files) ? (
          <>
            {isCustom ? (
              <Animated.View style={styles.swiperContainer}>
                {files?.length > 0 && (
                  <Swiper
                    renderPagination={renderPagination}
                    dotStyle={{
                      backgroundColor: Colors.text,
                    }}
                    containerStyle={styles.swiperContainer}
                    paginationStyle={styles.contentPage}
                    removeClippedSubviews={false}
                    autoplay={true}
                    autoplayTimeout={2}
                    showsPagination={true}
                    dot={null}>
                    {files?.map((item: any) => {
                      return renderImage(item);
                    })}
                  </Swiper>
                )}
              </Animated.View>
            ) : (
              <>
                {files?.length > 0 && (
                  <Swiper
                    dotStyle={{
                      backgroundColor: Colors.text,
                    }}
                    activeDotColor={Colors.primary}
                    paginationStyle={styles.contentPage}
                    removeClippedSubviews={false}
                    autoplay={true}
                    autoplayTimeout={1}>
                    {files?.map((item: any) => {
                      return renderImage(item);
                    })}
                  </Swiper>
                )}
              </>
            )}
          </>
        ) : (
          <>{renderImage(files)}</>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: Colors.dark,
  },
  closeBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 25 : 20,
    right: 15,
    zIndex: 9999,
  },
  closeIcon: {
    height: 20,
    width: 20,
  },
  flex1: {
    flex: 1,
  },
  contentPage: {
    bottom: 20,
  },
  header: {
    width,
    height: 44,
    paddingHorizontal: 24,
    marginTop: Platform.OS === 'ios' ? 44 : 30,
  },
  rowItem: {
    flexDirection: 'row',
  },
  w20: {
    width: 20,
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerHItem: {
    alignItems: 'center',
  },
  fs20: {
    fontSize: 20,
  },
  fs16: {
    fontSize: 16,
  },
  lh28: {
    lineHeight: 28,
  },
  fw400: {
    fontWeight: '400',
  },
  fontRoboto: {
    fontFamily: 'Roboto',
  },
  swiperContainer: {
    width,
    flex: 1,
  },
  count: {
    position: 'absolute',
    bottom: 20,
  },
  mb20: {
    marginBottom: 20,
  },
});
