import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  HomeLayout,
  TextCus,
  IconCus,
  ImageCus,
  Buttons,
  BottomSheetModals,
} from 'components';
import styles from './styles';
import {Colors} from 'theme';
import {Images} from 'assets';
import {getHeight, getWidth, styleSpacing} from 'utils';
import {Divider} from 'react-native-paper';
import Icon from 'assets/svg/Icon';
import {NavigationService, Routes} from 'navigation';
import {useAccount} from 'hooks';
import {EUserRequest} from 'types';

const RequestDelete = () => {
  const {onUserRequest} = useAccount();
  const [showModal, setShowModal] = useState(false);

  const _onHandleDeleteUser = () => {
    onUserRequest(
      {content: '', type: EUserRequest.remove_account},
      rs => rs && setShowModal(true),
    );
  };

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Xóa tài khoản
      </TextCus>
    ),
  };

  return (
    <>
      <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
        <View style={styles.container}>
          <ScrollView>
            <ImageCus
              source={Images.img_delete_account}
              style={[
                styles.wrapImg,
                styleSpacing('mx-56'),
                styleSpacing('my-32'),
              ]}
            />
            <View style={styles.cenItem}>
              <TextCus title4 redColor medium>
                Lưu ý khi xóa tài khoản
              </TextCus>
            </View>
            <View style={getHeight(16)} />
            <View
              style={[
                styles.wrapCard,
                styles.radius8,
                styleSpacing('mx-16'),
                styleSpacing('px-16'),
                styleSpacing('py-12'),
              ]}>
              <View style={[styles.row]}>
                <Icon.Warning />
                <TextCus ml-11 style={[styles.shrinkTxt, styles.justifyTxt]}>
                  Mọi thông tin cá nhân và thông tin lịch sử của bạn sẽ bị xóa
                </TextCus>
              </View>
              <Divider
                style={[styles.divider, getHeight(1), styleSpacing('my-8')]}
              />
              <View style={[styles.row]}>
                <Icon.Warning />
                <TextCus ml-11 style={[styles.shrinkTxt, styles.justifyTxt]}>
                  Khi đã Xóa tài khoản đồng nghĩa với việc bạn sẽ không thể thực
                  hiện khôi phục lại tài khoản
                </TextCus>
              </View>
            </View>
          </ScrollView>
          <View
            style={[styles.row, styleSpacing('px-16'), styleSpacing('py-8')]}>
            <Buttons
              style={styles.btnBack}
              onPress={() => NavigationService.goBack()}>
              <TextCus whiteColor medium body2>
                Trở về
              </TextCus>
            </Buttons>
            <View style={getWidth(7)} />
            <Buttons style={styles.btnDelete} onPress={_onHandleDeleteUser}>
              <TextCus whiteColor medium body2>
                Xóa tài khoản
              </TextCus>
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
          subtitle="Chúng tôi sẽ xử lý trong vòng 3 ngày làm việc kể từ khi nhận được yêu cầu xóa tài khoản"
        />
      )}
    </>
  );
};

export default RequestDelete;
