import React, {memo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'theme';

const SafeAreaViewCus = memo((props: ISafeAreaViewProps) => {
  const {children, style, bgColor, ...rest} = props;
  console.log('bgColor', bgColor);

  return (
    <SafeAreaView
      style={{
        ...style,
        backgroundColor: bgColor ?? Colors.main,
        flex: 1,
        marginBottom: 0,
      }}
      {...rest}>
      {children}
    </SafeAreaView>
  );
});

export default SafeAreaViewCus;

export interface ISafeAreaViewProps {
  children?: React.ReactNode;
  style?: any;
  bgColor?: any;
  edges?: any;
  testID?: string;
}
