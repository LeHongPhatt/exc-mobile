import {View, ScrollView, Keyboard} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  HomeLayout,
  TextCus,
  IconCus,
  Buttons,
  BottomSheetModals,
  ImageCus,
  TouchCus,
} from 'components';
import styles from './styles';
import {Colors} from 'theme';
import {
  NOTICE_2,
  COPY_CONTENT,
  NOTICE_1,
  banks,
  getHeight,
  styleSpacing,
} from 'utils';
import {Divider} from 'react-native-paper';
import {NavigationService, Routes} from 'navigation';
import {useAccount, useNotify} from 'hooks';
import {IBank} from 'types';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'assets/svg/Icon';

const Policy = () => {
  const {params} = NavigationService.route() || '';
  const {onUserRequest, loading} = useAccount();
  const {success} = useNotify();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pickingBank, setPickingBank] = useState<IBank>(banks[0]);

  const copyToClipboard = useCallback(text => {
    Clipboard.setString(text);
    success('Thông báo', 'Sao chép thành công');
  }, []);

  const onRequestRecharge = () => {
    onUserRequest({content: params?.content, type: params?.type}, rs => {
      Keyboard.dismiss();
      rs ? setShowModal(true) : setShowModal(true);
    });
  };

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Thông tin chuyển khoản
      </TextCus>
    ),
  };

  const renderItem = useCallback(
    (item, index) => {
      return (
        <TouchCus
          activeOpacity={0.8}
          onPress={() => setPickingBank(item)}
          style={[
            styles.contentBank,
            pickingBank?.id === item?.id && {
              borderColor: Colors.mainLight,
            },
          ]}
          key={index}>
          <ImageCus
            source={item.image}
            style={styles.image}
            resizeMode={'contain'}
          />
          {pickingBank?.id === item?.id ? (
            <View style={[styles.check]}>
              <IconCus name={'check'} size={8} color={Colors.white} />
            </View>
          ) : null}
        </TouchCus>
      );
    },
    [pickingBank],
  );

  return (
    <>
      <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
        <View style={[styles.container]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styleSpacing('p-16')}>
              <TextCus semibold>Quá trình nạp xu đã gần hoàn tất</TextCus>
              <TextCus caption1 mt-5 style={styles.lh20}>
                {COPY_CONTENT}
              </TextCus>
            </View>
            <Divider style={[styles.dividerBg, getHeight(8)]} />
            <View style={styleSpacing('p-16')}>
              <TextCus semibold style={[styles.fs16, styles.lh24]}>
                THÔNG TIN CHUYỂN KHOẢN
              </TextCus>
              <View style={styles.wrapperBank}>{banks?.map(renderItem)}</View>
              <TextCus semibold caption1 mb-8>
                {pickingBank?.shortName}
              </TextCus>
              <TextCus semibold caption1 mb-8>
                {pickingBank?.name}
              </TextCus>
              <TextCus caption1 my-8>
                {'Tên tài khoản: '}
                <TextCus semibold>{pickingBank?.accountName}</TextCus>
              </TextCus>
              <View style={[styles.row, styles.cenItem]}>
                <TextCus my-4 mr-8 style={[styles.flex1, styles.shrinkTxt]}>
                  {'Số tài khoản: '}
                  <TextCus caption1 semibold>
                    {pickingBank?.accountNumber}
                  </TextCus>
                </TextCus>
                <TouchCus
                  onPress={() => copyToClipboard(pickingBank?.accountNumber)}>
                  <Icon.Copy />
                </TouchCus>
              </View>
              <TextCus caption1 mt-8>
                {'Chi nhánh: '}
                <TextCus caption1 semibold>
                  {pickingBank?.branch}
                </TextCus>
              </TextCus>
            </View>
            <Divider style={[styles.dividerBg, getHeight(8)]} />
            <View style={styleSpacing('p-16')}>
              <TextCus semibold>
                Vui lòng chuyển khoản theo đúng nội dung
              </TextCus>
              <View style={[styles.contentCopy, styles.row, styles.cenItem]}>
                <TextCus style={[styles.flex1, styles.shrinkTxt]}>
                  <TextCus useI18n>Nội dung chuyển khoản: </TextCus>
                  <TextCus mainLightColor semibold>
                    NAPEXCXU 0932361612
                  </TextCus>
                </TextCus>
                <TouchCus
                  onPress={() => copyToClipboard('NAPEXCXU 0932361612')}>
                  <Icon.Copy />
                </TouchCus>
              </View>
              <View style={[styles.row, styles.cenItem, styleSpacing('mt-12')]}>
                <Icon.Warning2 />
                <TextCus semibold ml-8>
                  Chú ý
                </TextCus>
              </View>
              <View style={[styles.row, styleSpacing('mt-8')]}>
                <TextCus caption1 mr-8 style={[styles.lh20]}>
                  •
                </TextCus>
                <TextCus
                  caption1
                  style={[styles.lh20, styles.justifyTxt, styles.shrinkTxt]}>
                  {NOTICE_1}
                </TextCus>
              </View>
              <View style={[styles.row, styleSpacing('mt-8')]}>
                <TextCus caption1 mr-8 style={[styles.lh20]}>
                  •
                </TextCus>
                <TextCus
                  caption1
                  style={[styles.lh20, styles.justifyTxt, styles.shrinkTxt]}>
                  {NOTICE_2}
                </TextCus>
              </View>
              <View style={getHeight(16)} />
              <View style={[styles.row, styles.cenItem]}>
                <View style={styles.flex1}>
                  <TextCus style={styles.lh24}>
                    {'Hỗ trợ: '}
                    <TextCus semibold mainLightColor style={styles.lh24}>
                      +84 909 123456
                    </TextCus>
                  </TextCus>
                  <TextCus style={styles.lh24}>
                    {'Hỗ trợ: '}
                    <TextCus semibold mainLightColor style={styles.lh24}>
                      info@exc-go.com
                    </TextCus>
                  </TextCus>
                </View>
                <TouchCus
                  onPress={() => NavigationService.navigate(Routes.Contact)}
                  style={[styles.contact, styles.cenItemvh]}>
                  <TextCus mainLightColor semibold overline>
                    Liên hệ
                  </TextCus>
                </TouchCus>
              </View>
            </View>
          </ScrollView>
          <View
            style={[styles.row, styleSpacing('my-8'), styleSpacing('mx-16')]}>
            <Buttons
              style={styles.btnActive}
              onPress={onRequestRecharge}
              disabled={loading}>
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
          onOk={() => setShowModal(false)}
          onClose={() => {
            setShowModal(false);
            NavigationService.reset(Routes.HomeTabs);
          }}
          titleBtn="Xác nhận"
          title="Gửi yêu cầu nạp EXC-xu thành công"
          subtitle={`Tài khoản của bạn sẽ được nạp ${params?.coin} khi EXC nhận được thanh toán`}
        />
      )}
    </>
  );
};

export default Policy;
