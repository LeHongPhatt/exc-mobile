import {View} from 'react-native';
import React from 'react';
import {HomeLayout, TextCus, IconCus, TouchCus} from 'components';
import styles from './styles';
import {Colors} from 'theme';
import {CONTACTS, styleSpacing, getHeight} from 'utils';
import Icon from 'assets/svg/Icon';
import {Divider} from 'react-native-paper';

const Contact = () => {
  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Liên hệ hỗ trợ
      </TextCus>
    ),
  };

  return (
    <HomeLayout statusBarMode={'dark-content'} header={{...headerProps}}>
      <View
        style={[
          styles.container,
          styleSpacing('px-16'),
          styleSpacing('py-16'),
        ]}>
        {CONTACTS.map(e => (
          <View key={e.id}>
            <TouchCus onPress={() => e.onPress?.()}>
              <View style={[styles.row, styles.cenItem, styleSpacing('py-8')]}>
                {e.icon}
                <TextCus
                  ml-16
                  style={[styles.shrinkTxt, styles.justifyTxt, styles.flex1]}>
                  {e.title}
                </TextCus>
                {e.isNavigate &&
                  Icon.ChevronRight({
                    color: Colors.border,
                    width: 24,
                    height: 24,
                  })}
              </View>
            </TouchCus>
            <Divider
              style={[styles.divider, getHeight(1), styleSpacing('ml-40')]}
            />
          </View>
        ))}
      </View>
    </HomeLayout>
  );
};

export default Contact;
