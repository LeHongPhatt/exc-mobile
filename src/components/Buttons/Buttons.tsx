import React, {ReactNode} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {Colors} from 'theme';
// import {Texts} from 'components';
import styles from './styles';

export function Buttons(props: IButtons) {
  const {
    style,
    icon,
    outline,
    full,
    round,
    loading,
    shadow,
    children,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={[
        [styles.default, {backgroundColor: Colors.primary}],
        outline && [
          styles.outline,
          {backgroundColor: Colors.card, borderColor: Colors.primary},
        ],
        shadow && styles.shadow,
        full && styles.full,
        round && styles.round,
        style,
      ]}
      activeOpacity={0.9}>
      {icon ? icon : null}
      {children || 'Button'}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? Colors.primary : Colors.white}
          style={styles.padLeft5}
        />
      ) : null}
    </TouchableOpacity>
  );
}

export interface IButtons {
  style?: any;
  shadow?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  outline?: boolean;
  full?: boolean;
  round?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}
