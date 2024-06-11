import {View, ScrollView, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  HomeLayout,
  TextCus,
  IconCus,
  TouchCus,
  TextInputs,
  CheckBoxCus,
  Buttons,
  BottomSheetModalContainer,
} from 'components';
import styles from './styles';
import {
  getPaddingHorizontal,
  getHeight,
  getPaddingVertical,
  isIos,
  strExists,
} from 'utils';
import {Colors} from 'theme';
import Icon from 'assets/svg/Icon';
import {Divider} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {EActionModal} from 'types';

const Vote = () => {
  // const {params}: any = NavigationService.route() || '';
  const [ans, setAns] = useState([1, 2]);
  // const [noti, setNoti] = useState(false);

  const {control} = useForm();

  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [showModal, setShowModal] = useState('');

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

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Tạo bình chọn
      </TextCus>
    ),
  };

  return (
    <>
      <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[getPaddingHorizontal(16), getPaddingVertical(16)]}>
              <Controller
                control={control}
                name="vote_question"
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
                    <TextInputs
                      style={[styles.input]}
                      autoCapitalize="none"
                      placeholder={'Đặt câu hỏi bình chọn'}
                      multiline={true}
                      textStyle={styles.titleQuestion}
                      onChangeText={onChange}
                      value={value}
                      color={Colors.colorLine}
                      success
                    />
                  </View>
                )}
              />
              {ans.map(e => (
                <Controller
                  control={control}
                  key={`${e}`}
                  name={`vote_answer${e}`}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <View
                      style={[styles.row, styles.spaceItem, styles.cenItem]}>
                      <TextInputs
                        style={[styles.input]}
                        autoCapitalize="none"
                        placeholder={`Phương án ${e}`}
                        onChangeText={onChange}
                        value={value}
                        color={Colors.colorLine}
                        success
                      />
                    </View>
                  )}
                />
              ))}
              <TouchCus
                onPress={() => {
                  return setAns(a => [...a, a.length + 1]);
                }}>
                <TextCus mainLightColor title4>
                  Thêm phương án
                </TextCus>
              </TouchCus>
            </View>
            <Divider
              style={[getHeight(8), {backgroundColor: Colors.whisper}]}
            />
            <TouchCus onPress={() => setShowModal(EActionModal.ADDNEW)}>
              <View
                style={[
                  styles.row,
                  styles.spaceItem,
                  styles.cenItem,
                  styles.wrapOption,
                  getPaddingVertical(8),
                ]}>
                <View style={getPaddingHorizontal(16)}>
                  <TextCus>Đặt thời hạn</TextCus>
                  <TextCus borderColor>Không có thời hạn</TextCus>
                </View>
                <View style={getPaddingHorizontal(16)}>
                  {Icon.ChevronRight({color: Colors.border})}
                </View>
              </View>
            </TouchCus>
            <View
              style={[
                styles.row,
                styles.spaceItem,
                styles.wrapOption,
                getPaddingVertical(8),
              ]}>
              <View style={getPaddingHorizontal(16)}>
                <TextCus>Chọn nhiều phương án</TextCus>
              </View>
              <View style={getPaddingHorizontal(16)}>
                <Controller
                  control={control}
                  name="multi_answer"
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange}}) => (
                    <View
                      style={[styles.row, styles.spaceItem, styles.cenItem]}>
                      <CheckBoxCus onChange={onChange} status={'checked'} />
                    </View>
                  )}
                />
              </View>
            </View>
          </ScrollView>
          <View
            style={[
              styles.row,
              getPaddingHorizontal(24),
              {
                position: 'absolute',
                bottom: strExists(keyboardStatus) ? 20 : isIos ? 20 : 285,
              },
            ]}>
            <Buttons
              style={[styles.flex, styles.btnInActive]}
              onPress={() => {
                // NavigationService.navigate(Routes.OTP, {
                //   phone: getValues('account'),
                // });
                Keyboard.dismiss();
              }}
              disabled={false}>
              <TextCus whiteColor semibold body1>
                Tạo
              </TextCus>
            </Buttons>
          </View>
        </View>
      </HomeLayout>
      {showModal === EActionModal.ADDNEW && (
        <BottomSheetModalContainer
          onOk={() => {}}
          showIndicator
          title={'Đặt thời hạn'}
          onClose={() => setShowModal('')}>
          <Buttons onPress={() => {}} disabled={false}>
            <TextCus whiteColor semibold style={[styles.fs16, styles.lh24]}>
              {'titleBtn'}
            </TextCus>
          </Buttons>
          <Buttons disabled={false}>
            <TextCus mainLightColor semibold style={[styles.fs16, styles.lh24]}>
              {'titleBtn'}
            </TextCus>
          </Buttons>
        </BottomSheetModalContainer>
      )}
    </>
  );
};

export default Vote;
