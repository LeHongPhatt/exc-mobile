import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HomeLayout, TextCus, IconCus} from 'components';
import styles from './styles';
import {Colors} from 'theme';
import {styleSpacing} from 'utils';
import {useAccount} from 'hooks';
import {EUtilType} from 'types';

const Policy = () => {
  const [policy, setPolicy] = useState<string>('');
  const {onGetUtils} = useAccount();

  useEffect(() => {
    onGetUtils(
      {type: EUtilType.P},
      rs => Array.isArray(rs?.data?.result) && setPolicy(rs?.data?.result[0]),
    );
  }, [onGetUtils]);

  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Chính sách bảo mật
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
          <TextCus style={styles.justifyTxt}>{policy}</TextCus>
        </ScrollView>
      </View>
    </HomeLayout>
  );
};

export default Policy;
