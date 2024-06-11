import {ITexts} from 'components/TextCus/TextCus';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {styleSpacing} from 'utils';

export default function withStyle(WrapperComponent) {
  return React.forwardRef<any, ITexts>((props, ref) => {
    const styleContainer = useMemo(() => {
      const arrRest = Object.keys(props);
      const styleObj = arrRest.reduce((prev, key) => {
        const resultSpacing = styleSpacing(key);
        return {...prev, ...resultSpacing};
      }, {});
      const result = StyleSheet.flatten([styleObj, props?.style]);
      return result;
    }, [props]);
    return <WrapperComponent ref={ref} {...props} style={styleContainer} />;
  });
}
