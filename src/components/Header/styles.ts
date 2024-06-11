import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {Typography} from 'theme/typography';

export default StyleSheet.create({
  contain: {
    height: 45,
    backgroundColor: Colors.main,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex1: {flex: 1},
  headLine: {
    ...Typography.title2,
  },
  txtWhiteUp: {
    color: Colors.white,
    textTransform: 'uppercase',
  },
  txtDark: {
    color: Colors.dark,
  },
  txtWhite: {
    color: Colors.white,
    ...Typography.title1,
  },
  contentLeft: {
    marginLeft: 17,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  centVHItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSearchCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginLeft: 25,
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 20,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    justifyContent: 'center',
  },
  textSearch: {
    backgroundColor: Colors.white,
    color: Colors.textBlack,
    borderRadius: 100,
    height: 34,
  },
  iconLeft: {
    // justifyContent: 'flex-start',
  },
  viewSearch: {},
  boxLogo: {
    width: 107,
    height: 40,
  },
  viewLogo: {
    position: 'absolute',
  },
  avatarLeft: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },

  viewInfo: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 30,
  },
  imgItem: {
    width: 42,
    borderRadius: 50,
    marginLeft: 10,
    height: 42,
    alignSelf: 'center',
  },

  infoMiddleView: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  infoProvince: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.white,
    ...Typography.body1,
  },
  infoCount: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.white,
    ...Typography.overline,
  },
  absoluteCenter: {
    position: 'absolute',
    left: 60,
    right: 60,
  },
});
