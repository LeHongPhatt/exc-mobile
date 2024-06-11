import {FlatList, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {
  HomeLayout,
  IconCus,
  ImageCus,
  TextCus,
  TouchCus,
  CardReview,
  BottomSheetModals,
} from 'components';
import {getHeight, showImgSrc, styleSpacing} from 'utils';
import {Divider} from 'react-native-paper';
import Icon from 'assets/svg/Icon';
import {Images} from 'assets';
import {Colors} from 'theme';
import {NavigationService} from 'navigation';
import {EAction} from 'types';
import {useDriver, useAuth} from 'hooks';

const MemberList = () => {
  const {params}: any = NavigationService.route() || '';
  const [action, setAction] = useState('');
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [memberSelected, setMemberSelected] = useState();
  const {onGetMembers, onRemoveMember} = useDriver();
  const {user} = useAuth();

  useEffect(() => {
    onGetList();
  }, []);

  const onGetList = () => {
    onGetMembers({driverGroupId: params?.driver_group_id}, rs => {
      const data = rs?.data?.result;
      Array.isArray(data) && setRows(data);
    });
  };

  const onDeleteMember = () => {
    onRemoveMember(
      {
        driverGroupId: params?.driver_group_id,
        userId: memberSelected?.id,
      },
      rs => {
        const data = rs?.data?.result;
        Array.isArray(data) && onGetList();
      },
    );
  };

  const renderMemberItem = (item: any) => (
    <View>
      <View
        style={[
          styles.row,
          styles.cenItem,
          styleSpacing('px-16'),
          styleSpacing('py-8'),
        ]}>
        <View style={[styles.flex1, styles.row, styles.cenItem]}>
          <ImageCus
            source={showImgSrc('', item?.avatar, Images.driver)}
            style={[styles.wrapImg]}
          />
          <View style={[styles.alignStart, styleSpacing('ml-6')]}>
            <TextCus>{item?.full_name}</TextCus>
            <CardReview
              key={item?.id}
              amount={item?.rating_point}
              style={[styleSpacing('px-8'), styleSpacing('py-4')]}
            />
          </View>
        </View>
        {user?.phone_number !== item?.phone_number &&
          user?.sub === params?.owner_id && (
            <TouchCus
              onPress={() => {
                setShowModal(true);
                setMemberSelected(item);
              }}>
              <View
                style={[
                  styles.wrapIcon,
                  styles.cenItemvh,
                  styleSpacing('ml-8'),
                ]}>
                <Icon.Delete />
              </View>
            </TouchCus>
          )}
      </View>
      <Divider style={[getHeight(1), {backgroundColor: Colors.whisper}]} />
    </View>
  );

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Thành viên
      </TextCus>
    ),
    renderRight: () => (
      <View style={[styles.row, styles.cenItemvh]}>
        <TouchCus onPress={() => setAction(EAction.SEARCH)}>
          <Icon.Search />
        </TouchCus>
      </View>
    ),
  };

  const optAction = {action, setAction};
  return (
    <>
      <HomeLayout
        statusBarMode={'dark-content'}
        bgColor={Colors.main}
        header={{...headerProps}}
        {...optAction}>
        <View style={styles.container}>
          <FlatList
            data={rows}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => renderMemberItem(item)}
          />
        </View>
      </HomeLayout>
      {showModal && (
        <BottomSheetModals
          type={'failure'}
          onOk={() => {}}
          onClose={() => {
            setShowModal(false);
            onDeleteMember();
          }}
          titleBtn="Xóa"
          title="Xóa thành viên"
          subtitle={`Bạn muốn xóa ${memberSelected?.full_name} ra khỏi nhóm?`}
        />
      )}
    </>
  );
};

export default MemberList;
