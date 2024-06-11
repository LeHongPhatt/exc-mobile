import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {getHeight, getWidth} from 'utils';

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
  justifyTxt: {textAlign: 'justify'},
  wrapLogo: {...getWidth(52), ...getHeight(52)},
  fs16: {fontSize: 16},
  lh24: {lineHeight: 24},
  input: {
    ...getHeight(144),
    borderRadius: 4,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.fieldColor,
  },
  txtAlignTop: {
    textAlignVertical: 'top',
  },
  btnDisable: {
    ...getHeight(48),
    backgroundColor: Colors.border,
    flex: 1,
    borderRadius: 4,
  },
  btnActive: {
    ...getHeight(48),
    backgroundColor: Colors.mainLight,
    flex: 1,
    borderRadius: 4,
  },
});
