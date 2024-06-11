import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  row: {flexDirection: 'row'},
  cenItem: {
    alignItems: 'center',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  flex1: {flex: 1},
  divider: {backgroundColor: Colors.whisper},
  radius4: {borderRadius: 4},
  borderMainLight: {borderWidth: 1, borderColor: Colors.mainLight},
  fs24: {fontSize: 24},
  lh34: {lineHeight: 34},
});
