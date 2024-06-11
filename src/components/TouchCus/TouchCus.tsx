import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';

export function TouchCus(props: ITextInputs) {
  const {
    onPress,
    onLongPress,
    style,
    children,
    activeOpacity,
    hitSlop,
    disabled,
    ...rest
  } = props;
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onPress}
      style={style}
      activeOpacity={activeOpacity}
      hitSlop={hitSlop}
      disabled={disabled}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
}

export interface ITextInputs {
  style?: any;
  children: ReactNode;
  onPress: () => void;
  onLongPress?: () => void;
  activeOpacity?: number;
  hitSlop?: any;
  disabled?: boolean;
}
