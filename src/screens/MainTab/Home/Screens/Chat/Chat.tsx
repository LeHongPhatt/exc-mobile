import {
  FlatList,
  Keyboard,
  View,
  Platform,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import styles from './styles';
import {
  CardBookingInfo,
  CardReview,
  CardChat,
  HomeLayout,
  IconCus,
  ImageCus,
  TextCus,
  TouchCus,
  TextInputs,
  Buttons,
  CardDetail,
} from 'components';
import {
  getWidth,
  getPaddingHorizontal,
  getPaddingVertical,
  EnumPosition,
  showImgSrc,
  dimensions,
  getHeight,
  styleSpacing,
  formatDMY,
  yupSchemaInfoUser,
} from 'utils';
import Icon from 'assets/svg/Icon';
import {Colors} from 'theme';
import {NavigationService, Routes} from 'navigation';
import {EAction} from 'types';
// import io from 'socket.io-client/dist/socket.io.js';
import {io} from 'socket.io-client';
import {API_HOST} from '@env';
import {useAuth, useChat, useDriver} from 'hooks';
import {Images} from 'assets';
import {Controller, useForm} from 'react-hook-form';
import {IUserKYC, SELECT_OPTION} from 'types';
import ImagePicker, {Options, openCamera} from 'react-native-image-crop-picker';
import {yupResolver} from '@hookform/resolvers/yup';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const {width} = dimensions;

const UploadImageConfig: Options = {
  width: 300,
  height: 300,
  cropping: true,
  includeBase64: false,
  multiple: true,
};

const Chat = () => {
  const {user} = useAuth();
  const {onGetMessageFromUser, onGetDriveDetail, onPickTicket} = useDriver();
  const {onSearchMessage, onImageMessage} = useChat();
  const {params}: any = NavigationService.route() || {};
  const [action, setAction] = useState('');
  const [msg, setMsg] = useState('');
  const [rows, setRows] = useState<any[]>([]);
  const [driveDetail, setDriveDetail] = useState();
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const [previousMessages, setPreviousMessages] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');

  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<IUserKYC>({
    mode: 'onSubmit',
    resolver: yupResolver(yupSchemaInfoUser),
    // defaultValues: {...initValuesForm},
  });

  useEffect(() => {
    if (showSpecialMessage && params?.drive) {
      // Tạo nội dung cho tin nhắn đặc biệt
      const specialMessageContent = (
        <CardDetail
          key={params?.drive?.id}
          bookingInfo={params?.drive}
          style={styles.radius4}
        />
      );

      // Tạo tin nhắn đặc biệt chứa thông tin từ CardBookingInfo
      const specialMessage = {
        id: 'special',
        type: 'booking_info',
        content: specialMessageContent,
      };

      // Lưu lại dữ liệu tin nhắn trước đó
      setPreviousMessages([...previousMessages, ...rows]);

      // Cập nhật danh sách tin nhắn (đặc biệt ở đầu, sau đó là tin nhắn trước đó)
      setRows([specialMessage, ...previousMessages]);

      // Ẩn thông báo đặc biệt sau khi đã hiển thị
      setShowSpecialMessage(false);
    }
  }, [showSpecialMessage, params?.drive]);

  // ... (existing code)

  useEffect(() => {
    if (params?.drive) {
      setShowSpecialMessage(true);
    }
  }, [params?.drive]);

  const capturePhoto = async () => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      console.log('result:', result);
      if (result === RESULTS.GRANTED) {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(images => {
            // Thêm hình ảnh vào danh sách imageList
            const imageList = [images];
            onImageMessage({roomId: params.room, imageFiles: imageList}, rs => {
              onGetMessageFromUser({roomId: params?.room}, rs => {
                const data = rs?.data?.result || [];
                Array.isArray(data) && setRows(data);
              });
            });
          })
          .catch(error => {
            console.log('Error selecting images:', error);
          });
      }
    });
  };

  const handleSelectImage = () => {
    ImagePicker.openPicker({
      ...UploadImageConfig,
      multiple: true, // Enable multiple image selection
    })
      .then(images => {
        console.log('===========Image===========', images);
        // Thêm hình ảnh vào danh sách imageList
        const newImageList = {...images};
        onImageMessage({roomId: params.room, imageFiles: images}, rs => {
          onGetMessageFromUser({roomId: params?.room}, rs => {
            const data = rs?.data?.result || [];
            Array.isArray(data) && setRows(data);
          });
        });
      })
      .catch(error => {
        console.log('Error selecting images:', error);
      });
  };

  const prevRef = useRef<any>({socket: io(API_HOST), socketId: null}).current;
  const scrollRef = useRef<any>(null);
  console.log('params-chat', JSON.stringify(params));

  const _onGetDriveDetail = () => {
    onGetDriveDetail({driveId: params?.drive?.id}, rs => {
      const data = rs?.data?.result;
      Array.isArray(data) && setDriveDetail(data[0]);
    });
  };

  const _onPickDrive = () => {
    onPickTicket(
      {id: params?.drive?.id, phoneNumber: user?.phone_number},
      () => {
        _onGetDriveDetail();
      },
    );
  };

  const onSearchMessageRequest = (text: string) => {
    if (text !== null && text !== '') {
      onSearchMessage({roomId: params?.room, keyword: text}, rs => {
        const data = rs?.data?.result || [];
        console.log('======data==========', data);
        Array.isArray(data) && setRows(data);
      });
    } else {
      onGetMessageFromUser({roomId: params?.room}, rs => {
        const data = rs?.data?.result || [];
        Array.isArray(data) && setRows(data);
      });
    }
  };

  useEffect(() => {
    params?.room &&
      onGetMessageFromUser({roomId: params?.room}, rs => {
        const data = rs?.data?.result || [];
        Array.isArray(data) && setRows(data);
      });
  }, [params?.room]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      rows.length && scrollRef.current?.scrollToEnd?.({animated: false});
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      rows.length && scrollRef.current?.scrollToEnd?.({animated: false});
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    prevRef.socket?.emit('joinRoom', {
      room: params.room,
      userId: user?.sub,
      phoneNumber: user?.phone_number,
    });
    return () => {
      prevRef.socket?.disconnect();
      prevRef.socket = null;
      prevRef.socketId = null;
    };
  }, []);

  useEffect(() => {
    prevRef.socketId !== params.room &&
      prevRef.socket?.on('message', mes => {
        prevRef.socketId = params.room;
        setRows(r => [...r, mes]);
      });
  }, []);

  const renderConversation = (item: any) => {
    console.log('=========item=========', item);
    const pos =
      item?.from?.user_id === user.sub ||
      item?.phoneNumber === user?.phone_number;
    const avatar = params?.chatInfo
      ? params?.chatInfo.chat_users[0]?.user?.avatar
      : params?.drive?.owner?.avatar;
    // const box_chat = item?.box_chat;

    return (
      <CardChat
        style={styles.mt12}
        message={item?.text}
        images={item?.image_files}
        position={pos ? EnumPosition.R : EnumPosition.L}
        // showEmotions
        avatar={avatar}
        matched={item?.matched}
        box_chat={item?.type === 'booking_info' ? item?.content : undefined} // Hiển thị booking_info nếu có
      />
    );
  };

  const headerProps = {
    showCenter: false,
    renderLeft: () => {
      const avatar = params?.chatInfo
        ? params?.chatInfo.chat_users[0]?.user?.avatar
        : params?.drive?.owner?.avatar;
      const fullName = params?.chatInfo
        ? params?.chatInfo.chat_users[0]?.user?.full_name
        : params?.drive?.owner?.full_name;
      const ratingPoint = params?.chatInfo
        ? params?.chatInfo.chat_users[0]?.user?.rating_point
        : params?.drive?.owner?.rating_point;
      return (
        <View style={[styles.row, styles.cenItemvh]}>
          <IconCus name={'chevron-left'} size={18} color={Colors.white} />
          <ImageCus
            source={showImgSrc('', avatar, Images.driver)}
            style={[styles.wrapImg, styles.ml13]}
          />
          <View style={[styles.ml6, styles.alignStart]}>
            <TextCus body1 whiteColor semibold>
              {fullName}
            </TextCus>
            <CardReview
              key={ratingPoint}
              amount={ratingPoint}
              style={[getPaddingHorizontal(8), getPaddingVertical(4)]}
            />
          </View>
        </View>
      );
    },
    renderRight: () => (
      <View style={[styles.row, styles.cenItemvh]}>
        <TouchCus onPress={() => setAction(EAction.SEARCH)}>
          <Icon.Search />
        </TouchCus>
        <View style={getWidth(14)} />
        <TouchCus
          onPress={() =>
            NavigationService.navigate(Routes.ChatCustom, {...params})
          }>
          {Icon.ListItem({})}
        </TouchCus>
      </View>
    ),
  };

  const optAction = {action, setAction};

  const onSubmit = () => {
    prevRef.socket?.emit('chatMessage', msg);
    setMsg('');
  };

  return (
    <>
      <HomeLayout
        statusBarMode={'dark-content'}
        header={{...headerProps}}
        {...optAction}
        inputProps={{
          onChangeText: text => {
            setSearch(text);
            setTimeout(() => onSearchMessageRequest(text), 2000);
          },
          value: search,
        }}
        onPress={() => onSearchMessageRequest(search)}>
        <View style={[styles.container, styles.bgBloc]}>
          {(driveDetail && (
            <CardBookingInfo
              key={driveDetail?.id}
              bookingInfo={driveDetail}
              style={styles.radius4}
              isOwner={true}
              onConfirm={() => _onPickDrive()}
            />
          )) ||
            (params?.drive && (
              <CardBookingInfo
                key={params?.drive?.id}
                bookingInfo={params?.drive}
                style={styles.radius4}
                isOwner={
                  user?.phone_number === params?.drive?.owner?.phone_number
                }
                onConfirm={() => _onPickDrive()}
              />
            ))}
          <FlatList
            data={rows}
            scrollEnabled={true}
            ref={scrollRef}
            onContentSizeChange={() => {
              setTimeout(
                () =>
                  rows.length &&
                  scrollRef.current?.scrollToEnd?.({animated: false}),
                200,
              );
            }}
            contentContainerStyle={[getPaddingHorizontal(16), styles.pb20]}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            // renderItem={({item}) => renderConversation(item)}
            renderItem={({item}) => {
              if (item.id === 'special' && showSpecialMessage) {
                return item.content;
              }
              return renderConversation(item);
            }}
          />
          <View
            style={[
              styles.row,
              styles.wrapBot,
              styles.cenItem,
              getPaddingHorizontal(16),
              getPaddingVertical(4),
            ]}>
            <TouchCus onPress={capturePhoto}>
              {Icon.Camera({color: Colors.mainLight})}
            </TouchCus>

            <TouchCus
              onPress={handleSelectImage}
              style={getPaddingHorizontal(12)}>
              {Icon.Gallery({color: Colors.mainLight})}
            </TouchCus>
            {/* <Controller
              control={control}
              name={'identificationFront'}
              rules={{required: false}}
              render={() => (
                <View style={styles.imgItem}>
                  <Buttons
                    style={[styles.bgWhite, styles.boxImg]}
                    onPress={() => selectFile('identificationFront')}>
                    <ImageCus
                      style={[styles.imgItem, styles.h100]}
                      source={showImgSrc(
                        imageList?.identificationFront?.path,
                        // profile[0]?.identification?.front_image,
                      )}
                    />
                  </Buttons>
                </View>
              )}
            /> */}

            <TouchCus onPress={() => {}}>
              {Icon.Attach({color: Colors.mainLight})}
            </TouchCus>
            <TextInputs
              style={styles.inputChat}
              placeholder={'Tin nhắn 77777'}
              value={msg}
              onChangeText={text => setMsg(text)}
              returnKeyType={'send'}
              onKeyPress={e => {
                console.log('keyValue--', e, e.nativeEvent.key === 'Enter');
              }}
              rightIcon={
                <TouchCus onPress={() => onSubmit()}>
                  {Icon.Send({color: Colors.border})}
                </TouchCus>
              }
              success
            />
          </View>
        </View>
      </HomeLayout>
    </>
  );
};

export default Chat;
