import React, {ReactNode, useCallback, useMemo, useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import styles from './styles';
import {Buttons, TextCus, ImageCus, CardReview, TouchCus} from 'components';
import {Divider} from 'react-native-paper';
import {
  width,
  getWidth,
  getHeight,
  getPaddingHorizontal,
  getPaddingVertical,
  showImgSrc,
  styleSpacing,
} from 'utils';
import {Colors} from 'theme';
import Icon from 'assets/svg/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Images} from 'assets';

const BottomSheetRatingModals = (props: IBottomSheetRatingModals) => {
  const {children, onClose, onRate, title, avatar, userName, ratePoints} =
    props;
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const [bsIndex, setBsIndex] = useState(0);
  const [rateAmount, setRateAmount] = useState(-1);
  // callbacks
  const handleSheetChanges = useCallback((i: number) => {
    setBsIndex(i);
    i === -1 && setTimeout(() => onClose?.(), 200);
  }, []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
  const {bottom: safeBottomArea} = useSafeAreaInsets();
  const contentContainerStyle = useMemo(
    () => [styles.contentContainerStyle, {paddingBottom: safeBottomArea || 16}],
    [safeBottomArea],
  );

  const itemDivider = () => {
    return <View style={getWidth(8)} />;
  };

  return (
    <View style={styles.ratingContainer}>
      <BottomSheet
        ref={bottomSheetRef}
        index={bsIndex}
        enablePanDownToClose
        handleIndicatorStyle={styles.indicatorStyle}
        snapPoints={animatedSnapPoints}
        onChange={handleSheetChanges}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}>
        <BottomSheetView
          style={[contentContainerStyle, styleSpacing('pt-8')]}
          onLayout={handleContentLayout}>
          <View style={styles.contentContainer}>
            {title && (
              <View style={styles.cenItem}>
                <View style={styleSpacing('mb-12')}>
                  <TextCus semibold style={[styles.fs16, styles.lh24]}>
                    {title}
                  </TextCus>
                </View>
                <Divider
                  {...getHeight(1)}
                  style={{width: width, backgroundColor: Colors.whisper}}
                />
              </View>
            )}
            <ImageCus
              source={showImgSrc('', avatar, Images.driver)}
              style={[styles.wrapAvatar, styles.mt32]}
            />
            {userName && (
              <View style={styles.mt12}>
                <TextCus title4 medium>
                  {userName}
                </TextCus>
              </View>
            )}
            {!!ratePoints && (
              <CardReview
                key={ratePoints}
                amount={ratePoints}
                style={[
                  getPaddingHorizontal(8),
                  getPaddingVertical(5),
                  styles.mt12,
                ]}
              />
            )}
            <FlatList
              horizontal
              data={[...Array(5)]}
              scrollEnabled={false}
              contentContainerStyle={styles.mt32}
              ItemSeparatorComponent={itemDivider}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchCus onPress={() => setRateAmount(index)}>
                  <View key={item}>
                    {Icon.Favorite({
                      color: index <= rateAmount ? Colors.main : Colors.border,
                      width: 32,
                      height: 32,
                    })}
                  </View>
                </TouchCus>
              )}
            />
            {children && children}
            <View
              style={[
                styles.row,
                getPaddingHorizontal(16),
                getPaddingVertical(8),
                styleSpacing('mt-32'),
              ]}>
              <Buttons
                style={styles.btnCancel}
                onPress={() => {
                  setBsIndex(-1);
                  setTimeout(() => onClose?.(), 200);
                }}>
                <TextCus whiteColor medium body2>
                  Hủy
                </TextCus>
              </Buttons>
              <View style={getWidth(7)} />
              <Buttons
                style={styles.btnRate}
                onPress={() => onRate?.(rateAmount + 1)}>
                <TextCus whiteColor medium body2>
                  Đánh giá
                </TextCus>
              </Buttons>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export interface IBottomSheetRatingModals {
  style?: any;
  top?: string;
  title?: string;
  children?: ReactNode;
  avatar?: any;
  userName?: string;
  ratePoints?: number;
  onClose?: () => void;
  onRate?: (number) => void;
}

export default BottomSheetRatingModals;
