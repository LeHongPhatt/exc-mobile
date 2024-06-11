import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  HomeLayout,
  TextCus,
  IconCus,
  TouchCus,
  ImageCus,
  CardReview,
  CardBookingInfo,
  Buttons,
  BottomSheetRatingModals,
} from 'components';
import styles from './styles';
import {Images} from 'assets';
import {
  getPaddingHorizontal,
  getHeight,
  getWidth,
  getPaddingVertical,
  showImgSrc,
} from 'utils';
import {Colors} from 'theme';
import Icon from 'assets/svg/Icon';
import {NavigationService} from 'navigation';
import {Divider} from 'react-native-paper';
import {useDriver, useNotify, useAuth} from 'hooks';
import {EAction} from 'types';

const ChatCustom = () => {
  const {params}: any = NavigationService.route() || '';
  const [showModal, setShowModal] = useState(false);
  const [driveDetail, setDriveDetail] = useState();
  const {onDriveRating, onGetDriveDetail, onDriveUpdateStatus, onPickTicket} =
    useDriver();
  const {info} = useNotify();
  const {user} = useAuth();

  useEffect(() => {
    _onGetDriveDetail();
  }, []);

  const _onGetDriveDetail = () => {
    onGetDriveDetail({driveId: params?.drive?.id}, rs => {
      const data = rs?.data?.result;
      Array.isArray(data) && setDriveDetail(data[0]);
    });
  };

  const _onDriveRating = (amount: number) => {
    if (amount > 0) {
      onDriveRating({point: amount, driveId: driveDetail?.id}, () => {
        setShowModal(false);
        _onGetDriveDetail();
      });
    } else {
      info('Lưu ý', 'Bạn chưa chọn số sao đánh giá');
    }
  };

  const _onCancelDrive = () => {
    onDriveUpdateStatus(
      {
        id: driveDetail?.id,
        status: EAction.CANCELED,
        successMsg: 'Đã hủy cuốc xe',
      },
      () => {
        _onGetDriveDetail();
      },
    );
  };

  const _onPickDrive = () => {
    onPickTicket({id: driveDetail?.id, phoneNumber: user?.phone_number}, () => {
      _onGetDriveDetail();
    });
  };

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Tùy chọn
      </TextCus>
    ),
  };

  return (
    <>
      <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
        <View style={styles.container}>
          {driveDetail && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.flex1}>
              <View style={styles.cenItem}>
                <ImageCus
                  source={showImgSrc(
                    '',
                    driveDetail?.owner?.avatar,
                    Images.driver,
                  )}
                  style={[styles.wrapAvatar, styles.mt14]}
                />
                <View style={getPaddingVertical(12)}>
                  <TextCus title4 medium>
                    {driveDetail?.owner?.full_name}
                  </TextCus>
                </View>
                <TouchCus onPress={() => setShowModal(true)}>
                  <View style={[styles.row, styles.cenItem]}>
                    <CardReview
                      key={driveDetail?.owner?.rating_point}
                      amount={driveDetail?.owner?.rating_point}
                      style={[getPaddingHorizontal(8), getPaddingVertical(5)]}
                    />
                    <View style={styles.ml8}>
                      <TextCus body2 mainLightColor>
                        Đánh giá
                      </TextCus>
                    </View>
                  </View>
                </TouchCus>
              </View>
              <Divider
                style={[
                  getHeight(8),
                  {backgroundColor: Colors.whisper},
                  styles.mt16,
                ]}
              />
              <CardBookingInfo
                key={driveDetail?.id}
                bookingInfo={driveDetail}
                style={styles.radius4}
                isOwner={
                  user?.phone_number === driveDetail?.owner?.phone_number
                }
                onConfirm={() => _onPickDrive()}
              />
              <Divider
                style={[getHeight(8), {backgroundColor: Colors.whisper}]}
              />
              <View
                style={[
                  styles.row,
                  styles.cenItem,
                  styles.wrapOption,
                  getPaddingVertical(8),
                ]}>
                <View style={getPaddingHorizontal(16)}>
                  {Icon.Gallery({color: Colors.border, strokeWidth: 1})}
                </View>
                <View style={styles.flex1}>
                  <TextCus body2>Ảnh đã gửi</TextCus>
                </View>
                <View style={getPaddingHorizontal(16)}>
                  {Icon.ChevronRight({color: Colors.border})}
                </View>
              </View>
              <View
                style={[
                  styles.row,
                  styles.cenItem,
                  styles.wrapOption,
                  getPaddingVertical(8),
                ]}>
                <View style={getPaddingHorizontal(16)}>
                  {Icon.Attach({color: Colors.border, strokeWidth: 1})}
                </View>
                <View style={styles.flex1}>
                  <TextCus body2>File đã gửi</TextCus>
                </View>
                <View style={getPaddingHorizontal(16)}>
                  {Icon.ChevronRight({color: Colors.border})}
                </View>
              </View>
              <View
                style={[
                  styles.row,
                  styles.cenItem,
                  styles.wrapOption,
                  getPaddingVertical(8),
                ]}>
                <View style={getPaddingHorizontal(16)}>
                  {Icon.Link({color: Colors.border})}
                </View>
                <View style={styles.flex1}>
                  <TextCus body2>Link đã gửi</TextCus>
                </View>
                <View style={getPaddingHorizontal(16)}>
                  {Icon.ChevronRight({color: Colors.border})}
                </View>
              </View>
            </ScrollView>
          )}
          {driveDetail?.status === EAction.RECEIVED && (
            <View
              style={[
                styles.row,
                getPaddingHorizontal(16),
                getPaddingVertical(8),
              ]}>
              <Buttons
                style={styles.btnCancel}
                onPress={() => _onCancelDrive()}>
                <TextCus whiteColor medium body2>
                  Hủy cuốc
                </TextCus>
              </Buttons>
              <View style={getWidth(7)} />
              <Buttons style={styles.btnComplain} onPress={() => {}}>
                <TextCus whiteColor medium body2>
                  Khiếu nại
                </TextCus>
              </Buttons>
            </View>
          )}
        </View>
      </HomeLayout>
      {showModal && (
        <BottomSheetRatingModals
          onClose={() => setShowModal(false)}
          title="Đánh giá của bạn?"
          avatar={driveDetail?.owner?.avatar}
          userName={driveDetail?.owner?.full_name}
          ratePoints={driveDetail?.owner?.rating_point}
          onRate={amount => _onDriveRating(amount)}
        />
      )}
    </>
  );
};

export default ChatCustom;
