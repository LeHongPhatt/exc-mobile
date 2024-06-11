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
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  flex1: {flex: 1},
  divider: {backgroundColor: Colors.whisper},
  radius4: {borderRadius: 4},
  borderWhisper: {borderWidth: 1, borderColor: Colors.whisper},
  justifyTxt: {textAlign: 'justify'},
  fs16: {
    fontSize: 16,
  },
  lh24: {
    lineHeight: 24,
  },
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
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.mainLight,
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  miniRadioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.mainLight,
  },
  miniRadioUnselected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.white,
  },
  wrapPaymentMethod: {
    width: 44,
    height: 22,
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
  wrapShadow: {
    shadowColor: Colors.dark,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
});
