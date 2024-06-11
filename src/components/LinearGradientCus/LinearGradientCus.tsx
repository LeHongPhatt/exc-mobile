import React from 'react';
import {StyleProp} from 'react-native';
import {ViewStyle} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
interface Props {
  children: React.ReactNode;
  linear?: LinearGradientProps;
  styleLinear?: StyleProp<ViewStyle>;
  colors?: (string | number)[];
}
const LinearGradientCus: React.FC<Props> = ({
  children,
  linear,
  styleLinear,
  colors,
}) => {
  return (
    <LinearGradient
      start={{x: 1, y: 0.5}}
      end={{x: 0.8, y: 1}}
      locations={[0, 1]}
      {...linear}
      colors={colors ?? ['#515159', '#252528']}
      style={[styleLinear]}>
      {children}
    </LinearGradient>
  );
};
export default LinearGradientCus;
