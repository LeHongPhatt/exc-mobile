import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  wrap: {
    backgroundColor: Colors.white,
  },
  row: {flexDirection: 'row'},
  cenItem: {
    alignItems: 'center',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  flex1: {flex: 1},
  input: {
    height: 56,
    borderRadius: 5,
    marginTop: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray82,
    color: Colors.gray82,
    backgroundColor: Colors.white,
  },
  btnDisable: {
    backgroundColor: Colors.border,
    height: 44,
    flex: 1,
    borderRadius: 4,
  },
  btnActive: {
    backgroundColor: Colors.mainLight,
    height: 44,
    flex: 1,
    borderRadius: 4,
  },
  fs16: {fontSize: 16},
  lh24: {lineHeight: 24},
  fs24: {fontSize: 24},
  lh34: {lineHeight: 34},
  radius4: {borderRadius: 4},
  borderMainLight: {borderWidth: 1, borderColor: Colors.mainLight},
});
