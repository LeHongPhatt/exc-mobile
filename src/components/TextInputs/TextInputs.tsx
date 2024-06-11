import React, {ReactNode} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {Colors} from 'theme';
import {BaseStyle, DefaultFont} from 'theme/typography';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';

export function TextInputs(props: ITextInputs) {
  // const cardColor = colors.card;
  const {
    style,
    success,
    leftIcon,
    rightIcon,
    textStyle,
    onKeyPress,
    useBottomSheet = false,
  } = props;
  return (
    <View style={[BaseStyle.textInput, style]}>
      {leftIcon}
      {useBottomSheet ? (
        <BottomSheetTextInput
          {...props}
          style={[styles.txt, {fontFamily: DefaultFont}, textStyle]}
          selectionColor={success ? Colors.bgInput : Colors.white}
          placeholderTextColor={success ? Colors.bgInput : Colors.white}
          onKeyPress={onKeyPress}
        />
      ) : (
        <TextInput
          {...props}
          style={[styles.txt, {fontFamily: DefaultFont}, textStyle]}
          selectionColor={success ? Colors.bgInput : Colors.white}
          placeholderTextColor={success ? Colors.bgInput : Colors.white}
          onKeyPress={onKeyPress}
        />
      )}
      {rightIcon}
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    flex: 1,
    height: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    color: Colors.dark,
  },
});
export interface ITextInputs extends TextInputProps {
  style?: any;
  success?: boolean;
  editable?: boolean;
  onSubmitEditing?: () => void;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChangeText?: (text: any) => void;
  onTouchStart?: () => void;
  placeholderTextColor?: string;
  placeholder?: string | undefined;
  value?: string;
  color?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  textStyle?: any;
  onKeyPress?: any;
  useBottomSheet?: boolean;
  keyboardType?: KeyboardTypeOptions;
}
