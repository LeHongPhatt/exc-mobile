import {
  Keyboard,
  ScrollView,
  View,
  InteractionManager,
  Platform,
} from 'react-native';
import React, {useState, useCallback, useMemo, useRef, Fragment} from 'react';
import {
  Buttons,
  IconCus,
  HomeLayout,
  TextCus,
  TextInputs,
  TouchCus,
  ImageCus,
  CardReview,
  BottomSheetPicker,
  SelecterPicker,
} from 'components';
import styles from './styles';
import {IUserKYC, SELECT_OPTION} from 'types';
import {Controller, useForm} from 'react-hook-form';
import {Colors} from 'theme';
import {
  dimensions,
  getHeight,
  styleSpacing,
  formatDMY,
  yupSchemaInfoUser,
  showImgSrc,
  getNow,
} from 'utils';
import ImagePicker, {Options, Image} from 'react-native-image-crop-picker';
import {useAuth} from 'hooks';
import {API_HOST} from '@env';
import {yupResolver} from '@hookform/resolvers/yup';
import BottomSheet from '@gorhom/bottom-sheet';
import {BottomSheetCommon} from 'components/BottomSheet';

const {width} = dimensions;

const UploadImageConfig: Options = {
  // width: width,
  // height: width,
  cropping: false,
  includeBase64: false,
  multiple: false,
  compressImageMaxHeight: 400,
  compressImageMaxWidth: 400,
};

