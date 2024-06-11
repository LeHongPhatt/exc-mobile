import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HomeLayout, ImageCus, TextCus, TouchCus} from 'components';
import {Colors} from 'theme';
import styles from './styles';
import {Contact, GroupDriver, SponsoredBy, WalletInfo} from './Components';
import Icon from 'assets/svg/Icon';
import {Images} from 'assets';
import {getPaddingHorizontal, showImgSrc} from 'utils';
import {useAuth, useDriver, useNews} from 'hooks';
import {EAction} from 'types';
import {NavigationService, Routes} from 'navigation';
import {useNotification} from 'hooks';

const Home = () => {
  const {user, profile, getUserProfile} = useAuth();
  const {onDrivers} = useDriver();
  const {onGetNews} = useNews();
  const [me, setMe] = useState();
  const [action, setAction] = useState('');

  const [notiCount, setNotiCount] = useState();
  const {onGetNumberNotification} = useNotification();

  useEffect(() => {
    onGetNumberNotification({}, rs => {
      Array.isArray(rs?.data?.result) && setNotiCount(rs?.data?.result[0]);
    });
  }, []);
  useEffect(() => {
    if (user) {
      onDrivers({});
      onGetNews({});
      getUserProfile();
    }
  }, [JSON.stringify(user)]);

  useEffect(() => {
    if (profile) {
      setMe(profile[0]);
      setAction(EAction.PROFILE);
    }
  }, [profile]);

  const optAction = {action, setAction};

  return (
    <View
      style={{flex: 1}}
      // style={{flex: 1}}
      // bgColor={Colors.white}
      // statusBarMode={'dark-content'}
      // safeAreaEdges={['left', 'top', 'right']}
      // header={{
      //   notGoBack: true,
      //   style: styles.bgHead,
      //   renderLeft: () => (
      //     <ImageCus
      //       source={showImgSrc('', me?.avatar, Images.driver)}
      //       style={styles.boxDriver}
      //     />
      //   ),
      //   renderCenter: () => (
      //     <ImageCus source={Images.logo} style={styles.boxLogo} />
      //   ),
      //   renderRight: () => {
      //     return (
      //       <View style={styles.row}>
      //         {/* <TouchCus onPress={() => {}} style={[styles.row, styles.endItemvh]}>
      //           <Icon.ChatIcon />
      //         </TouchCus> */}
      //         <TouchCus
      //           onPress={() => NavigationService.navigate(Routes.Notification)}
      //           style={[styles.row, styles.endItemvh]}>
      //           <Icon.Bell />
      //           <View
      //             style={[
      //               styles.badget,
      //               styles.cenItemvh,
      //               getPaddingHorizontal(8),
      //             ]}>
      //             <TextCus caption2 black semibold>
      //               {notiCount?.count}
      //             </TextCus>
      //           </View>
      //         </TouchCus>
      //       </View>
      //     );
      //   },
      // }}
      // {...optAction}>
    >
      <View style={styles.header}>
        <ImageCus
          source={showImgSrc('', me?.avatar, Images.driver)}
          style={styles.boxDriver}
        />
        <ImageCus source={Images.logo} style={styles.boxLogo} />
        <View style={styles.row}>
          <TouchCus
            onPress={() => NavigationService.navigate(Routes.Notification)}
            style={[styles.row, styles.endItemvh]}>
            <Icon.Bell />
            <View
              style={[
                styles.badget,
                styles.cenItemvh,
                getPaddingHorizontal(8),
              ]}>
              <TextCus whiteColor caption2 black semibold>
                {notiCount?.count}
              </TextCus>
            </View>
          </TouchCus>
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <WalletInfo />
          <GroupDriver />
          <SponsoredBy />
          <Contact />
        </View>
      </ScrollView>
    </View>
  );
};
export default Home;
