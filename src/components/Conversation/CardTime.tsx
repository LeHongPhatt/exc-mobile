import {TextCus} from 'components';
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {styleSpacing} from 'utils';

export function CardTime(props: ICardTime) {
  const {time, style} = props;
  return (
    <View style={styles.cenItem}>
      <View
        style={[
          styles.wrapCardTime,
          styleSpacing('mt-20'),
          styleSpacing('px-8'),
          styleSpacing('py-4'),
          style,
        ]}>
        <TextCus label2 whiteColor>
          {time}
        </TextCus>
      </View>
    </View>
  );
}

export interface ICardTime {
  style?: any;
  time?: string;
}
