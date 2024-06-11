import * as React from 'react';
import {Colors} from 'theme';
import {IconCus, TouchCus} from 'components';
import {CheckboxProps} from 'react-native-paper';

interface ICheckBoxProps extends CheckboxProps {
  onChange?: (b: boolean) => void;
  size?: number;
  // value: boolean;
}

export const CheckBoxCus = ({onChange, color, size = 18}: ICheckBoxProps) => {
  const [checked, setChecked] = React.useState(false);
  const colors = color ?? Colors.border;
  return (
    <TouchCus
      onPress={() => {
        onChange?.(checked);
        setChecked(!checked);
      }}>
      <IconCus
        name={checked ? 'check-square' : 'square'}
        size={size}
        color={checked ? Colors.mainLight : colors}
      />
    </TouchCus>
  );
};

// const styles = StyleSheet.create({
//   wrap: {borderWidth: 1, borderColor: Colors.border, width: 24, height: 24},
// });
