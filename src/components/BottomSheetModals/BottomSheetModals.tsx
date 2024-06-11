import React, {ReactNode, useCallback, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import styles from './styles';
import {Buttons, TextCus} from 'components';
import {Divider} from 'react-native-paper';
import {getHeight} from 'utils';
import Icon from 'assets/svg/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BottomSheetModals = (props: IBottomSheetModals) => {
  const {children, onClose, title, subtitle, onOk, type, titleBtn} = props;
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const [index, setIndex] = useState(0);
  // callbacks
  const handleSheetChanges = useCallback((i: number) => {
    setIndex(i);
    i === -1 && setTimeout(() => onClose?.(), 200);
  }, []);
  const IcNoti = Icon?.[type];
  const colorText =
    type === 'success' ? {mainLightColor: true} : {errorColor: true};
  const colorBtn = type === 'success' ? styles.btnActive : styles.btnErr;
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
  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        enablePanDownToClose
        handleIndicatorStyle={styles.hidden}
        snapPoints={animatedSnapPoints}
        onChange={handleSheetChanges}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}>
        <BottomSheetView
          style={contentContainerStyle}
          onLayout={handleContentLayout}>
          <View style={styles.contentContainer}>
            {/* <ImageCus source={Images[type]} style={styles.boxLogo} /> */}
            {IcNoti && <IcNoti />}
            <Divider style={getHeight(20)} />
            {title && (
              <View>
                <TextCus title2 {...colorText} semibold>
                  {title}
                </TextCus>
                <View style={getHeight(5)} />
              </View>
            )}
            {subtitle && (
              <View>
                <TextCus textAlign={'center'} body2 mx-16>
                  {subtitle}
                </TextCus>
                <View style={getHeight(16)} />
              </View>
            )}
            {children && children}
            {onOk && (
              <Buttons
                style={[styles.btlogi, colorBtn]}
                onPress={() => {
                  setIndex(-1);
                  onOk?.();
                  setTimeout(() => onClose?.(), 300);
                }}
                disabled={false}>
                <TextCus whiteColor semibold style={[styles.fs16, styles.lh24]}>
                  {titleBtn}
                </TextCus>
              </Buttons>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export interface IBottomSheetModals {
  type: 'success' | 'failure';
  style?: any;
  top?: string;
  title?: string;
  titleBtn?: string;
  subtitle?: string;
  children?: ReactNode;
  onClose?: () => void;
  onOk?: () => void;
}

export default BottomSheetModals;
