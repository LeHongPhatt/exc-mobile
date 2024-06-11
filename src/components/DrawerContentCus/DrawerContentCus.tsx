import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
} from '@react-navigation/native';
import SvgIconNew from 'assets/IconSVG';
import LogoSvg from 'assets/svg/logo_realty.svg';
import {TextCus} from 'components/TextCus';
import {TouchCus} from 'components/TouchCus';
import {useAuth, useCompany} from 'hooks';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'theme';
import {height, heightHeader, openLink} from 'utils/libs';

export function CustomDrawerContent(props: any) {
  const {onGetCurrentCompany, company} = useCompany();
  const {user, access_token} = useAuth();
  const {t} = useTranslation();
  const buildLink = useLinkBuilder();

  const {state, descriptors, navigation} = props;

  useEffect(() => {
    onGetCurrentCompany();
  }, [access_token]);

  return (
    <DrawerContentScrollView {...props} style={[styles.overlay]}>
      <View style={[styles.flex1, styles.information, styles.p16]}>
        <View style={[styles.rowItem, styles.centerHItem, styles.spaceItem]}>
          <LogoSvg />
          <TouchCus
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <SvgIconNew.Close />
          </TouchCus>
        </View>
        <View style={[styles.pt8]}>
          <TextCus
            style={[
              styles.textWhite,
              styles.fs16,
              styles.fontRoboto,
              styles.lh22,
              styles.letterMinus21,
              styles.fw400,
            ]}>
            {t('text.hello')}
          </TextCus>
        </View>
        <View>
          <TextCus
            style={[
              styles.textWhite,
              styles.fs16,
              styles.fontRoboto,
              styles.lh25,
              styles.letterMinus21,
              styles.fw700,
            ]}>
            {user?.name?.toUpperCase()}
          </TextCus>
        </View>
      </View>
      <View style={[styles.p6]}>
        {state.routes.map((route: any, i: number) => {
          const isHidden = descriptors[route.key].options?.hidden;
          if (isHidden === true) {
            return null;
          }
          const focused = i === state.index;
          const {
            title,
            drawerLabel,
            drawerIcon,
            drawerActiveTintColor,
            drawerInactiveTintColor,
            drawerActiveBackgroundColor,
            drawerInactiveBackgroundColor,
            drawerLabelStyle,
            drawerItemStyle,
          } = descriptors[route.key].options;

          return (
            <DrawerItem
              key={route.key}
              label={() => (
                <TextCus
                  style={[
                    styles.textDark,
                    styles.fs16,
                    styles.fontRoboto,
                    styles.lh22,
                    styles.letterMinus21,
                    styles.fw400,
                  ]}>
                  {drawerLabel !== undefined
                    ? drawerLabel
                    : title !== undefined
                    ? title
                    : t(route?.name)}
                </TextCus>
              )}
              icon={drawerIcon}
              focused={focused}
              activeTintColor={drawerActiveTintColor}
              inactiveTintColor={drawerInactiveTintColor}
              activeBackgroundColor={drawerActiveBackgroundColor}
              inactiveBackgroundColor={drawerInactiveBackgroundColor}
              labelStyle={drawerLabelStyle}
              style={drawerItemStyle}
              to={buildLink(route.name, route.params)}
              onPress={() => {
                navigation.dispatch({
                  ...(focused
                    ? DrawerActions.closeDrawer()
                    : CommonActions.navigate(route.name)),
                  target: state.key,
                });
              }}
            />
          );
        })}
      </View>
      <View style={[styles.ph24, styles.pv18, styles.flex1, styles.hText]}>
        <TouchCus
          onPress={() => openLink('telephone', `${company?.telephone}`)}
          style={[styles.rowItem]}>
          <TextCus
            style={[
              styles.textDark,
              styles.fs16,
              styles.fontRoboto,
              styles.lh22,
              styles.letterMinus21,
              styles.fw400,
            ]}>
            {t('contact_us')}
          </TextCus>
        </TouchCus>
      </View>
      <View style={styles.ph24}>
        <TextCus
          style={[
            styles.textDark,
            styles.fs14,
            styles.fontRoboto,
            styles.lh20,
            styles.fw500,
          ]}>
          {company?.companyName?.toUpperCase()}
        </TextCus>
        <TextCus
          style={[
            styles.textDark,
            styles.fs14,
            styles.fontRoboto,
            styles.lh20,
            styles.fw500,
          ]}>
          {company?.address}
        </TextCus>
        <TextCus
          style={[
            styles.textDark,
            styles.fs14,
            styles.fontRoboto,
            styles.lh20,
            styles.fw500,
          ]}>
          {company?.telephone}
        </TextCus>
        <TextCus
          style={[
            styles.textDark,
            styles.fs14,
            styles.fontRoboto,
            styles.lh20,
            styles.fw500,
          ]}>
          {company?.website}
        </TextCus>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height,
  },
  flex1: {
    flex: 1,
  },
  information: {
    backgroundColor: Colors.colorDA,
    paddingTop: 16 + heightHeader(),
    marginTop: -heightHeader(),
  },
  rowItem: {
    flexDirection: 'row',
  },
  avatar: {width: 60, height: 60},
  textWhite: {
    color: Colors.white,
  },
  textDark: {
    color: Colors.dark,
  },
  centerHItem: {
    alignItems: 'center',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  fs16: {
    fontSize: 16,
  },
  fs14: {
    fontSize: 14,
  },
  pt8: {
    paddingTop: 8,
  },
  ph24: {
    paddingHorizontal: 24,
  },
  pv18: {
    paddingVertical: 18,
  },
  p16: {
    padding: 16,
  },
  p6: {
    padding: 6,
  },
  fontRoboto: {
    fontFamily: 'Roboto',
  },
  fw700: {
    fontWeight: '700',
  },
  fw600: {
    fontWeight: '600',
  },
  fw500: {
    fontWeight: '500',
  },
  fw400: {
    fontWeight: '400',
  },
  lh20: {
    lineHeight: 20,
  },
  lh22: {
    lineHeight: 22,
  },
  lh25: {
    lineHeight: 25,
  },
  letterMinus21: {
    letterSpacing: -0.21,
  },
  hText: {
    height: height - 400,
  },
});
