import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HomeLayout, TextCus, IconCus} from 'components';
import styles from './styles';
import {Colors} from 'theme';
import {styleSpacing} from 'utils';
import {useAccount} from 'hooks';
import {EUtilType} from 'types';

const Term = () => {
  const [termsOfUse, setTermsOfUse] = useState<string>('');
  console.log('======termsOfUse========', termsOfUse);
  const {onGetUtils} = useAccount();
  console.log('======onGetUtils========', onGetUtils);

  useEffect(() => {
    onGetUtils(
      {type: EUtilType.T},
      rs =>
        Array.isArray(rs?.data?.result) && setTermsOfUse(rs?.data?.result[0]),
    );
  }, [onGetUtils]);

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Điều khoản sử dụng
      </TextCus>
    ),
  };

  return (
    <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
      <View style={[styles.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styleSpacing('px-16'),
            styleSpacing('py-16'),
          ]}>
          <TextCus style={styles.justifyTxt}>{termsOfUse}</TextCus>
        </ScrollView>
      </View>
    </HomeLayout>
  );
};

export default Term;
