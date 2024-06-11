import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {TextCus, TouchCus} from 'components';
import {getHeight, getWidthBySpace, formatCurrency} from 'utils';
import Icon from 'assets/svg/Icon';
import {useAuth} from 'hooks';
import {NavigationService, Routes} from 'navigation';

const WalletInfo = () => {
  const {profile} = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    profile && setUser(profile[0]);
  }, [profile]);

  return (
    <View style={styles.container}>
      <View style={getHeight(12)} />
      {user?.full_name ? (
        <TextCus mainLightColor body1>
          {`Chào, ${user.full_name}`}
        </TextCus>
      ) : (
        <TextCus mainLightColor body1 useI18n>
          hi
        </TextCus>
      )}
      <View style={getHeight(14)} />
      <View
        style={[
          styles.radius4,
          styles.borderWallet,
          styles.p12,
          styles.row,
          styles.spaceItem,
        ]}>
        <TextCus body1>Khả dụng</TextCus>
        <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
          <TextCus title3 bold style={styles.mr8}>
            {formatCurrency(user?.balance_available)}
          </TextCus>
          <View style={styles.mr8}>
            <Icon.ExcCoin />
          </View>
          <TextCus body1>EXC-xu</TextCus>
        </View>
      </View>
      <View
        style={[
          styles.wrapAction,
          styles.radius4,
          styles.p12,
          styles.cenItemvh,
        ]}>
        <View style={[styles.row, styles.spaceItem, getWidthBySpace(64)]}>
          <TouchCus
            style={styles.cenItemvh}
            onPress={() => NavigationService.navigate(Routes.Recharge)}>
            <Icon.Wallet />
            <TextCus body2 whiteColor>
              Nạp EXC-xu
            </TextCus>
          </TouchCus>
          <TouchCus style={styles.cenItemvh} onPress={() => {}}>
            <Icon.Refered />
            <TextCus body2 whiteColor>
              Giới thiệu
            </TextCus>
          </TouchCus>
          <TouchCus
            style={styles.cenItemvh}
            onPress={() => NavigationService.navigate(Routes.RequestSupport)}>
            <Icon.Request />
            <TextCus body2 whiteColor>
              Gửi yêu cầu
            </TextCus>
          </TouchCus>
        </View>
      </View>
    </View>
  );
};
export default WalletInfo;
