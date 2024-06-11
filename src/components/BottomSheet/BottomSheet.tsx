import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useLayoutEffect,
  useState,
} from 'react';
import {Keyboard, View, ViewStyle} from 'react-native';
import BottomSheet, {
  useBottomSheetSpringConfigs,
  useBottomSheetModalInternal,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import styles from './styles';
import {useRef} from 'react';
import {TextCus, Buttons} from 'components';
import {Colors} from 'theme';
import Icon from 'assets/svg/Icon';

type TOAST = 'success' | 'errors' | 'warning';
interface ToastInfo {
  icon: any;
  color: string;
}
interface Props {
  type: TOAST;
  title: string;
  subtitle: string;
  onCancel?: () => void;
  onOk?: () => void;
  textCancel?: string;
  textOk?: string;
  styleCancel?: ViewStyle;
  styleOk?: ViewStyle;
}

interface BottomSheetRef {
  handleClosePress: () => void;
  handleOpenPress: (value: Props) => void;
}
const STATUS: Record<TOAST, ToastInfo> = {
  errors: {
    icon: Icon.failure,
    color: Colors.error,
  },
  success: {
    icon: Icon.success,
    color: Colors.success,
  },
  warning: {
    icon: Icon.warning,
    color: Colors.main,
  },
};
export class BottomSheetController {
  static #modalRef: React.MutableRefObject<BottomSheetRef>;
  static setModalRef = (ref: any) => {
    this.#modalRef = ref;
  };
  static showModal = (data: Props) => {
    this.#modalRef.current?.handleOpenPress(data);
  };
  static hideModal = () => {
    this.#modalRef.current?.handleClosePress();
  };
}

const BottomSheetAlert: React.FC = () => {
  const modalRef = React.useRef<BottomSheetRef>();
  const refBottom = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);
  const [data, setData] = useState<Props | any>({});
  useLayoutEffect(() => {
    BottomSheetController.setModalRef(modalRef);
  }, []);

  useImperativeHandle(modalRef, () => {
    return {
      handleClosePress: () => {
        return refBottom.current?.close();
      },
      handleOpenPress: (value: Props) => {
        setData((prev: Props) => ({...prev, ...value}));
        return refBottom.current?.snapToIndex(0);
      },
    };
  });
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
      />
    ),
    [],
  );
  const IconLogo = STATUS[data?.type]?.icon;
  const color = STATUS[data?.type]?.color;
  return (
    <BottomSheet
      ref={refBottom}
      snapPoints={snapPoints}
      index={-1}
      onChange={handleSheetChanges}
      animateOnMount
      animationConfigs={animationConfigs}
      handleIndicatorStyle={styles.hidden}
      containerHeight={containerHeight}
      containerOffset={containerOffset}
      handleStyle={styles.resetPadding}
      backdropComponent={renderBackdrop}>
      <View style={styles.bgWhite}>
        {IconLogo && <IconLogo />}
        <View style={[styles.pdHorzi50, styles.mgVertzi20]}>
          {data?.title ? (
            <TextCus
              title1
              style={[{color}, styles.mgBot15]}
              textAlign="center">
              {data?.title}
            </TextCus>
          ) : null}
          {data?.subtitle ? (
            <TextCus title4 textAlign="center">
              {data?.subtitle}
            </TextCus>
          ) : null}
        </View>
        <View style={styles.bottomAction}>
          {typeof data?.onCancel === 'function' && (
            <Buttons
              style={[styles.flex1, styles.mr10, data?.styleCancel]}
              onPress={() => data?.onCancel?.()}
              disabled={false}>
              <TextCus style={[]}>{data?.textCancel}</TextCus>
            </Buttons>
          )}
          {typeof data?.onOk === 'function' && (
            <Buttons
              style={[styles.flex1, {backgroundColor: color}, data?.styleOk]}
              onPress={() => data?.onOk?.()}
              disabled={false}>
              <TextCus style={[]}>{data?.textOk}</TextCus>
            </Buttons>
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetAlert;
