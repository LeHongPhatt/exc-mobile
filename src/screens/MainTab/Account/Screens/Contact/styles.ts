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
  flex1: {flex: 1},
  shrinkTxt: {flexShrink: 1},
  justifyTxt: {textAlign: 'justify'},
  divider: {backgroundColor: Colors.whisper},
});
