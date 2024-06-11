import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {width} from 'utils';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  bgBloc: {
    backgroundColor: Colors.bgBlocAdv,
  },
  pH16: {paddingHorizontal: 16},
  mt12: {
    marginTop: 12,
  },
  mb12: {
    marginBottom: 12,
  },
  row: {flexDirection: 'row'},
  posAbsolute: {position: 'absolute'},
  posInput: {
    bottom: 0,
  },
  cenItem: {
    alignItems: 'center',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pr18: {
    paddingRight: 18,
  },
  ml13: {
    marginLeft: 13,
  },
  ml6: {
    marginLeft: 6,
  },
  wrapImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  wrapBot: {
    backgroundColor: Colors.white,
    width,
  },
  inputChat: {
    flex: 1,
    marginLeft: 12,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.whisper,
  },
  radius4: {
    borderRadius: 4,
  },
  pb20: {paddingBottom: 20},
  bgImgHead: {backgroundColor: Colors.transparent},
  ml8: {marginLeft: 8},
  mt14: {
    marginTop: 14,
  },
  mt16: {
    marginTop: 16,
  },
  wrapAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  flex1: {flex: 1},
  wrapOption: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.whisper,
  },
  btnCancel: {
    backgroundColor: Colors.border,
    height: 44,
    flex: 1,
    borderRadius: 4,
  },
  btnComplain: {
    backgroundColor: Colors.colorRed,
    height: 44,
    flex: 1,
    borderRadius: 4,
  },
  alignStart: {alignItems: 'flex-start'},
  imgItem: {width: width * 0.5 - 30},
  bgWhite: {
    backgroundColor: Colors.white,
  },
  boxImg: {height: 156, marginBottom: 8},
  h100: {height: '100%'},
});
