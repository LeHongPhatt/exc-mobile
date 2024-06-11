import {IconCus, TextCus} from 'components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Colors} from 'theme';
import styles from './styles';

interface INodata {
  iconName?: string;
  size?: number;
  style?: any;
}

export default function Nodata(props: INodata) {
  const {iconName = 'comment', size = 32, style} = props;
  const {t} = useTranslation();

  return (
    <View style={styles.padContentBtn}>
      <View style={styles.cenItem}>
        <IconCus
          name={iconName}
          size={size}
          color={Colors.dark}
          style={[styles.mb5, style]}
        />
        <TextCus caption1>{t('khong_co_du_lieu')}</TextCus>
      </View>
    </View>
  );
}
