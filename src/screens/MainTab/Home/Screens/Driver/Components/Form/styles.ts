import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {width} from 'utils';

export default StyleSheet.create({
  wrap: {
    backgroundColor: Colors.white,
  },
  container: {
    backgroundColor: Colors.mainLight,
  },
  wrapContent: {
    width: width - 32,
  },

  input: {
    height: 56,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 16,
    maxWidth: width * 0.6,
    borderColor: Colors.borderBottom,
    color: Colors.borderBottom,
    backgroundColor: Colors.white,
    textAlign: 'right',
  },
  pH16: {
    paddingHorizontal: 16,
  },
  p8: {
    padding: 8,
  },
  pv16: {
    paddingVertical: 16,
  },
  pv8: {
    paddingVertical: 8,
  },
  boxLogo: {width: 24, height: 24},
  pl16: {
    paddingLeft: 16,
  },
  pb6: {paddingBottom: 6},
  mr16: {
    marginRight: 16,
  },
  wrapBlockAdv: {
    borderRadius: 12,
    backgroundColor: Colors.bgBlocAdv,
  },
  wrapInnerBlockAdv: {
    borderRadius: 8,
    backgroundColor: Colors.bgCard,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  wrapImg: {
    width: width * 0.75,
    height: width * 0.4,
    borderRadius: 21,
  },
  btnAdv: {
    backgroundColor: Colors.main,
    borderRadius: 20,
    height: 30,
  },
  btnSubmit: {
    backgroundColor: Colors.mainLight,
    borderRadius: 5,
    height: 33,
    minWidth: 98,
  },
  btnDisabled: {
    backgroundColor: Colors.border,
    borderRadius: 5,
    height: 33,
    minWidth: 98,
  },
  radius7: {
    borderRadius: 8,
    shadowColor: Colors.white,
  },
  wrapBlock: {
    backgroundColor: Colors.white,
    width: width * 0.75,
    shadowOffset: {width: 3, height: 5},
    shadowOpacity: 0.1,
    shadowColor: Colors.dark,
    elevation: 5,
  },
  radius4: {borderRadius: 4},
  p12: {padding: 12},
  mr8: {marginRight: 8},
  row: {flexDirection: 'row'},
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
  wp25: {
    maxWidth: '25%',
  },
  flex1: {flex: 1},
  alignEnd: {alignItems: 'flex-end'},
  fieldTextRequired: {
    color: Colors.error,
    textAlign: 'left',
    marginBottom: 10,
  },
});
