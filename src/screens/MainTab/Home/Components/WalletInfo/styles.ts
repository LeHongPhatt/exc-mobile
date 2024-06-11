import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  borderWallet: {
    borderWidth: 1,
    borderColor: Colors.mainLight,
    paddingVertical: 15,
  },
  wrapAction: {
    backgroundColor: Colors.main,
    paddingVertical: 5,
    minHeight: 80,
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
});
