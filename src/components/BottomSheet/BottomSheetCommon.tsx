import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  useBottomSheetModalInternal,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import {BackdropPressBehavior} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, {
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {BackHandler, Keyboard} from 'react-native';
import {Portal} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IRefBottom} from 'types';
import styles from './styles';
interface IProps extends Omit<BottomSheetProps, 'children' | 'snapPoints'> {
  children: React.ReactNode;
  pressBehavior?: BackdropPressBehavior;
  hideBackdrop: boolean;
  snapPoint?: Array<string | number>;
}
const BottomSheetCommon = (
  {
    children,
    pressBehavior = 'collapse',
    snapPoint,
    hideBackdrop = false,
    ...rest
  }: IProps,
  ref: Ref<IRefBottom>,
) => {
  const refBottom = useRef<BottomSheet>(null);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], [snapPoint]);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
  const {bottom: safeBottomArea} = useSafeAreaInsets();
  useImperativeHandle(ref, () => {
    return {
      close: () => refBottom.current?.close(),
      show: () => refBottom.current?.snapToIndex(0),
    };
  });
  useEffect(() => {
    const backAction = () => {
      refBottom.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const {containerHeight, containerOffset} = useBottomSheetModalInternal();
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={Keyboard.dismiss}
        pressBehavior={pressBehavior}
      />
    ),
    [pressBehavior],
  );
  const contentContainerStyle = useMemo(
    () => [{paddingBottom: safeBottomArea || 6}],
    [safeBottomArea],
  );
  return (
    <Portal>
      <BottomSheet
        {...rest}
        enableContentPanningGesture={false}
        snapPoints={animatedSnapPoints}
        ref={refBottom}
        index={-1}
        animateOnMount
        handleIndicatorStyle={styles.hidden}
        animationConfigs={animationConfigs}
        containerHeight={containerHeight}
        containerOffset={containerOffset}
        backdropComponent={!hideBackdrop ? renderBackdrop : null}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}>
        <BottomSheetView
          style={contentContainerStyle}
          onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
};
export default forwardRef(BottomSheetCommon);
