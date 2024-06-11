import {StyleSheet} from 'react-native';
import {DefaultFont, FontWeight} from 'theme/typography';
import {Colors} from 'theme';
import {width} from 'utils';

export default StyleSheet.create({
  dropdownBtn: {
    height: 56,
    width: width,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.borderBottom,
    color: Colors.borderBottom,
    backgroundColor: Colors.white,
  },
  dropdownRow: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.whisper,
  },
  dropdownDef: {
    backgroundColor: Colors.white,
    borderRadius: 6,
  },
  txtDef: {
    fontFamily: DefaultFont,
    fontSize: 14,
    fontWeight: FontWeight.regular,
  },
  txtAlignLeft: {
    textAlign: 'left',
  },
});
