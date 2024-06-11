import {Keyboard, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Buttons,
  IconCus,
  MainLayout,
  TextCus,
  TextInputs,
  TouchCus,
} from 'components';
import styles from './styles';
import {IFormDataLogin} from 'types';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {Colors} from 'theme';
import {
  EnumOTPType,
  getHeight,
  isIos,
  strExists,
  styleSpacing,
  yupSchemaRePassword,
} from 'utils';
import {Divider} from 'react-native-paper';
import {NavigationService, Routes} from 'navigation';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth, useNotify} from 'hooks';

export default function ResetPassword() {
  const {t} = useTranslation();
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormDataLogin>({
    mode: 'onSubmit',
    resolver: yupResolver(yupSchemaRePassword),
  });
  const {params} = NavigationService.route() || '';
  console.log('===========pareamm============', params);

  const {onResetPassword} = useAuth();
  const {success} = useNotify();

  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [passVisible, setPassVissible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);

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

  const onConfirmPassword = () => {
    if (getValues('password') === getValues('rePassword')) {
      if ((params.typeCheck = EnumOTPType.FORGOT)) {
        onResetPassword(
          {
            password: getValues('password') as string,
            phoneNumber: params?.phoneNumber,
            typeCheck: params?.typeCheck,
          },
          () => {
            success(t('success.general'), t('success.register'));
            NavigationService.navigate(Routes.Login);
          },
        );
      } else {
        NavigationService.navigate(Routes.KYC, {
          phoneNumber: params?.phoneNumber,
          password: getValues('password'),
        });
      }
    }
  };

  return (
    <MainLayout showAuthHeader>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.p24}>
          <View style={styles.wrapLogo}>
            <View style={[styles.wrapTitle, styles.cenItemvh]}>
              <IconCus name={'lock'} size={18} color={Colors.white} />
            </View>
            <View style={styles.cenItem}>
              <TextCus
                semibold
                useI18n
                mt-12
                style={[styles.fs24, styles.lh34]}>
                auth.resetpwd_title
              </TextCus>
              <Divider style={getHeight(12)} />
              <TextCus useI18n caption1>
                auth.resetpwd_subtitle
              </TextCus>
              <Divider style={getHeight(35)} />
            </View>
          </View>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInputs
                  style={[styles.input, styles.fs16, styles.fw400]}
                  autoCapitalize="none"
                  placeholder={t('auth.resetpwd_title') as string}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  color={Colors.colorLine}
                  secureTextEntry={!passVisible}
                  rightIcon={
                    <TouchCus onPress={() => setPassVissible(!passVisible)}>
                      <View style={styles.pr5}>
                        <IconCus
                          name={passVisible ? 'eye' : 'eye-slash'}
                          size={18}
                          color={Colors.border}
                        />
                      </View>
                    </TouchCus>
                  }
                  leftIcon={
                    <View style={styleSpacing('mr-16')}>
                      <IconCus
                        style={styles.ml8}
                        name={'lock'}
                        size={18}
                        color={Colors.border}
                      />
                    </View>
                  }
                  success
                />
              </>
            )}
          />
          {errors.password && (
            <TextCus style={styles.fieldTextRequired}>
              {t(errors?.password?.message as string)}
            </TextCus>
          )}
          <View style={getHeight(16)} />
          <Controller
            control={control}
            name="rePassword"
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInputs
                  style={[styles.input, styles.fs16, styles.fw400]}
                  autoCapitalize="none"
                  placeholder={t('auth.resetpwd_confirm_title') as string}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  color={Colors.colorLine}
                  secureTextEntry={!confirmPassVisible}
                  rightIcon={
                    <TouchCus
                      onPress={() =>
                        setConfirmPassVisible(!confirmPassVisible)
                      }>
                      <View style={styles.pr5}>
                        <IconCus
                          name={confirmPassVisible ? 'eye' : 'eye-slash'}
                          size={18}
                          color={Colors.border}
                        />
                      </View>
                    </TouchCus>
                  }
                  leftIcon={
                    <View style={styleSpacing('mr-16')}>
                      <IconCus
                        style={styles.ml8}
                        name={'lock'}
                        size={18}
                        color={Colors.border}
                      />
                    </View>
                  }
                  success
                />
              </>
            )}
          />
          {errors.rePassword && (
            <TextCus style={styles.fieldTextRequired}>
              {t(errors?.rePassword?.message as string)}
            </TextCus>
          )}
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
          onPress={() => handleSubmit(onConfirmPassword)()}
          disabled={false}>
          <TextCus whiteColor useI18n medium style={[styles.lh24]}>
            Hoàn tất
          </TextCus>
        </Buttons>
      </View>
    </MainLayout>
  );
}
