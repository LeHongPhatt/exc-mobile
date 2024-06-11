import {View, ScrollView, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  HomeLayout,
  TextCus,
  IconCus,
  TouchCus,
  BottomSheetModalContainer,
  BottomSheetModals,
} from 'components';
import styles from './styles';
import {Colors} from 'theme';
import {styleSpacing, getHeight, formatCurrency} from 'utils';
import Icon from 'assets/svg/Icon';
import {Divider} from 'react-native-paper';
import {useAccount, useAuth} from 'hooks';
import {NavigationService, Routes} from 'navigation';
import {RequestWithdrawForm} from '../../Components';
import {EUserRequest, IFormWithdraw} from 'types';

const BalanceInfo = () => {
  const [me, setMe] = useState();
  const [showModalRequest, setShowModalRequest] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [coin, setCoin] = useState<string>('');
  const {profile} = useAuth();
  const {onUserRequest} = useAccount();

  useEffect(() => {
    profile && setMe(profile[0]);
  }, [profile]);

  const onRequestWithdraw = (value: IFormWithdraw) => {
    const content = [
      `Tài khoản ngân hàng: ${value.bankInfo}`,
      `Số EXC-xu muốn rút: ${value.coin}`,
    ].join(' - ');
    onUserRequest({content: content, type: EUserRequest.withdraw}, rs => {
      Keyboard.dismiss();
      setCoin(value.coin);
      rs && setShowModalSuccess(true);
    });
  };

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Tài khoản EXC-xu
      </TextCus>
    ),
  };

  return (
    <>
      <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
        <View style={[styles.container]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={getHeight(16)} />
            <View style={styleSpacing('px-16')}>
              <View
                style={[
                  styles.radius4,
                  styles.borderMainLight,
                  styles.row,
                  styles.spaceItem,
                  styles.cenItem,
                  styleSpacing('px-12'),
                  styleSpacing('py-8'),
                ]}>
                <TextCus>Tài khoản</TextCus>
                <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
                  <TextCus bold style={[styles.fs24, styles.lh34]}>
                    {formatCurrency(me?.balance)}
                  </TextCus>
                  <View style={styleSpacing('mx-8')}>
                    <Icon.ExcCoin />
                  </View>
                  <TextCus overline medium bgInput>
                    EXC-xu
                  </TextCus>
                </View>
              </View>
              <View style={getHeight(12)} />
              <View
                style={[
                  styles.radius4,
                  styles.borderMainLight,
                  styles.row,
                  styles.spaceItem,
                  styles.cenItem,
                  styleSpacing('px-12'),
                  styleSpacing('py-8'),
                ]}>
                <TextCus>Khả dụng</TextCus>
                <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
                  <TextCus bold style={[styles.fs24, styles.lh34]}>
                    {formatCurrency(me?.balance_available)}
                  </TextCus>
                  <View style={styleSpacing('mx-8')}>
                    <Icon.ExcCoin />
                  </View>
                  <TextCus overline medium bgInput>
                    EXC-xu
                  </TextCus>
                </View>
              </View>
            </View>
            <View style={getHeight(15)} />
            <Divider style={[styles.divider, getHeight(8)]} />
            <TouchCus
              style={[styleSpacing('px-16'), styleSpacing('py-12')]}
              onPress={() => NavigationService.navigate(Routes.Statistic)}>
              <View style={[styles.row, styles.cenItem, styles.spaceItem]}>
                <TextCus>Tạm ứng</TextCus>
                <TextCus>
                  {`${formatCurrency(me?.advance_payment?.amount)}`} EXC-xu
                </TextCus>
              </View>
              <View style={getHeight(4)} />
              <View style={[styles.row, styles.cenItem, styles.spaceItem]}>
                <TextCus bgInput>
                  {`${me?.advance_payment?.drives ?? 0}`} cuốc xe
                </TextCus>
                {Icon.ChevronRight({color: Colors.border})}
              </View>
            </TouchCus>
            <Divider style={[styles.divider, getHeight(1)]} />
            <TouchCus
              style={[styleSpacing('px-16'), styleSpacing('py-12')]}
              onPress={() => setShowModalRequest(true)}>
              <View style={[styles.row, styles.cenItem, styles.spaceItem]}>
                <TextCus>Yêu cầu rút tiền</TextCus>
                {Icon.ChevronRight({color: Colors.border})}
              </View>
            </TouchCus>
            <Divider style={[styles.divider, getHeight(1)]} />
            <TouchCus
              style={[styleSpacing('px-16'), styleSpacing('py-12')]}
              onPress={() => NavigationService.navigate(Routes.Recharge)}>
              <View style={[styles.row, styles.cenItem, styles.spaceItem]}>
                <TextCus>Nạp EXC-xu</TextCus>
                {Icon.ChevronRight({color: Colors.border})}
              </View>
            </TouchCus>
            <Divider style={[styles.divider, getHeight(1)]} />
          </ScrollView>
        </View>
      </HomeLayout>
      {showModalRequest && (
        <BottomSheetModalContainer
          showIndicator
          title="Yêu cầu rút tiền"
          onOk={() => {}}
          onClose={() => setShowModalRequest(false)}>
          <RequestWithdrawForm
            availableBalance={me?.balance_available}
            onSubmit={value => onRequestWithdraw(value)}
          />
        </BottomSheetModalContainer>
      )}
      {showModalSuccess && (
        <BottomSheetModals
          type={'success'}
          onOk={() => setShowModalSuccess(false)}
          onClose={() => {
            setShowModalSuccess(false);
            setShowModalRequest(false);
          }}
          titleBtn="Xác nhận"
          title="Gửi yêu cầu rút tiền thành công"
          subtitle={`Bạn vừa yêu cầu rút ${coin} EXC-xu. Chúng tôi sẽ hỗ trợ bạn sớm nhất có thể.`}
        />
      )}
    </>
  );
};

export default BalanceInfo;
