import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {width} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  row: {flexDirection: 'row'},
  cenItem: {
    alignItems: 'center',
  },
  wrapImg: {
    height: ((width - 112) * 272) / 263,
  },
  wrapCard: {
    backgroundColor: Colors.bgBlocAdv,
  },
  radius8: {
    borderRadius: 8,
  },
  divider: {backgroundColor: Colors.gray82},
  shrinkTxt: {flexShrink: 1},
  justifyTxt: {textAlign: 'justify'},
  btnActive: {
    backgroundColor: Colors.mainLight,
    height: 44,
    flex: 1,
    borderRadius: 4,
  },
  input: {
    height: 56,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.borderBottom,
    color: Colors.borderBottom,
    backgroundColor: Colors.white,
  },
  fieldTextRequired: {
    paddingTop: 4,
    color: Colors.error,
    textAlign: 'left',
  },
  fs16: {fontSize: 16},
  lh24: {lineHeight: 24},
});
