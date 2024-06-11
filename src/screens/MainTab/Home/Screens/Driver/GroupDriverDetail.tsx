import {FlatList, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles';
import {
  BottomSheetModalContainer,
  BottomSheetModals,
  CardTicket,
  HomeLayout,
  IconCus,
  ImageCus,
  TextCus,
  TouchCus,
} from 'components';
import {getHeight, getWidth, showImgSrc, styleSpacing} from 'utils';
import Icon from 'assets/svg/Icon';
import {Images} from 'assets';
import {Colors} from 'theme';
import {NavigationService, Routes} from 'navigation';
import {EAction, EActionModal} from 'types';
import {useAuth, useDriver} from 'hooks';
import {Form} from './Components';
import {useTranslation} from 'react-i18next';

const GroupDriverDetail = () => {
  const {t} = useTranslation();
  const {params}: any = NavigationService.route() || '';
  const [rows, setRows] = useState([]);
  const [action, setAction] = useState('');
  const [showModal, setShowModal] = useState('');
  const [itemSelected, setItemSelected] = useState();
  const [isScroll, setIsScroll] = useState(false);
  const [search, setSearch] = useState('');

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    onCreateChannel,
    onListOfDetail,
    onCreateTicketInGroup,
    onPickTicket,
    onReact,
    onDriveUpdateStatus,
    onDriveUpdate,
  } = useDriver();
  const {user} = useAuth();
  const scrollRef = useRef(null);

  const getListMessage = () => {
    onListOfDetail({group_id: params?.id, limit: 20}, rs => {
      const data = rs?.data?.result || [];
      const sortData = data.reverse();
      setRows(sortData);
    });
  };

  useEffect(() => {
    getListMessage();
  }, []);

  // const onSubmit = formData => {
  //   onCreateTicketInGroup({...formData, groupDetailId: params?.id}, () => {
  //     setShowModal('');
  //     getListMessage();
  //   });
  // };
  const onSubmit = formData => {
    onCreateTicketInGroup({...formData, groupDetailId: params?.id}, data => {
      if (data?.status >= 200 && data?.status < 300) {
        setShowModal('');
        getListMessage();
      } else {
        // Set state cho modal lỗi
        setErrorModalVisible(true);
        setErrorMessage(data);
      }
    });
  };
  const handleDismissErrorModal = () => {
    setErrorModalVisible(false);
    NavigationService.navigate(Routes.Recharge);
  };

  const onEditTicket = formData => {
    setIsScroll(false);
    onDriveUpdate({formData: formData, driveId: itemSelected?.id}, () => {
      setShowModal('');
      getListMessage();
    });
  };

  const onReceiveTicket = (item: any) => {
    setIsScroll(false);
    onPickTicket({id: item?.id, phoneNumber: user?.phone_number}, () => {
      getListMessage();
    });
  };

  const onCancelDrive = (item: any) => {
    setIsScroll(false);
    onDriveUpdateStatus(
      {
        id: item?.id,
        status: EAction.CANCELED,
        successMsg: 'Đã hủy cuốc xe',
      },
      () => {
        getListMessage();
      },
    );
  };

  const onSearchGroupDriver = (text: string) => {
    if (text !== null && text !== '') {
      onListOfDetail(
        {group_id: params?.id, type: 'search-message', keyword: text},
        rs => {
          const data = rs?.data?.result || [];
          const sortData = data.reverse();
          setRows(sortData);
        },
      );
    } else {
      getListMessage();
    }
  };

  // const tickets: IItemTicket[] = useMemo(
  //   () => [
  //     {
  //       id: '23aae872-2142-4b69-a88c-ac59fa34eceb',
  //       name: 'Anonymous',
  //       status: 'pending',
  //       route: 'Phố cổ Hà Nội - Bến xe Nam Định',
  //       pay_method: 'coin',
  //       discount: '20%',
  //       amount: 10000,
  //       image: Images.ic_user,
  //       time: '14:05',
  //       emotion: [],
  //     },
  //     {
  //       id: 'string2',
  //       status: 'recevied',
  //       route: 'Phố cổ Hà Nội - Đống Đa',
  //       pay_method: 'cash',
  //       discount: '20%',
  //       amount: 10000,
  //       emotion: [],
  //     },
  //   ],
  //   [],
  // );
  const renderSeparator = () => <View style={styles.divider} />;

  const renderConversation = (items: any) => {
    const item = items?.data ?? items;
    return (
      <>
        {/* <CardInfo
          style={styles.mt12}
          key={item}
          title={'Quản trị Nguyễn Thanh Quan'}
          subtitle={'đã đăng thông báo'}>
          <TextCus>
            Tuyến đường Nguyễn Thị Minh Khai đang sửa đường. Anh em hạn chế sử
            dụng tuyến đường này nhé
          </TextCus>
        </CardInfo> */}
        {/* <CardVote
          style={styles.mt12}
          key={item}
          title={'Quản trị Nguyễn Thanh Quan'}
          subtitle={'đã đăng thông báo'}
          votes={votes}>
          <TextCus>
            Tuyến đường Nguyễn Thị Minh Khai đang sửa đường. Anh em hạn chế sử
            dụng tuyến đường này nhé
          </TextCus>
        </CardVote> */}
        <CardTicket
          showAction={item?.status === EAction.PENDING}
          key={item?.id}
          ticket={item}
          ownerId={user.sub}
          image={item?.owner?.avatar}
          submitReact={onReact}
          isOwner={item?.owner?.phone_number === user?.phone_number}
          driverId={item?.driver_id}
          onShowDetail={() =>
            NavigationService.navigate(Routes.DriveDetail, {
              chatGroup: params?.item,
              driveId: item?.id,
            })
          }
          onChat={() => {
            onCreateChannel({
              userId: user?.sub,
              ownerId: item?.owner_id,
              item,
              chatInfo: null,
            });
          }}
          onPick={() => {
            onReceiveTicket(item);
          }}
          onEdit={() => {
            setItemSelected(item);
            setShowModal(EActionModal.EDIT);
          }}
          onCancel={() => onCancelDrive(item)}
        />
      </>
    );
  };

  const headerProps = {
    showCenter: false,
    renderLeft: useCallback(
      () => (
        <View style={[styles.row, styles.cenItemvh]}>
          <IconCus name={'chevron-left'} size={18} color={Colors.white} />
          <ImageCus
            source={showImgSrc('', params?.item?.image, Images.driver)}
            style={[styles.wrapImg, styles.ml13]}
          />
          <View style={styles.ml6}>
            <TextCus body1 whiteColor semibold>
              {params?.item?.name || ''}
            </TextCus>
            <TextCus body2 whiteColor>
              12 tài xế
            </TextCus>
          </View>
        </View>
      ),
      [],
    ),
    renderRight: () => (
      <View style={[styles.row, styles.cenItemvh]}>
        <TouchCus onPress={() => setAction(EAction.SEARCH)}>
          <Icon.Search />
        </TouchCus>
        <View style={getWidth(14)} />
        <TouchCus
          onPress={() => {
            NavigationService.navigate(Routes.DriverCustom, params.item);
          }}>
          {Icon.ListItem({})}
        </TouchCus>
      </View>
    ),
  };

  const optAction = {action, setAction};
  return (
    <>
      <HomeLayout
        statusBarMode={'dark-content'}
        header={{...headerProps}}
        {...optAction}
        inputProps={{
          onChangeText: text => {
            setSearch(text);
            setTimeout(() => onSearchGroupDriver(text), 2000);
          },
          value: search,
        }}
        onPress={() => {
          onSearchGroupDriver(search);
        }}>
        {/* View tin chua doc
        <View style={[styles.wrapGrpTop]}>
          <View
            style={[
              styles.bgWhite,
              styles.radius30,
              styles.wrapShadow,
              styles.pH8,
            ]}>
            <TouchCus onPress={() => {}} style={[styles.row, styles.cenItemvh]}>
              <View style={getTransformRotate(180)}>
                <Icon.ShowMore />
              </View>
              <TextCus>Tin chưa đọc</TextCus>
            </TouchCus>
          </View>
        </View> */}
        <View style={[styles.container, styles.bgBloc, styles.pH16]}>
          <FlatList
            data={rows}
            ref={scrollRef}
            onContentSizeChange={() => {
              isScroll
                ? setTimeout(
                    () =>
                      rows.length &&
                      scrollRef.current?.scrollToEnd?.({animated: false}),
                    200,
                  )
                : setIsScroll(true);
            }}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styleSpacing('py-20')}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => renderConversation(item)}
          />
        </View>
        <View style={styles.wrapGrpBottom}>
          {/* Show more
          <View>
            <TouchCus onPress={() => {}}>
              <Icon.ShowMore />
            </TouchCus>
          </View> */}
          <View style={getHeight(4)} />
          <TouchCus onPress={() => setShowModal(EActionModal.ADDNEW)}>
            <Icon.AddNew />
          </TouchCus>
        </View>
      </HomeLayout>
      {showModal === EActionModal.LOGIN && (
        <BottomSheetModals
          type={'failure'}
          onOk={() => {}}
          onClose={() => setShowModal('')}
          titleBtn="Đăng nhập"
          title="Bạn chưa đăng nhập"
          subtitle="Để tham gia nhóm, bạn cần đăng nhập"
        />
      )}
      {showModal === EActionModal.ADDNEW && (
        <BottomSheetModalContainer
          onOk={() => {}}
          onClose={() => setShowModal('')}>
          <Form
            onSubmit={formData => onSubmit(formData)}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </BottomSheetModalContainer>
      )}
      {showModal === EActionModal.EDIT && (
        <BottomSheetModalContainer
          showIndicator
          title="Thay đổi thông tin cuốc xe"
          onOk={() => {}}
          onClose={() => setShowModal('')}>
          <Form
            isEdit
            ticket={itemSelected}
            style={styleSpacing('mt-12')}
            onEdit={formData => onEditTicket(formData)}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </BottomSheetModalContainer>
      )}
      {errorModalVisible && (
        <BottomSheetModals
          type={'failure'}
          onOk={handleDismissErrorModal}
          onClose={handleDismissErrorModal}
          titleBtn="Nạp Exc Xu"
          // title={errorMessage?.data?.amount?.errorCode}
          title={t('error.enough_balance') ?? ''}
          subtitle={errorMessage?.data?.amount?.message}
        />
      )}
    </>
  );
};
export default GroupDriverDetail;
