import {View, ScrollView, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {
  HomeLayout,
  TextCus,
  IconCus,
  Buttons,
  BottomSheetModals,
  TextInputs,
  TouchCus,
} from 'components';
import styles from './styles';
import {Colors} from 'theme';
import {styleSpacing} from 'utils';
import {useAccount, useAuth} from 'hooks';
import {IFormChangePass} from 'types';
import {Controller, useForm} from 'react-hook-form';

const ChangePassword = () => {
  const {onLogout} = useAuth();
  const {onChangePassword, loading} = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [oldPassVisible, setOldPassVissible] = useState(false);
  const [newPassVisible, setNewPassVissible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);

  const {
    control,
    getValues,
    formState: {errors},
    setError,
    handleSubmit,
  } = useForm<IFormChangePass>();

  const isMatch = () =>
    getValues('newPassword') === getValues('confirmPassword');

  const onRequestChangePassword = (value: IFormChangePass) => {
    if (isMatch()) {
      onChangePassword({...value}, rs => rs && setShowModal(true));
    } else {
      setError('confirmPassword', {
        type: 'custom',
        message: 'Xác nhận mật khẩu không trùng khớp',
      });
    }
  };

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Đổi mật khẩu
      </TextCus>
    ),
  };

  return (
    <>
      <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styleSpacing('px-16'),
              styleSpacing('py-16'),
            ]}>
            <TextCus semibold>Mật khẩu hiện tại</TextCus>
            <Controller
              control={control}
              name={'oldPassword'}
              defaultValue={''}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputs
                  style={[styles.input, styles.fs16, styles.lh24]}
                  autoCapitalize="none"
                  placeholder={'Nhập mật khẩu hiện tại'}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  color={Colors.colorLine}
                  secureTextEntry={!oldPassVisible}
                  rightIcon={
                    <TouchCus
                      onPress={() => setOldPassVissible(!oldPassVisible)}>
                      <View style={styleSpacing('pr-5')}>
                        <IconCus
                          name={oldPassVisible ? 'eye' : 'eye-slash'}
                          size={18}
                          color={Colors.border}
                        />
                      </View>
                    </TouchCus>
                  }
                  leftIcon={
                    <View style={styleSpacing('pr-10')}>
                      <IconCus
                        style={styleSpacing('ml-8')}
                        name={'lock'}
                        size={18}
                        color={Colors.border}
                      />
                    </View>
                  }
                  success
                />
              )}
            />
            {errors.oldPassword && (
              <TextCus style={styles.fieldTextRequired}>
                Mật khẩu hiện tại không được trống
              </TextCus>
            )}
            <TextCus semibold mt-16>
              Mật khẩu mới
            </TextCus>
            <Controller
              control={control}
              name={'newPassword'}
              defaultValue={''}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputs
                  style={[styles.input, styles.fs16, styles.lh24]}
                  autoCapitalize="none"
                  placeholder={'Nhập mật khẩu mới'}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  color={Colors.colorLine}
                  secureTextEntry={!newPassVisible}
                  rightIcon={
                    <TouchCus
                      onPress={() => setNewPassVissible(!newPassVisible)}>
                      <View style={styleSpacing('pr-5')}>
                        <IconCus
                          name={newPassVisible ? 'eye' : 'eye-slash'}
                          size={18}
                          color={Colors.border}
                        />
                      </View>
                    </TouchCus>
                  }
                  leftIcon={
                    <View style={styleSpacing('pr-10')}>
                      <IconCus
                        style={styleSpacing('ml-8')}
                        name={'lock'}
                        size={18}
                        color={Colors.border}
                      />
                    </View>
                  }
                  success
                />
              )}
            />
            {errors.newPassword && (
              <TextCus style={styles.fieldTextRequired}>
                Mật khẩu mới không được trống
              </TextCus>
            )}
            <TextCus semibold mt-16>
              Xác nhận mật khẩu
            </TextCus>
            <Controller
              control={control}
              name={'confirmPassword'}
              defaultValue={''}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputs
                  style={[styles.input, styles.fs16, styles.lh24]}
                  autoCapitalize="none"
                  placeholder={'Xác nhận mật khẩu mới'}
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
                      <View style={styleSpacing('pr-5')}>
                        <IconCus
                          name={confirmPassVisible ? 'eye' : 'eye-slash'}
                          size={18}
                          color={Colors.border}
                        />
                      </View>
                    </TouchCus>
                  }
                  leftIcon={
                    <View style={styleSpacing('pr-10')}>
                      <IconCus
                        style={styleSpacing('ml-8')}
                        name={'lock'}
                        size={18}
                        color={Colors.border}
                      />
                    </View>
                  }
                  success
                />
              )}
            />
            {errors.confirmPassword && (
              <TextCus style={styles.fieldTextRequired}>
                {errors?.confirmPassword?.message ??
                  'Xác nhận mật khẩu không được trống'}
              </TextCus>
            )}
          </ScrollView>
          <View
            style={[styles.row, styleSpacing('px-16'), styleSpacing('py-8')]}>
            <Buttons
              style={styles.btnActive}
              disabled={loading}
              onPress={() => {
                Keyboard.dismiss();
                handleSubmit(onRequestChangePassword)();
              }}>
              <View style={[styles.row, styles.cenItem]}>
                <TextCus whiteColor medium body2 mr-8>
                  Hoàn tất
                </TextCus>
                <IconCus name={'arrow-right'} size={14} color={Colors.white} />
              </View>
            </Buttons>
          </View>
        </View>
      </HomeLayout>
      {showModal && (
        <BottomSheetModals
          type={'success'}
          onOk={() => onLogout()}
          onClose={() => {
            setShowModal(false);
            onLogout();
          }}
          titleBtn="Đăng nhập"
          title="Đổi mật khẩu thành công"
          subtitle="Mật khẩu của bạn đã được thay đổi. Vui lòng đăng nhập lại để tiếp tục"
        />
      )}
    </>
  );
};

export default ChangePassword;
