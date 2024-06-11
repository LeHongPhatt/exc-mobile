import {FlatList, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './styles';
import {
  CardInfo,
  CardTicketOne,
  CardBookingInfo,
  CardReview,
  CardImage,
  CardChat,
  HomeLayout,
  IconCus,
  ImageCus,
  TextCus,
  TouchCus,
  TextInputs,
  ModalCus,
  ImageViewerCus,
} from 'components';
import {getWidth, getPaddingHorizontal, getPaddingVertical} from 'utils';
import Icon from 'assets/svg/Icon';
import {Images} from 'assets';
import {Colors} from 'theme';
import {NavigationService, Routes} from 'navigation';
import {EAction, IItemTicketOne, IItemBookingInfo, IItemImage} from 'types';

const ChatDetail = () => {
  const {params}: any = NavigationService.route() || '';
  const [action, setAction] = useState('');
  const [imgSelected, setImgSelected] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  const listImage = [
    Images.flash_01,
    Images.flash_02,
    Images.flash_03,
    Images.flash_04,
    Images.flash_05,
    Images.image20,
  ];

  const bookingInfo: IItemBookingInfo = useMemo(
    () => ({
      id: 'string1',
      name: 'Phố cổ Hà Nội - Bến xe Nam Định',
      status: 'pending',
      poster_name: 'Trần Hải Bình',
      pay_method: 'Chuyển xu',
      amount: 1000000,
      referral_fee: '12%',
    }),
    [],
  );

  const cardImage: IItemImage = useMemo(
    () => ({
      id: 'string1',
      images: [
        Images.flash_01,
        Images.flash_02,
        Images.flash_03,
        Images.flash_04,
        Images.flash_05,
        Images.image20,
      ],
      comment: 'Xe của tôi',
      time: '14:05',
      emotion: [],
    }),
    [],
  );

  const tickets: IItemTicketOne[] = useMemo(
    () => [
      {
        id: 'string1',
        name: 'Trần Văn Cung',
        route: 'Phố cổ Hà Nội - Bến xe Nam Định',
        pay_method: 'coin',
        referral_fee: '20%',
        amount: 1000000,
      },
      {
        id: 'string2',
        name: 'Trần Văn Cung',
        route: 'Phố cổ Hà Nội - Đống Đa',
        pay_method: 'cash',
        referral_fee: '20%',
        amount: 1000000,
      },
    ],
    [],
  );

  const onSelectImage = (index: number) => {
    setImgSelected(index);
    setShowModal(true);
  };

  const renderConversation = (item: any) => (
    <View>
      <CardInfo
        style={styles.mt12}
        key={item}
        title={'Bạn muốn nhận cuốc xe'}
        subtitle={item.route}
        titleStyle={{color: Colors.dark}}
        subtitleStyle={{color: Colors.mainLight}}>
        <View style={styles.cenItem}>
          <TextCus body2 medium bgInput>
            Bắt đầu trao đổi để hoàn tất cuốc xe
          </TextCus>
        </View>
      </CardInfo>
      <CardChat style={styles.mt12} message="Chào bạn" position="right" />
      <CardChat style={styles.mt12} message="Chào bạn" />
      <CardChat
        style={styles.mt12}
        message="Bạn ơi, khách đổi sang trả tiền mặt đó bạn nhé"
        showEmotions
      />
      <CardTicketOne style={styles.mt12} key={item.id} ticketOne={item} />
      <CardImage
        style={styles.mt12}
        key={cardImage.id + 1}
        cardImage={cardImage}
        onSelectImage={onSelectImage}
      />
    </View>
  );

  const headerProps = {
    showCenter: false,
    renderLeft: () => (
      <View style={[styles.row, styles.cenItemvh]}>
        <IconCus name={'chevron-left'} size={18} color={Colors.white} />
        <ImageCus
          source={params?.icon ?? Images.flash_01}
          style={[styles.wrapImg, styles.ml13]}
        />
        <View style={styles.ml6}>
          <TextCus body1 whiteColor semibold>
            Trần Văn Cung
          </TextCus>
          <CardReview
            key={4.5}
            amount={4.5}
            style={[getPaddingHorizontal(8), getPaddingVertical(4)]}
          />
        </View>
      </View>
    ),
    renderRight: () => (
      <View style={[styles.row, styles.cenItemvh]}>
        <TouchCus onPress={() => setAction(EAction.SEARCH)}>
          <Icon.Search />
        </TouchCus>
        <View style={getWidth(14)} />
        <TouchCus onPress={() => NavigationService.navigate(Routes.ChatCustom)}>
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
        {...optAction}>
        <View style={[styles.container, styles.bgBloc]}>
          <CardBookingInfo
            key={bookingInfo}
            bookingInfo={bookingInfo}
            style={styles.radius4}
          />
          <FlatList
            data={tickets}
            scrollEnabled={true}
            contentContainerStyle={[getPaddingHorizontal(16), styles.pb20]}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => renderConversation(item)}
          />
          <View
            style={[
              styles.row,
              styles.wrapBot,
              styles.cenItem,
              getPaddingHorizontal(16),
              getPaddingVertical(4),
            ]}>
            {Icon.Camera({color: Colors.mainLight})}
            <View style={getPaddingHorizontal(12)}>
              {Icon.Gallery({color: Colors.mainLight})}
            </View>
            {Icon.Attach({color: Colors.mainLight})}
            <TextInputs
              style={styles.inputChat}
              placeholder={'Tin nhắn'}
              rightIcon={
                <TouchCus onPress={() => {}}>
                  {Icon.Send({color: Colors.border})}
                </TouchCus>
              }
              success
            />
          </View>
          <ModalCus visible={showModal} hideModal={() => setShowModal(false)}>
            <ImageViewerCus
              images={listImage}
              imageIndex={imgSelected}
              avatar={Images.hd_user}
              userName="Trần Hải Bình"
              time="17:00 17/12/2022"
              onPressLeft={() => setShowModal(false)}
            />
          </ModalCus>
        </View>
      </HomeLayout>
    </>
  );
};

export default ChatDetail;
