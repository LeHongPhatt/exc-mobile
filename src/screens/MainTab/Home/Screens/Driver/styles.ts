import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {width} from 'utils';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  bgBloc: {
    backgroundColor: Colors.bgBlocAdv,
  },
  pH16: {
    paddingHorizontal: 16,
  },
  pH8: {
    paddingHorizontal: 8,
  },
  mr10: {
    marginRight: 15,
  },
  mt12: {
    marginTop: 12,
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  input: {
    width: width - 70,
    marginRight: 17,
    height: 34,
    borderRadius: 16,
    backgroundColor: Colors.bgBlocAdv,
  },
  textBorder: {
    color: Colors.border,
  },
  wrapGrpBottom: {
    position: 'absolute',
    right: 14,
    bottom: 40,
  },
  wrapGrpTop: {
    position: 'absolute',
    right: 14,
    top: 55,
    zIndex: 99,
  },
  wrapImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  borderWallet: {
    borderWidth: 1,
    borderColor: Colors.mainLight,
    paddingVertical: 15,
  },
  boxSwipe: {
    height: '100%',
    aspectRatio: 1,
  },
  bgDel: {
    backgroundColor: Colors.error,
  },
  bgBellOff: {
    backgroundColor: Colors.mainLight,
  },
  bgPin: {
    backgroundColor: Colors.main,
  },
  wrapAction: {
    backgroundColor: Colors.main,
    paddingVertical: 5,
    minHeight: 80,
  },
  radius4: {borderRadius: 4},
  radius8: {borderRadius: 8},
  radius30: {borderRadius: 30},
  wrapShadow: {
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 0.3,
    shadowColor: Colors.dark,
    elevation: 5,
  },
  p12: {padding: 12},
  mr8: {marginRight: 8},
  row: {flexDirection: 'row'},
  wrapSwipe: {paddingLeft: width * 0.6},
  cenItem: {
    alignItems: 'center',
  },
  endItem: {
    justifyContent: 'flex-end',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxDriver: {
    width: 35,
    height: 35,
    borderRadius: 17,
  },
  boxLogo: {
    width: 65,
    height: 65,
  },
  pr18: {
    paddingRight: 18,
  },
  ml13: {
    marginLeft: 13,
  },
  ml6: {
    marginLeft: 6,
  },
  btnMain: {
    backgroundColor: Colors.mainLight,
    height: 28,
    width: 85,
    borderRadius: 4,
    right: -22,
  },
  wrapAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  mt4: {
    marginTop: 4,
  },
  mt14: {
    marginTop: 14,
  },
  wrapIcon: {
    width: 24,
    height: 24,
    backgroundColor: Colors.bgBlocAdv,
    borderRadius: 12,
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  flex: {flex: 1},
  wrapOption: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.whisper,
  },
  pb20: {paddingBottom: 20},
  btnCancel: {
    backgroundColor: Colors.border,
    height: 44,
    flex: 1,
    borderRadius: 4,
  },
  btnEdit: {
    backgroundColor: Colors.mainLight,
    height: 44,
    flex: 1,
    borderRadius: 4,
  },
  fs16: {fontSize: 16},
  radius12: {borderRadius: 12},
  radius37: {borderRadius: 37},
  alignEnd: {alignItems: 'flex-end'},
  rightEnd: {right: -22},
  divider: {height: 20, zIndex: -1},
});
