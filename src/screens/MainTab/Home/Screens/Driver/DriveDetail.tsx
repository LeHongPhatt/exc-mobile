import {View, ScrollView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  HomeLayout,
  TextCus,
  IconCus,
  ImageCus,
  Buttons,
  TouchCus,
  BottomSheetModalContainer,
} from 'components';
import styles from './styles';
import {Images} from 'assets';
import {
  getHeight,
  getWidth,
  styleSpacing,
  formatHMDMY,
  showImgSrc,
} from 'utils';
import {Colors} from 'theme';
import {NavigationService} from 'navigation';
import {Divider} from 'react-native-paper';
import {EAction} from 'types';
import {useDriver, useAuth} from 'hooks';
import {Form} from './Components';

const DriveDetail = () => {
  const {params}: any = NavigationService.route() || '';
  const {
    onGetDriveDetail,
    onCreateChannel,
    onDriveUpdate,
    onDriveUpdateStatus,
  } = useDriver();
  const {user} = useAuth();
  const [detail, setDetail] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    onGetDetail();
  }, []);

  useEffect(() => {
    let _isOwner = detail?.owner?.phone_number === user?.phone_number;
    setIsOwner(_isOwner);
  }, [detail]);

  const onGetDetail = () => {
    onGetDriveDetail({driveId: params?.driveId}, rs => {
      const data = rs?.data?.result;
      Array.isArray(data) && setDetail(data[0]);
    });
  };

  const onEditDrive = formData => {
    onDriveUpdate({formData: formData, driveId: detail?.id}, () => {
      setShowModal(false);
      onGetDetail();
    });
  };

  const onCancelDrive = () => {
    onDriveUpdateStatus(
      {
        id: detail?.id,
        status: EAction.CANCELED,
        successMsg: 'Đã hủy cuốc xe',
      },
      () => {
        onGetDetail();
      },
    );
  };

  const getUnreadMessage = (amount: number) => {
    if (amount > 99) {
      return '99+';
    } else {
      return `${amount}`;
    }
  };

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Cuốc xe
      </TextCus>
    ),
  };

  const renderDriverContact = (item: any) => {
    return (
      <>
        <TouchCus
          onPress={() => {
            onCreateChannel({
              ownerId: user?.sub,
              userId: item?.chat_users[0]?.user_id,
              item: detail,
              chatInfo: item,
            });
          }}>
          <View style={[styleSpacing('px-16'), styleSpacing('py-8')]}>
            <View style={[styles.row, styles.cenItem]}>
              <ImageCus
                source={showImgSrc(
                  '',
                  item?.chat_users[0]?.user?.avatar,
                  Images.driver,
                )}
                style={styles.wrapImg}
              />
              <View style={getWidth(6)} />
              <View style={styles.flex}>
                <TextCus medium>{item?.chat_users[0]?.user?.full_name}</TextCus>
                <TextCus caption1 bgInput>
                  {item?.latest_message}
                </TextCus>
              </View>
              <View style={getWidth(6)} />
              <View style={styles.alignEnd}>
                <TextCus label2 bgInput>
                  1 giây
                </TextCus>
                <View style={getHeight(6)} />
                <View style={[{backgroundColor: Colors.main}, styles.radius12]}>
                  {getUnreadMessage(item?.chat_users[0]?.unread_message) !==
                    '0' && (
                    <TextCus caption1 medium whiteColor px-4>
                      {getUnreadMessage(item?.chat_users[0]?.unread_message)}
                    </TextCus>
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchCus>
        <Divider style={[getHeight(1), {backgroundColor: Colors.whisper}]} />
      </>
    );
  };

  return (
    <>
      <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
        <View style={styles.container}>
          {detail && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.flex}>
              <View style={[styleSpacing('px-16'), styleSpacing('py-12')]}>
                <View style={[styles.row, styles.cenItem]}>
                  {detail?.drive_code && (
                    <View
                      style={[
                        {backgroundColor: Colors.colorSolitude},
                        styles.radius37,
                      ]}>
                      <TextCus label2 py-4 px-8>
                        #{detail?.drive_code}
                      </TextCus>
                    </View>
                  )}
                  <View style={getWidth(8)} />
                  <TextCus medium mainLightColor>
                    {detail?.name}
                  </TextCus>
                </View>
                <View style={getHeight(12)} />
                <View style={[styles.row, styles.spaceItem]}>
                  <View>
                    <TextCus>Thời gian đăng</TextCus>
                    <View style={getHeight(4)} />
                    <TextCus medium>{formatHMDMY(detail?.createdAt)}</TextCus>
                  </View>
                  <View style={styles.alignEnd}>
                    <TextCus>Trạng thái</TextCus>
                    <View style={getHeight(4)} />
                    <View
                      style={[
                        detail?.status === EAction.RECEIVED
                          ? {backgroundColor: Colors.main}
                          : {backgroundColor: Colors.mainLight},
                        styles.radius37,
                      ]}>
                      <TextCus label2 useI18n whiteColor px-8 py-4>
                        {detail?.status}
                      </TextCus>
                    </View>
                  </View>
                </View>
                <Divider
                  style={[
                    getHeight(1),
                    styleSpacing('my-12'),
                    {backgroundColor: Colors.mainLight},
                  ]}
                />
                <View style={[styles.row, styles.spaceItem]}>
                  <TextCus>Hình thức thanh toán</TextCus>
                  <TextCus medium useI18n>
                    {detail?.payment_type}
                  </TextCus>
                </View>
                <View style={getHeight(12)} />
                <View style={[styles.row, styles.spaceItem]}>
                  <TextCus>Số tiền</TextCus>
                  <TextCus medium>{detail?.amount}</TextCus>
                </View>
                <View style={getHeight(12)} />
                <View style={[styles.row, styles.spaceItem]}>
                  <TextCus>Phí giới thiệu</TextCus>
                  <TextCus medium>{detail?.commission}%</TextCus>
                </View>
                <Divider
                  style={[
                    getHeight(1),
                    styleSpacing('my-12'),
                    {backgroundColor: Colors.mainLight},
                  ]}
                />
                <TextCus>Đăng trong nhóm</TextCus>
                <View style={getHeight(4)} />
                <View style={[styles.row, styles.cenItem]}>
                  <ImageCus
                    source={showImgSrc(
                      '',
                      params?.chatGroup?.image,
                      Images.driver,
                    )}
                    style={styles.wrapImg}
                  />
                  <View style={getWidth(4)} />
                  <TextCus>{params?.chatGroup?.name}</TextCus>
                </View>
                <TextCus mt-12>Cuốc xe nhận bởi</TextCus>
                <TextCus mainLightColor mt-4>
                  {detail?.driver?.full_name ?? 'Chưa xác định'}
                </TextCus>
                <TextCus mainColor mt-12>
                  Để bản đảm quyền lợi cho tài xế, EXC sẽ tạm giữ một phần
                  EXC-xu trong tài khoản của bạn, tương đương giá trị của cuốc
                  xe. Sau khi cuốc xe hoàn tất 24h, số EXC-xu sẽ được hoàn trả
                  vào tài khoản của bạn.
                </TextCus>
              </View>
              {isOwner && (
                <View style={{backgroundColor: Colors.bgBlocAdv}}>
                  <TextCus medium px-16 py-12 style={styles.fs16}>
                    Danh sách tài xế liên hệ
                  </TextCus>
                </View>
              )}
              {detail?.rooms && isOwner && (
                <FlatList
                  data={detail?.rooms}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styleSpacing('mb-12')}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item}) => renderDriverContact(item)}
                />
              )}
            </ScrollView>
          )}
          {isOwner && detail?.status === EAction.PENDING && (
            <View
              style={[styles.row, styleSpacing('px-16'), styleSpacing('py-8')]}>
              <Buttons style={styles.btnCancel} onPress={() => onCancelDrive()}>
                <TextCus whiteColor medium body2>
                  Hủy cuốc
                </TextCus>
              </Buttons>
              <View style={getWidth(7)} />
              <Buttons
                style={styles.btnEdit}
                onPress={() => setShowModal(true)}>
                <TextCus whiteColor medium body2>
                  Chỉnh sửa
                </TextCus>
              </Buttons>
            </View>
          )}
        </View>
      </HomeLayout>
      {showModal && (
        <BottomSheetModalContainer
          showIndicator
          title="Thay đổi thông tin cuốc xe"
          onOk={() => {}}
          onClose={() => setShowModal(false)}>
          <Form
            isEdit
            ticket={detail}
            style={styleSpacing('mt-12')}
            onEdit={formData => onEditDrive(formData)}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </BottomSheetModalContainer>
      )}
    </>
  );
};

export default DriveDetail;
