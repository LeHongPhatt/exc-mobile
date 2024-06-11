import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {IAnimatedProps} from 'types';

export function AnimatedCus(props: IAnimatedProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {
    children,
    style,
    duration = 1000,
    toValue = 1,
    useNativeDriver = false,
    ...rest
  } = props;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: useNativeDriver,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
      {...rest}>
      {children}
    </Animated.View>
  );
}
