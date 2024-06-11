import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  wrapImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  row: {
    flexDirection: 'row',
  },
  cenItemvh: {alignItems: 'center', justifyContent: 'center'},
  bgTrans: {backgroundColor: Colors.transparent},
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  ml13: {marginLeft: 13},
  ml6: {marginLeft: 6},
  pr18: {paddingRight: 18},
  asStretch: {alignSelf: 'stretch'},
  flex1: {flex: 1},
});
