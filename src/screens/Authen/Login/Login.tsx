import {Images} from 'assets';
import {
  Buttons,
  IconCus,
  ImageCus,
  MainLayout,
  TextCus,
  TextInputs,
  TouchCus,
} from 'components';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, ScrollView, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {Colors} from 'theme';
import {IFormDataLogin} from 'types';
import {
  EnumTermOfUse,
  getHeight,
  isIos,
  openLink,
  strExists,
  styleSpacing,
  yupSchemaLogin,
} from 'utils';
import styles from './styles';
import {NavigationService, Routes} from 'navigation';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth} from 'hooks';

export default function Login() {
  const {t} = useTranslation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormDataLogin>({
    mode: 'onSubmit',
    resolver: yupResolver(yupSchemaLogin),
    defaultValues: {
      phoneNumber: '',
    },
  });
  const {onRequestOTP} = useAuth();

  const onSubmitInputPhone = useCallback(
    (value: IFormDataLogin) => {
      onRequestOTP({phoneNumber: value.phoneNumber});
    },
    [onRequestOTP],
  );

  console.log('========onRequestOTP======', useAuth);

  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.p24}>
          <View style={styles.wrapLogo}>
            <ImageCus source={Images.logo} style={styles.boxLogo} />
          </View>
          <View style={styles.cenItem}>
            <TextCus bold useI18n style={styles.fs24}>
              auth.login_title
            </TextCus>
            <Divider style={getHeight(8)} />
            <TextCus caption1 medium bgInput>
              Nhập số điện thoại để bắt đầu
            </TextCus>
            <Divider style={getHeight(24)} />
          </View>
          <Controller
            control={control}
            name={'phoneNumber'}
            defaultValue={''}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInputs
                  style={[styles.input]}
                  // textStyle={styles.colorInput}
                  autoCapitalize="none"
                  placeholder={t('phone_number') ?? ''}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  value={value}
                  onBlur={onBlur}
                  color={Colors.dark}
                  leftIcon={
                    <TextCus style={styles.p5} body2>
                      +84
                    </TextCus>
                  }
                  autoFocus={true}
                  success
                />
              </>
            )}
          />

          {errors.phoneNumber && (
            <TextCus style={styles.fieldTextRequired}>
              {t(errors?.phoneNumber?.message as string)}
            </TextCus>
          )}
          {/* <View style={[styles.rowItem, styles.endItem, styleSpacing('mt-8')]}>
            <TouchCus
              onPress={() => {
                // openLink('url', EnumTermOfUse[`${i18n.language}`])
              }}>
              <TextCus caption1 medium mainLightColor>
                Bỏ qua
              </TextCus>
            </TouchCus>
          </View> */}
          {/* <Divider style={getHeight(5)} /> */}
          <View
            style={[
              styles.rowItem,
              styles.cenItemvh,
              styles.flexWrap,
              styleSpacing('mt-24'),
            ]}>
            <TextCus
              bgInput
              textAlign={'center'}
              style={[styles.fw500, styles.lh24, styles.mr2]}>
              Bằng cách bấm tiếp tục, tôi đồng ý
            </TextCus>
            <TouchCus
              onPress={() => {
                // openLink('url', EnumTermOfUse[`${i18n.language}`]);
                openLink('url', EnumTermOfUse['{i18n.language}']);
              }}>
              <TextCus
                mainLightColor
                style={[
                  styles.fs14,
                  styles.fw500,
                  styles.lh18,
                  styles.underline,
                ]}>
                những điều khoản và điều kiện
              </TextCus>
            </TouchCus>
            <TextCus bgInput style={[styles.fw500, styles.lh18, styles.mr2]}>
              {' '}
              của ứng dụng
            </TextCus>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          styles.rowItem,
          styles.p24,
          styles.posAbsolute,
          {bottom: strExists(keyboardStatus) ? 0 : isIos ? 285 : 0},
        ]}>
        <Buttons
          style={[styles.flex1, styles.btlogi, styles.btnActive]}
          onPress={handleSubmit(onSubmitInputPhone)}
          disabled={false}>
          <TextCus whiteColor useI18n medium>
            continue
          </TextCus>
          <IconCus
            style={styles.ml8}
            name={'arrow-right'}
            size={18}
            color={Colors.white}
          />
        </Buttons>
      </View>
    </MainLayout>
  );
}
