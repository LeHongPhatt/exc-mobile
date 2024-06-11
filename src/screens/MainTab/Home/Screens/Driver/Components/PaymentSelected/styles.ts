import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  row: {flexDirection: 'row'},
  cenItem: {
    alignItems: 'center',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {flex: 1},
  fs16: {fontSize: 16},
  lh24: {lineHeight: 24},
  btnCancel: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.disabled,
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 13,
    display: 'flex',
  },
  btnChoose: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.mainLight,
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 13,
    display: 'flex',
  },
  wrapSelected: {backgroundColor: Colors.bgBlocAdv},
  wrapUnselected: {backgroundColor: Colors.white},
});
