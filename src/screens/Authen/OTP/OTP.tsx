import {Buttons, MainLayout, TextCus, TouchCus} from 'components';
import {useAuth, useCountDown} from 'hooks';
import {NavigationService, Routes} from 'navigation';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, ScrollView, View} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {Divider} from 'react-native-paper';
import {IFormVerifyOTP} from 'types';
import {getHeight, isIos, strExists, styleSpacing} from 'utils';
import styles from './styles';
import {yupResolver} from '@hookform/resolvers/yup';

const HARD_OTP = '123456';
export default function OTP() {
  const {timer, startTimer, stopTimer} = useCountDown({start: 120});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    timer: _timeR,
    startTimer: startTimerR,
    stopTimer: stopTimerR,
  } = useCountDown({start: 24});
  const {
    control,
    formState: {isDirty, isValid, isSubmitting},
    setValue,
    getValues,
    handleSubmit,
  } = useForm<IFormVerifyOTP>();
  const {params} = NavigationService.route() || '';
  const {onVerifyOTP, onResendOTP} = useAuth();

  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    //type_check
    params?.type_check && setValue('typeCheck', params.type_check);
    params?.otp_code && setValue('otpCode', params.otp_code);
    params?.phoneNumber && setValue('phoneNumber', params.phoneNumber);
    // setTimeout(() => {
    //   params &&
    //     onVerifyOTP({
    //       typeCheck: params.type_check,
    //       otpCode: params.otp_code,
    //       phoneNumber: params.phoneNumber,
    //     });
    // }, 4000);
  }, [JSON.stringify(params)]);

  const onSubmit = useCallback(
    (value: IFormVerifyOTP) => {
      onVerifyOTP(
        {
          typeCheck: value?.typeCheck,
          otpCode: value?.otpCode,
          phoneNumber: value?.phoneNumber,
        },
        data => {
          const message = data?.data?.message;
          setSubmitError(message);
        },
      );
    },
    [onVerifyOTP],
  );

  const onResend = useCallback(() => {
    onResendOTP(
      {
        phoneNumber: params?.phone_number as string,
        typeCheck: params?.type_check,
      },
      rs => {
        setValue('typeCheck', rs?.type_check);
        setValue('otpCode', rs?.otp_code);
        setValue('phoneNumber', rs?.phone_number);
      },
    );
  }, [onResendOTP]);

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

  useEffect(() => {
    if (getValues('otpCode') === HARD_OTP) {
      startTimer(120);
    }
  }, [getValues('otpCode')]);

  const checkOtp = () => {
    return !isDirty || !isValid;
    // return getValues('otpCode') !== HARD_OTP || !isDirty || !isValid;
  };

  return (
    <MainLayout showAuthHeader>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.p24}>
          <View style={styles.wrapLogo}>
            <TextCus bold style={[styles.fs24, styles.lh34]} useI18n>
              auth.otp_title
            </TextCus>
            <Divider style={getHeight(12)} />
            <TextCus useI18n caption1 style={styles.lh18}>
              auth.otp_subtitle
            </TextCus>
            <TextCus caption1 medium style={styles.lh18}>
              {params?.phoneNumber}
            </TextCus>
            <Divider style={getHeight(16)} />
            {checkOtp() && (
              <TextCus style={styles.fw400} useI18n>
                error.error_otp_check
              </TextCus>
            )}
          </View>
          <View style={[styles.rowItem, styles.spaceItem]}>
            <Controller
              control={control}
              name="otpCode"
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
                maxLength: 6,
              }}
              render={({field: {onChange}}) => (
                <OtpInputs
                  keyboardType="phone-pad"
                  handleChange={onChange}
                  numberOfInputs={6}
                  autofillFromClipboard={false}
                  inputStyles={[styles.inputOTP, styles.fs24, styles.fw700]}
                  autoFocus
                />
              )}
            />
          </View>
          {getValues('otpCode') === HARD_OTP ? (
            <View style={[styles.rowItem, styles.cenItemvh, styles.flexWrap]}>
              <TextCus
                bgInput
                textAlign={'center'}
                style={[styles.fw500, styles.lh24, styleSpacing('mr-5')]}>
                Hiệu lực{' '}
              </TextCus>
              <TextCus style={[styles.fw500, styles.lh24]}>
                {`${timer}s`}
              </TextCus>
            </View>
          ) : (
            <View style={[styles.rowItem, styles.cenItemvh, styles.flexWrap]}>
              {/* <TextCus
                bgInput
                textAlign={'center'}
                style={[styles.fw500, styles.lh18, styleSpacing('mr-5')]}
                useI18n></TextCus> */}
              {submitError ? (
                <TextCus
                  bgInput
                  textAlign={'center'}
                  style={[styles.fw500, styles.lh18, styleSpacing('mr-5')]}>
                  {submitError}
                </TextCus>
              ) : (
                <TextCus
                  bgInput
                  useI18n
                  textAlign={'center'}
                  style={[styles.fw500, styles.lh18, styleSpacing('mr-5')]}>
                  {'error.input_otp'}
                </TextCus>
              )}

              <TouchCus
                onPress={() => {
                  onResend();
                  startTimerR(24);
                }}>
                <TextCus
                  mainLightColor
                  style={[
                    styles.fs14,
                    styles.fw500,
                    styles.lh18,
                    styles.underline,
                  ]}>
                  {`Gửi lại (${_timeR})s`}
                </TextCus>
              </TouchCus>
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={[
          styles.rowItem,
          styles.p24,
          {
            position: 'absolute',
            bottom: strExists(keyboardStatus) ? 0 : isIos ? 285 : 0,
          },
        ]}>
        <Buttons
          style={[
            styles.flex1,
            styles.btnContinue,
            checkOtp() && !isSubmitting ? styles.bgDisable : styles.bgValid,
          ]}
          onPress={() => {
            stopTimer();
            stopTimerR();
            // console.log(getValues);

            handleSubmit(onSubmit)();
            // NavigationService.navigate(Routes.HomeTabs);
          }}
          disabled={checkOtp()}>
          <TextCus whiteColor useI18n medium style={[styles.lh22]}>
            Xác thực số điện thoại
          </TextCus>
        </Buttons>
      </View>
    </MainLayout>
  );
}
