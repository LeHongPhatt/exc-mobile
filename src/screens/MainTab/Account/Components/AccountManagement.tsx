import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {ImageCus, TextCus, CardReview} from 'components';
import {Images} from 'assets';
import {getHeight, showImgSrc, styleSpacing} from 'utils';

const AccountManagement = ({user}: any) => {
  return (
    <View style={styles.cenItem}>
      <View style={getHeight(24)} />
      <ImageCus
        source={showImgSrc('', user?.avatar, Images.driver)}
        style={styles.wrapImg}
      />
      <View style={getHeight(12)} />
      <TextCus title4 medium>
        {user?.full_name}
      </TextCus>
      {user?.rating_point !== null && (
        <>
          <View style={getHeight(12)} />
          <CardReview
            key={user?.rating_point}
            amount={user?.rating_point}
            style={[styleSpacing('px-8'), styleSpacing('py-5')]}
          />
          <View style={getHeight(16)} />
        </>
      )}
    </View>
  );
};

export default AccountManagement;
