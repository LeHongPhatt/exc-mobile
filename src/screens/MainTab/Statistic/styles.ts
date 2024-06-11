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
  radius4: {
    borderRadius: 4,
  },
  radius37: {
    borderRadius: 37,
  },
  borderWhisper: {
    borderWidth: 1,
    borderColor: Colors.whisper,
  },
  wrapShadow: {
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 0.3,
    shadowColor: Colors.dark,
    elevation: 5,
  },
  flex1: {
    flex: 1,
  },
  shrinkTxt: {flexShrink: 1},
  wrapCard: {
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  pending: {
    backgroundColor: Colors.mainLight,
  },
  received: {
    backgroundColor: Colors.main,
  },
  canceled: {
    backgroundColor: Colors.border,
  },
  complain: {
    backgroundColor: Colors.colorRed,
  },
  tabSelected: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.mainLight,
  },
  tabUnselected: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.whisper,
  },
});
