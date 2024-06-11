import {View} from 'react-native';
import React from 'react';
import {ImageCus, MainLayout, TextCus} from 'components';
import styles from './styles';
import {Images} from 'assets';

export default function Register() {
  return (
    <MainLayout>
      <View style={styles.wrapLogo}>
        <ImageCus source={Images.logo} style={styles.boxLogo} />
      </View>
      <TextCus semibold body1>
        Register
      </TextCus>
    </MainLayout>
  );
}
