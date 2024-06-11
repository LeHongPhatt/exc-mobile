import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  row: {flexDirection: 'row'},
  cenItem: {
    alignItems: 'center',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {flex: 1},
  wrapImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  wrapIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.colorRed,
  },
});
