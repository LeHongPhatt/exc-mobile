import {View, ScrollView, FlatList, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {
  HomeLayout,
  TextCus,
  IconCus,
  TextInputs,
  ImageCus,
  Buttons,
  TouchCus,
  BottomSheetModals,
} from 'components';
import styles from './styles';
import {Colors} from 'theme';
import {styleSpacing, getHeight, rechargeMethod, withoutLeading0} from 'utils';
import {Divider} from 'react-native-paper';
import {EUserRequest, IFormRecharge, IRechargeMethod} from 'types';
import {Controller, useForm} from 'react-hook-form';
import {useAccount} from 'hooks';
import {NavigationService, Routes} from 'navigation';

const Recharge = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalFailure, setShowModalFailure] = useState<boolean>(false);
  const {onUserRequest} = useAccount();
  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    formState: {isDirty, isValid, isSubmitting},
  } = useForm<IFormRecharge>({
    defaultValues: {rechargeMethod: rechargeMethod[0]},
  });

  const isFormError = () => (!isDirty || !isValid) && !isSubmitting;

  const onChangeCoin = (text: string, onChange: (value) => void) => {
    if (Number(text) < 1) {
      onChange('0');
      return;
    }
    if (text) {
      const parseN = withoutLeading0(text);
      onChange(parseN);
      setValue('money', parseN ? Number(parseN).toString() : '0');
    }
  };

  const onSelectRechargeMethod = (index: number) => {
    setSelectedIndex(index);
    setValue('rechargeMethod', rechargeMethod[index]);
  };

  const onRequestRecharge = (value: IFormRecharge) => {
    const content = [
      `Hình thức thanh toán: ${value.rechargeMethod.title}`,
      `Số EXC-xu cần nạp: ${value.coin}`,
    ].join(' - ');
    if (value.rechargeMethod.id === 1) {
      NavigationService.navigate(Routes.BankTransfer, {
        coin: value.coin,
        content: content,
        type: EUserRequest.feedback,
      });
    } else {
      onUserRequest({content: content, type: EUserRequest.feedback}, rs => {
        Keyboard.dismiss();
        rs ? setShowModalSuccess(true) : setShowModalFailure(true);
      });
    }
  };

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Nạp EXC-xu
      </TextCus>
    ),
  };

  const renderSeparator = () => <View style={getHeight(12)} />;

  const renderRechargeMethodItem = (item: IRechargeMethod, index: number) => {
    const isSelected = selectedIndex === index;
    const styleRadio = isSelected
      ? styles.radioSelected
      : styles.radioUnselected;
    const styleMiniRadio = isSelected
      ? styles.miniRadioSelected
      : styles.miniRadioUnselected;
    return (
      <TouchCus key={item.id} onPress={() => onSelectRechargeMethod(index)}>
        <View
          style={[
            styles.row,
            styles.cenItem,
            styles.radius4,
            styles.borderWhisper,
            styleSpacing('px-12'),
            styleSpacing('py-8'),
          ]}>
          <View style={[styleRadio, styles.cenItemvh]}>
            <View style={styleMiniRadio} />
          </View>
          <View style={[styles.flex1, styleSpacing('mx-12')]}>
            <TextCus medium>{item.title}</TextCus>
            <TextCus caption1 bgInput>
              {item.subtitle}
            </TextCus>
          </View>
          <View>
            {item.icons.map((e, iconIndex) => (
              <ImageCus
                key={e}
                source={e}
                style={[
                  styles.wrapPaymentMethod,
                  iconIndex !== 0 && styleSpacing('mt-5'),
                ]}
              />
            ))}
          </View>
        </View>
      </TouchCus>
    );
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
                  styles.borderWhisper,
                  styleSpacing('px-12'),
                  styleSpacing('py-12'),
                ]}>
                <TextCus medium>Giới thiệu về EXC-xu</TextCus>
                <TextCus caption1 mt-8 style={styles.justifyTxt}>
                  EXC-xu có thể dùng để đăng cuốc xe và nhận cuốc xe
                </TextCus>
              </View>
            </View>
            <View style={getHeight(15)} />
            <Divider style={[styles.divider, getHeight(8)]} />
            <View style={[styleSpacing('px-16'), styleSpacing('py-16')]}>
              <Controller
                control={control}
                name={'coin'}
                rules={{required: true, min: 1}}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <TextCus caption1>Số EXC-xu cần nạp</TextCus>
                    <TextInputs
                      style={[styles.input, styles.fs16, styles.lh24]}
                      autoCapitalize="none"
                      placeholder={'Nhập số EXC-xu cần nạp'}
                      onChangeText={val => onChangeCoin(val, onChange)}
                      onBlur={onBlur}
                      value={value}
                      textAlign={'right'}
                      success
                      rightIcon={value && <TextCus ml-5>EXC-xu</TextCus>}
                      keyboardType="number-pad"
                    />
                  </>
                )}
              />
              <View style={getHeight(12)} />
              <Controller
                control={control}
                name={'money'}
                defaultValue={'0'}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <TextCus caption1>Số tiền tương ứng</TextCus>
                    <TextInputs
                      style={[styles.input, styles.fs16, styles.lh24]}
                      autoCapitalize="none"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      textAlign={'right'}
                      success
                      editable={false}
                      rightIcon={<TextCus ml-5>VNĐ</TextCus>}
                      keyboardType="number-pad"
                    />
                  </>
                )}
              />
            </View>
            <Divider style={[styles.divider, getHeight(8)]} />
            <View style={styleSpacing('p-16')}>
              <TextCus semibold style={[styles.fs16, styles.lh24]}>
                Chọn hình thức thanh toán
              </TextCus>
              <View style={getHeight(16)} />
              <Controller
                control={control}
                name={'rechargeMethod'}
                rules={{required: true}}
                render={() => (
                  <FlatList
                    data={rechargeMethod}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    ItemSeparatorComponent={renderSeparator}
                    renderItem={({item, index}) =>
                      renderRechargeMethodItem(item, index)
                    }
                  />
                )}
              />
            </View>
          </ScrollView>
          <View
            style={[
              styles.wrapShadow,
              styleSpacing('px-16'),
              styleSpacing('py-8'),
              {backgroundColor: Colors.white},
            ]}>
            <TextCus style={styles.justifyTxt}>
              <TextCus>
                Bằng việc hoàn tất thanh toán này, bạn đồng ý với các{' '}
              </TextCus>
              <TextCus mainLightColor>điều khoản chung</TextCus>
              <TextCus> của chúng tôi</TextCus>
            </TextCus>
            <View style={[styles.row, styleSpacing('mt-8')]}>
              <Buttons
                style={isFormError() ? styles.btnDisable : styles.btnActive}
                disabled={isFormError()}
                onPress={() => handleSubmit(onRequestRecharge)()}>
                <View style={[styles.row, styles.cenItem]}>
                  <TextCus whiteColor medium body2 mr-8>
                    Nạp EXC-xu
                  </TextCus>
                  <IconCus
                    name={'arrow-right'}
                    size={14}
                    color={Colors.white}
                  />
                </View>
              </Buttons>
            </View>
          </View>
        </View>
      </HomeLayout>
      {showModalSuccess && (
        <BottomSheetModals
          type={'success'}
          onOk={() => setShowModalSuccess(false)}
          onClose={() => setShowModalSuccess(false)}
          titleBtn="Xác nhận"
          title="Nạp xu thành công"
          subtitle={`Bạn vừa nạp thành công ${getValues(
            'coin',
          )} EXC-xu vào tài khoản`}
        />
      )}
      {showModalFailure && (
        <BottomSheetModals
          type={'failure'}
          onOk={() => setShowModalFailure(false)}
          onClose={() => setShowModalFailure(false)}
          titleBtn="Thử lại"
          title="Nạp xu không thành công"
          subtitle="Vui lòng thử lại"
        />
      )}
    </>
  );
};

export default Recharge;
