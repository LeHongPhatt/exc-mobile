import React from 'react';
import styles from './styles';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface IFooterNav {
  onPress: () => void;
  onPress_one: () => void;
  onPress_two?: () => void;
  onPress_three: () => void;
  onPress_four: () => void;
}

const FooterNav = (props: IFooterNav) => {
  const {onPress, onPress_one, onPress_three, onPress_four} = props;
  const {t} = useTranslation();
  return (
    <View style={styles.footercon}>
      <View style={[styles.footercon, styles.rowItem, styles.topBottomfooter]}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.btfooter, styles.wrapContent, styles.cenItem]}>
          <FontAwesome5 name={'home'} style={styles.iconft} />
          <Text style={styles.textft}>{t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPress_one}
          style={[styles.wrapContent, styles.cenItem]}>
          <FontAwesome5 name={'address-book'} style={styles.iconft} />
          <Text style={styles.textft}>{t('contract')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPress_three}
          style={[styles.wrapContent, styles.cenItem]}>
          <FontAwesome5 name="user" style={styles.iconft} />
          <Text style={styles.textft}>{t('account')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPress_four}
          style={[styles.wrapContent, styles.cenItem]}>
          <FontAwesome5 name={'phone-volume'} style={styles.iconft} />
          <Text style={styles.textft}>{t('contact')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;
