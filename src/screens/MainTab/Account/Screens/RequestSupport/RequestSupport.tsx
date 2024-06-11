import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {
  HomeLayout,
  TextCus,
  IconCus,
  ImageCus,
  TextInputs,
  Buttons,
  BottomSheetModals,
} from 'components';
import styles from './styles';
import {Colors} from 'theme';
import {styleSpacing, REQUEST_SUPPORT_MSG} from 'utils';
import {Controller, useForm} from 'react-hook-form';
import {EUserRequest, IFormRequest} from 'types';
import {Images} from 'assets';
import {useAccount} from 'hooks';
import {NavigationService, Routes} from 'navigation';

const RequestSupport = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {isDirty, isValid, isSubmitting},
  } = useForm<IFormRequest>();
  const {onUserRequest} = useAccount();

  const checkBtnEnable = () => (!isDirty || !isValid) && !isSubmitting;

  const onRequestSupport = (value: IFormRequest) => {
    onUserRequest(
      {content: value.content, type: EUserRequest.feedback},
      rs => rs && setShowModal(true),
    );
  };

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Gửi yêu cầu
      </TextCus>
    ),
  };

  return (
    <>
      <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
        <View style={[styles.container]}>
          <ScrollView
            contentContainerStyle={[
              styleSpacing('px-16'),
              styleSpacing('py-16'),
            ]}>
            <ImageCus source={Images.logo} style={styles.wrapLogo} />
            <TextCus semibold mt-8 style={[styles.fs16, styles.lh24]}>
              Lời nhắn yêu cầu hỗ trợ
            </TextCus>
            <TextCus mt-8 style={styles.justifyTxt}>
              <TextCus>EXC</TextCus>
              <TextCus bgInput>{REQUEST_SUPPORT_MSG}</TextCus>
            </TextCus>
            <Controller
              control={control}
              name={'content'}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputs
                  style={[styles.input, styles.fs16]}
                  textStyle={styles.txtAlignTop}
                  autoCapitalize="none"
                  placeholder={'Bạn đang gặp vấn đề gì?'}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  success
                  multiline={true}
                  numberOfLines={5}
                />
              )}
            />
          </ScrollView>
          <View
            style={[styles.row, styleSpacing('px-16'), styleSpacing('py-8')]}>
            <Buttons
              style={checkBtnEnable() ? styles.btnDisable : styles.btnActive}
              disabled={checkBtnEnable()}
              onPress={() => handleSubmit(onRequestSupport)()}>
              <View style={[styles.row, styles.cenItem]}>
                <TextCus whiteColor medium body2 mr-8>
                  Gửi yêu cầu
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
          onOk={() => setShowModal(false)}
          onClose={() => {
            setShowModal(false);
            NavigationService.reset(Routes.HomeTabs);
          }}
          titleBtn="Trang chủ"
          title="Gửi yêu cầu thành công"
          subtitle="Bạn vừa gửi yêu cầu hỗ trợ thành công.
          Chúng tôi sẽ xử lý yêu cầu của bạn sớm nhất"
        />
      )}
    </>
  );
};

export default RequestSupport;