export default function AccountInfo() {
  const refModal = useRef<BottomSheet>(null);
  const {profile, onUpdateInfoUser, getUserProfile, loading} = useAuth();

  const initValuesForm: IUserKYC = useMemo(
    () => ({
      avatar: profile[0]?.avatar
        ? `${API_HOST}/images?path=${profile[0].avatar}`
        : '',
      fullName: profile[0]?.full_name ?? '',
      phone: profile[0]?.phone_number ?? '',
      email: profile[0]?.email ?? '',
      accountBank: profile[0]?.account_bank ?? '',
      identificationFront: profile[0]?.identification?.front_image
        ? `${API_HOST}/images?path=${profile[0].identification.front_image}`
        : '',
      identificationBack: profile[0]?.identification?.back_image
        ? `${API_HOST}/images?path=${profile[0].identification.back_image}`
        : '',
      licenseFront: profile[0]?.license?.front_image
        ? `${API_HOST}/images?path=${profile[0].license.front_image}`
        : '',
      licenseBack: profile[0]?.license?.back_image
        ? `${API_HOST}/images?path=${profile[0].license.back_image}`
        : '',
      birthday: profile[0]?.birthday ? formatDMY(profile[0]?.birthday) : '',
      address: profile[0]?.address ?? '',
    }),
    [profile],
  );

  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<IUserKYC>({
    mode: 'onSubmit',
    resolver: yupResolver(yupSchemaInfoUser),
    defaultValues: {...initValuesForm},
  });

  const uploadImage = ({mime, filename, path}: Image) => {
    if (filename) {
      filename = `${new Date().getTime()}_${filename}`;
    }
    return {
      filename,
      fileType: mime,
      uri: Platform.OS === 'android' ? path : path.replace('file://', ''),
    };
  };

  const [imageList, setImageList] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false);

  const selectFile = useCallback(
    (value: IUserKYC) => {
      InteractionManager.runAfterInteractions(() => {
        ImagePicker.openPicker({
          ...UploadImageConfig,
          mediaType: 'photo',
        }).then((image: any) => {
          const infoImage = uploadImage(image as Image);
          onUpdateInfoUser({
            formData: value,
            userId: profile[0]?.id,
            identificationFront: image,
            identificationBack: image,
          });

          setValue(value, infoImage);
          setImageList({...imageList, [`${value}`]: image});
        });
      });
    },
    [imageList],
  );

  const onHandleUpdateInfo = useCallback(
    (value: IUserKYC) => {
      onUpdateInfoUser({formData: value, userId: profile[0]?.id}, rs => {
        if (rs) {
          setIsEdit(false);
          getUserProfile();
        }
      });
    },
    [onUpdateInfoUser],
  );

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Thông tin cá nhân
      </TextCus>
    ),
  };

  return (
    <Fragment>
      <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
        <View style={styles.container}>
          <View style={styles.flex1}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styleSpacing('px-16')]}>
              <View style={styles.cenItem}>
                <View style={getHeight(24)} />
                <Controller
                  control={control}
                  name={'avatar'}
                  rules={{required: false}}
                  render={() => (
                    <View style={[styles.wrapAvatar, styles.cenItemvh]}>
                      {imageList?.avatar ? (
                        <ImageCus
                          style={[styles.wrapAvatar]}
                          source={{uri: `${imageList?.avatar.path}`}}
                        />
                      ) : profile[0]?.avatar ? (
                        <ImageCus
                          style={[styles.wrapAvatar]}
                          source={{
                            uri: `${API_HOST}/images?path=${profile[0].avatar}`,
                          }}
                        />
                      ) : (
                        <IconCus
                          name={'camera'}
                          size={18}
                          color={Colors.white}
                        />
                      )}
                      {isEdit && (
                        <TouchCus
                          onPress={() => selectFile('avatar')}
                          style={[
                            styles.posBtnCamera,
                            styles.posAbsolute,
                            styles.wrapBtnCamera,
                            styles.cenItemvh,
                          ]}>
                          <IconCus
                            name={'camera'}
                            size={8}
                            color={Colors.white}
                          />
                        </TouchCus>
                      )}
                    </View>
                  )}
                />
                {profile[0]?.full_name && (
                  <>
                    <View style={getHeight(12)} />
                    <TextCus title4 medium>
                      {profile[0]?.full_name}
                    </TextCus>
                  </>
                )}
                {profile[0]?.rating_point !== null && (
                  <>
                    <View style={getHeight(12)} />
                    <CardReview
                      key={profile[0]?.rating_point}
                      amount={profile[0]?.rating_point}
                      style={[styleSpacing('px-8'), styleSpacing('py-5')]}
                    />
                  </>
                )}
                <View style={getHeight(16)} />
              </View>
              <Controller
                control={control}
                name={'fullName'}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <View style={[styles.rowItem]}>
                      <TextCus>Họ tên </TextCus>
                      <TextCus errorColor>*</TextCus>
                    </View>
                    <TextInputs
                      style={[
                        errors.fullName ? styles.inputError : styles.input,
                        styles.fs16,
                      ]}
                      autoCapitalize="none"
                      placeholder={'Họ tên'}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      color={Colors.colorLine}
                      editable={isEdit}
                      success
                    />
                  </>
                )}
              />
              {errors.fullName && (
                <TextCus
                  style={[styles.fieldTextRequired, styleSpacing('mt-4')]}>
                  {errors.fullName?.message as string}
                </TextCus>
              )}
              <Controller
                control={control}
                name={'phone'}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <View style={styleSpacing('mt-16')}>
                    <View style={[styles.rowItem]}>
                      <TextCus>Số điện thoại </TextCus>
                      <TextCus errorColor>*</TextCus>
                    </View>
                    <TextInputs
                      style={[styles.inputDisabled, styles.fs16]}
                      autoCapitalize="none"
                      placeholder={'Số điện thoại'}
                      onChangeText={onChange}
                      keyboardType="phone-pad"
                      value={value}
                      onBlur={onBlur}
                      color={Colors.colorLine}
                      editable={false}
                      success
                    />
                  </View>
                )}
              />
              {errors.phone && (
                <TextCus style={styles.fieldTextRequired}>
                  {errors.phone?.message as string}
                </TextCus>
              )}
              <Controller
                control={control}
                name={'email'}
                rules={{required: false}}
                render={({field: {onChange, onBlur, value}}) => (
                  <View style={styleSpacing('mt-16')}>
                    <View style={[styles.rowItem]}>
                      <TextCus>Email</TextCus>
                    </View>
                    <TextInputs
                      style={[
                        errors.email ? styles.inputError : styles.input,
                        styles.fs16,
                      ]}
                      autoCapitalize="none"
                      placeholder={'Email'}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      color={Colors.colorLine}
                      editable={isEdit}
                      success
                    />
                  </View>
                )}
              />
              {errors.email && (
                <TextCus
                  style={[styles.fieldTextRequired, styleSpacing('mt-4')]}>
                  {errors.email?.message as string}
                </TextCus>
              )}
              <Controller
                control={control}
                name={'accountBank'}
                rules={{required: false}}
                render={({field: {onChange, onBlur, value}}) => (
                  <View style={styleSpacing('mt-16')}>
                    <View style={[styles.rowItem]}>
                      <TextCus>Tài khoản ngân hàng</TextCus>
                    </View>
                    <TextInputs
                      style={[styles.input, styles.fs16]}
                      autoCapitalize="none"
                      placeholder={'Nhập thông tin ngân hàng'}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      color={Colors.colorLine}
                      editable={isEdit}
                      success
                    />
                  </View>
                )}
              />
              <View style={styleSpacing('mt-16')}>
                <View>
                  <TextCus>CMND/CCCD</TextCus>
                </View>
                <View style={getHeight(8)} />
                <View style={[styles.rowItem, styles.spaceItem]}>
                  <Controller
                    control={control}
                    name={'identificationFront'}
                    rules={{required: false}}
                    render={() => (
                      <View style={styles.imgItem}>
                        <Buttons
                          style={[styles.bgWhite, styles.boxImg]}
                          onPress={() =>
                            isEdit && selectFile('identificationFront')
                          }>
                          <ImageCus
                            style={[styles.imgItem, styles.h100]}
                            source={showImgSrc(
                              imageList?.identificationFront?.path,
                              profile[0]?.identification?.front_image,
                            )}
                          />
                        </Buttons>
                        <TextCus textAlign={'center'}>Mặt trước</TextCus>
                      </View>
                    )}
                  />
                  <Controller
                    control={control}
                    name={'identificationBack'}
                    rules={{required: false}}
                    render={() => (
                      <View style={styles.imgItem}>
                        <Buttons
                          style={[styles.bgWhite, styles.boxImg]}
                          onPress={() =>
                            isEdit && selectFile('identificationBack')
                          }>
                          <ImageCus
                            style={[styles.imgItem, styles.h100]}
                            source={showImgSrc(
                              imageList?.identificationBack?.path,
                              profile[0]?.identification?.back_image,
                            )}
                          />
                        </Buttons>
                        <TextCus textAlign={'center'}>Mặt sau</TextCus>
                      </View>
                    )}
                  />
                </View>
              </View>
              <View style={getHeight(12)} />
              <View>
                <View>
                  <TextCus>Ảnh xe (hoặc giấy phép kinh doanh)</TextCus>
                </View>
                <View style={getHeight(8)} />

                <View style={[styles.rowItem, styles.spaceItem]}>
                  <Controller
                    control={control}
                    name={'licenseFront'}
                    rules={{required: false}}
                    render={() => (
                      <View style={styles.imgItem}>
                        <Buttons
                          style={[styles.bgWhite, styles.boxImg]}
                          onPress={() => isEdit && selectFile('licenseFront')}>
                          <ImageCus
                            style={[styles.imgItem, styles.h100]}
                            source={showImgSrc(
                              imageList?.licenseFront?.path,
                              profile[0]?.license?.front_image,
                            )}
                          />
                        </Buttons>
                        <TextCus textAlign={'center'}>Ảnh 1</TextCus>
                      </View>
                    )}
                  />
                  <Controller
                    control={control}
                    name={'licenseBack'}
                    rules={{required: false}}
                    render={() => (
                      <View style={styles.imgItem}>
                        <Buttons
                          style={[styles.bgWhite, styles.boxImg]}
                          onPress={() => isEdit && selectFile('licenseBack')}>
                          <ImageCus
                            style={[styles.imgItem, styles.h100]}
                            source={showImgSrc(
                              imageList?.licenseBack?.path,
                              profile[0]?.license?.back_image,
                            )}
                          />
                        </Buttons>
                        <TextCus textAlign={'center'}>Ảnh 2</TextCus>
                      </View>
                    )}
                  />
                </View>
              </View>
              <View style={getHeight(16)} />
              <Controller
                control={control}
                name={'birthday'}
                rules={{required: false}}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <View style={[styles.rowItem]}>
                      <TextCus>Sinh nhật</TextCus>
                    </View>
                    <TouchCus
                      onPress={() => isEdit && refModal.current?.show()}>
                      <View pointerEvents="none">
                        <TextInputs
                          style={[styles.input, styles.fs16]}
                          autoCapitalize="none"
                          placeholder={'DD/MM/YYYY'}
                          onChangeText={onChange}
                          value={value}
                          onBlur={onBlur}
                          color={Colors.colorLine}
                          editable={false}
                          success
                        />
                      </View>
                    </TouchCus>
                  </>
                )}
              />
              <Controller
                control={control}
                name={'address'}
                rules={{required: false}}
                render={({field: {onChange, onBlur, value}}) => (
                  <View style={styleSpacing('mt-16')}>
                    <View style={[styles.rowItem]}>
                      <TextCus>Địa chỉ</TextCus>
                    </View>
                    <TextInputs
                      style={[styles.input, styles.fs16]}
                      autoCapitalize="none"
                      placeholder={'Địa chỉ'}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      color={Colors.colorLine}
                      editable={isEdit}
                      success
                    />
                  </View>
                )}
              />
              <View style={getHeight(16)} />
            </ScrollView>
          </View>
          <View
            style={[
              styles.bgWhite,
              styleSpacing('mx-16'),
              styleSpacing('my-8'),
            ]}>
            <TouchCus
              style={[styles.radius4, styles.btnActive, styles.cenItem]}
              disabled={loading}
              onPress={() => {
                Keyboard.dismiss();
                setIsEdit(true);
                isEdit && handleSubmit(onHandleUpdateInfo)();
              }}>
              <TextCus
                whiteColor
                medium
                my-12
                style={[styles.fs16, styles.lh24]}>
                {isEdit ? 'Cập nhật' : 'Chỉnh sửa '}
              </TextCus>
            </TouchCus>
          </View>
        </View>
      </HomeLayout>
      <BottomSheetCommon ref={refModal}>
        <SelecterPicker
          selectOptionTitle={'Sinh nhật'}
          selectType={SELECT_OPTION.DATE_PICKER}
          maxDate={getNow()}
          onCancelSelect={() => refModal.current?.close()}
          onConfirmSelect={date => {
            setValue('birthday', formatDMY(date));
            InteractionManager.runAfterInteractions(() => {
              refModal.current?.close();
            });
          }}
        />
      </BottomSheetCommon>
    </Fragment>
  );
}
