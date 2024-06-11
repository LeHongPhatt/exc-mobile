import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {HomeLayout, TextCus, TouchCus} from 'components';
import styles from './styles';
import {AccountManagement, CardItem} from './Components';
import {ACCOUNT_MANAGEMENT, getHeight, styleSpacing} from 'utils';
import {Divider} from 'react-native-paper';
import Icon from 'assets/svg/Icon';
import {useAuth} from 'hooks';

const Account = () => {
  const {onLogout, profile} = useAuth();
  const [me, setMe] = useState();

  useEffect(() => {
    profile && setMe(profile[0]);
  }, [profile]);

  const headerProps = {
    notGoBack: true,
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Tài khoản
      </TextCus>
    ),
  };

  return (
    <HomeLayout
      statusBarMode={'dark-content'}
      safeAreaEdges={['left', 'top', 'right']}
      header={{...headerProps}}>
      <View style={styles.container}>
        <ScrollView>
          <AccountManagement user={me} />
          <CardItem data={ACCOUNT_MANAGEMENT} isRequire={false} />
          <Divider style={[getHeight(1), styles.divider]} />
          <TouchCus onPress={() => onLogout()}>
            <View
              style={[
                styles.row,
                styles.cenItem,
                styleSpacing('px-16'),
                styleSpacing('py-12'),
              ]}>
              {Icon.LogoutFill({})}
              <TextCus medium body2 ml-12>
                Đăng xuất
              </TextCus>
            </View>
          </TouchCus>
        </ScrollView>
      </View>
    </HomeLayout>
  );
};

export default Account;
