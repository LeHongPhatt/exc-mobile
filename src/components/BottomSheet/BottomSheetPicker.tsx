import React, {forwardRef, useCallback, useMemo} from 'react';
import {Portal} from '@gorhom/portal';
import BottomSheet, {
  useBottomSheetSpringConfigs,
  useBottomSheetModalInternal,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {Keyboard} from 'react-native';
import {BackdropPressBehavior} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';

interface IProps {
  children: React.ReactNode;
  pressBehavior?: BackdropPressBehavior;
  backgroundStyle?: any;
}
const BottomSheetPicker = forwardRef<BottomSheet, IProps>(
  ({children, pressBehavior = 'collapse', backgroundStyle}, ref) => {
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
    const {bottom: safeBottomArea} = useSafeAreaInsets();

    const {containerHeight, containerOffset} = useBottomSheetModalInternal();
    const animationConfigs = useBottomSheetSpringConfigs({
      damping: 80,
      overshootClamping: true,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
      stiffness: 500,
    });
    const handleSheetChanges = useCallback((index: number) => {
      console.log(index);
    }, []);

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
      () => [{paddingBottom: safeBottomArea || 16}],
      [safeBottomArea],
    );
    return (
      <Portal>
        <BottomSheet
          snapPoints={animatedSnapPoints}
          ref={ref}
          index={-1}
          onChange={handleSheetChanges}
          animateOnMount
          enablePanDownToClose
          animationConfigs={animationConfigs}
          handleIndicatorStyle={styles.hidden}
          containerHeight={containerHeight}
          containerOffset={containerOffset}
          handleStyle={styles.resetPadding}
          backdropComponent={renderBackdrop}
          backgroundStyle={backgroundStyle}
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
  },
);

export default BottomSheetPicker;
