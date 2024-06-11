import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {TextCus, Buttons, TextInputs} from 'components';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {IFormWithdraw} from 'types';
import {formatCurrency, getHeight, styleSpacing} from 'utils';
import Icon from 'assets/svg/Icon';

const RequestWithdrawForm = (props: IFormProps) => {
  const {style, availableBalance, onSubmit} = props;
  const {
    control,
    handleSubmit,
    setValue,
    formState: {isDirty, isValid, isSubmitting},
  } = useForm<IFormWithdraw>();

  const isFormError = () => (!isDirty || !isValid) && !isSubmitting;

  const onChangeCoin = (text: string, onChange: (value) => void) => {
    onChange(text);
    if (text) {
      setValue('money', text);
    } else {
      setValue('money', '0');
    }
  };

  return (
    <View style={[styles.wrap, style]}>
      <View style={getHeight(16)} />
      <View
        style={[
          styles.radius4,
          styles.borderMainLight,
          styles.row,
          styles.spaceItem,
          styles.cenItem,
          styleSpacing('px-12'),
          styleSpacing('py-8'),
          styleSpacing('mx-12'),
        ]}>
        <TextCus>Khả dụng</TextCus>
        <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
          <TextCus bold style={[styles.fs24, styles.lh34]}>
            {formatCurrency(availableBalance)}
          </TextCus>
          <View style={styleSpacing('mx-8')}>
            <Icon.ExcCoin />
          </View>
          <TextCus overline medium bgInput>
            EXC-xu
          </TextCus>
        </View>
      </View>
      <View style={getHeight(16)} />
      <View style={styleSpacing('px-16')}>
        <Controller
          control={control}
          name={'coin'}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextCus caption1>Số EXC-xu muốn rút</TextCus>
              <TextInputs
                useBottomSheet
                style={[styles.input, styles.fs16, styles.lh24]}
                autoCapitalize="none"
                placeholder={'Nhập số EXC-xu muốn rút'}
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
                useBottomSheet
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
        <View style={getHeight(12)} />
        <Controller
          control={control}
          name={'bankInfo'}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextCus caption1>Tài khoản ngân hàng</TextCus>
              <TextInputs
                useBottomSheet
                style={[styles.input, styles.fs16, styles.lh24]}
                autoCapitalize="none"
                placeholder={'Nhập thông tin ngân hàng'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                success
              />
            </>
          )}
        />
      </View>
      <View style={getHeight(32)} />
      <View style={[styleSpacing('my-13'), styleSpacing('mx-16')]}>
        <Buttons
          style={isFormError() ? styles.btnDisable : styles.btnActive}
          disabled={isFormError()}
          onPress={() => onSubmit && handleSubmit(onSubmit)()}>
          <TextCus whiteColor medium body2 mr-8>
            Gửi yêu cầu
          </TextCus>
        </Buttons>
      </View>
    </View>
  );
};

interface IFormProps {
  style?: any;
  availableBalance: number;
  onSubmit?: SubmitHandler<IFormWithdraw>;
}

export default RequestWithdrawForm;
