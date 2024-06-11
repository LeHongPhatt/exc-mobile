import React, {ReactNode, useCallback, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import styles from './styles';
import {TextCus} from 'components';
import {Divider} from 'react-native-paper';
import {getHeight, getPaddingVertical} from 'utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BottomSheetModalContainer = (props: IBottomSheetModalContainer) => {
  const {children, title, onClose, showIndicator = false} = props;
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const [index, setIndex] = useState(0);
  // callbacks
  const handleSheetChanges = useCallback((i: number) => {
    setIndex(i);
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
    () => [{paddingBottom: safeBottomArea || 16}],
    [safeBottomArea],
  );
  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        enablePanDownToClose
        handleIndicatorStyle={showIndicator ? styles.show : styles.hidden}
        snapPoints={animatedSnapPoints}
        onChange={handleSheetChanges}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        animateOnMount>
        <BottomSheetView
          style={contentContainerStyle}
          onLayout={handleContentLayout}>
          <View style={styles.contentContainer}>
            {title && (
              <View style={styles.cenItemvh}>
                <TextCus
                  semibold
                  style={[styles.fs16, styles.lh24, getPaddingVertical(12)]}>
                  {title}
                </TextCus>
                <Divider style={[getHeight(2), styles.bgDivider]} />
              </View>
            )}
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              {children && children}
            </BottomSheetScrollView>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export interface IBottomSheetModalContainer {
  style?: any;
  top?: string;
  showIndicator?: boolean;
  title?: string;
  titleBtn?: string;
  subtitle?: string;
  children?: ReactNode;
  onClose?: () => void;
  onOk?: () => void;
}

export default BottomSheetModalContainer;
