import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {ImageCus, TextCus, TouchCus} from 'components';
import {getHeight, getPaddingVertical} from 'utils';
import Icon from 'assets/svg/Icon';
import {Images} from 'assets';

const Contact = () => {
  return (
    <View style={styles.wrap}>
      <View style={getHeight(24)} />
      <View style={[styles.container, styles.pH16, getPaddingVertical(8)]}>
        <View style={[styles.row, styles.cenItem]}>
          <ImageCus source={Images.logo} style={styles.boxLogo} />
          <TouchCus onPress={() => {}}>
            <TextCus whiteColor body1 semibold>
              {' '}
              Trung tâm hỗ trợ tài xế
            </TextCus>
          </TouchCus>
        </View>
        <View style={getHeight(10)} />
        <View style={[styles.row, styles.cenItem]}>
          <Icon.Phone />
          <TouchCus onPress={() => {}}>
            <TextCus whiteColor body2>
              {' '}
              Hotline: 0379 668 789
            </TextCus>
          </TouchCus>
        </View>
        <View style={getHeight(10)} />
        <View style={[styles.row, styles.cenItem]}>
          <Icon.Mail />
          <TextCus whiteColor body2>
            {' '}
            Gửi yêu cầu khẩn cấp
          </TextCus>
        </View>
      </View>
    </View>
  );
};
export default Contact;
