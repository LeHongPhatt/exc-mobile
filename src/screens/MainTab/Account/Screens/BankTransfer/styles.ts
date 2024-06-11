import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  justifyTxt: {textAlign: 'justify'},
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
  btnActive: {
    backgroundColor: Colors.mainLight,
    height: 48,
    flex: 1,
    borderRadius: 4,
  },
  fs16: {fontSize: 16},
  lh24: {lineHeight: 24},
  lh20: {lineHeight: 20},
  dividerBg: {backgroundColor: Colors.whisper},
  wrapperBank: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 13,
  },
  contentBank: {
    position: 'relative',
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 4,
    marginRight: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.gray82,
  },
  image: {
    width: 91,
    height: 43,
  },
  check: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.mainLight,
    padding: 4,
    borderBottomLeftRadius: 4,
  },
  contentCopy: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.mainLight,
    borderRadius: 4,
    backgroundColor: Colors.cardOwner,
    padding: 8,
    marginTop: 12,
  },
  shrinkTxt: {flexShrink: 1},
  contact: {
    height: 24,
    borderWidth: 1,
    borderColor: Colors.mainLight,
    borderRadius: 31,
    paddingHorizontal: 12,
  },
});
