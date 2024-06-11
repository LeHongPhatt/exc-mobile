import {Keyboard, ScrollView, View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
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
  getHeight,
  isIos,
  strExists,
  styleSpacing,
  yupSchemaRePassword,
  yupSchemaLogin,
} from 'utils';
import {Divider} from 'react-native-paper';
import {NavigationService, Routes} from 'navigation';
import {useAuth, useNotify} from 'hooks';
import {yupResolver} from '@hookform/resolvers/yup';
import {RouteProp, useRoute} from '@react-navigation/native';

export default function InputPassword() {
  const {t} = useTranslation();
  const [err, setError] = useState('');
  const {success} = useNotify();
  // const route = useRoute < RouteProp<'InputPassword'>();
  const {
    control,
    getValues,
    formState: {errors},
  } = useForm<IFormDataLogin>({
    mode: 'onSubmit',
    resolver: yupResolver(yupSchemaLogin),
    defaultValues: {
      password: '',
    },
  });
  const {phoneNumber}: any = NavigationService.route()?.params || '';
  console.log('+=======phoneNumber======', phoneNumber);
  const {onLogin, onForgotPWOTP} = useAuth();

  // countDown
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [mode, setMode] = useState(false);
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

  // const onHandleLogin = () => {
  //   Keyboard.dismiss();
  //   onLogin(
  //     {
  //       phoneNumber,
  //       password: getValues('password'),
  //     },
  //     rs => rs && NavigationService.replace(Routes.HomeTabs),
  //   );
  // };
  const onHandleLogin = () => {
    Keyboard.dismiss();
    onLogin(
      {
        phoneNumber,
        password: getValues('password'),
      },
      (rs, errorMessage) => {
        if (rs) {
          NavigationService.replace(Routes.HomeTabs);
        } else {
          setError(errorMessage);
        }
      },
    );
  };

  return (
    <MainLayout showAuthHeader>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.p24}>
          <View style={styles.cenItem}>
            <TextCus bold style={styles.fs24}>
              Đăng nhập
            </TextCus>
            <Divider style={getHeight(12)} />
            <TextCus useI18n caption1>
              Nhập mật khẩu để đăng nhập
            </TextCus>
            <Divider style={getHeight(32)} />
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
                  placeholder={t('auth.password') ?? ''}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  color={Colors.colorLine}
                  secureTextEntry={!mode}
                  rightIcon={
                    <TouchCus onPress={() => setMode(!mode)} style={styles.pr5}>
                      <IconCus
                        name={mode ? 'eye' : 'eye-slash'}
                        size={18}
                        color={Colors.border}
                      />
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
                  autoFocus={true}
                  success
                />
              </>
            )}
          />
          {err !== '' && (
            <TextCus style={styles.fieldTextRequired}>
              {/* {t(err as string)} */}
              {/* (t('error.general'),"incorrect_password" ) */}
              {t('error.incorrect_password') ?? ''}
            </TextCus>
          )}

          <TouchCus
            style={[styles.cenItem, styleSpacing('mt-16')]}
            onPress={() => {
              onForgotPWOTP({phoneNumber});
            }}>
            <TextCus mainLightColor>Quên mật khẩu</TextCus>
          </TouchCus>
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
          onPress={onHandleLogin}
          disabled={false}>
          <TextCus
            whiteColor
            useI18n
            style={[styles.fs16, styles.fw400, styles.lh24]}>
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
