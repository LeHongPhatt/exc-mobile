import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {width} from 'utils';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  pH16: {
    paddingHorizontal: 16,
  },
  p8: {
    padding: 8,
  },
  pv16: {
    paddingVertical: 16,
  },
  pl16: {
    paddingLeft: 16,
  },
  pb6: {paddingBottom: 6},
  mr16: {
    marginRight: 16,
  },
  wrapBlockAdv: {
    borderRadius: 12,
    backgroundColor: Colors.bgBlocAdv,
  },
  wrapInnerBlockAdv: {
    borderRadius: 8,
    backgroundColor: Colors.bgCard,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  wrapImg: {
    width: width * 0.75,
    height: width * 0.4,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  btnAdv: {
    backgroundColor: Colors.main,
    borderRadius: 20,
    height: 30,
  },
  radius6: {
    borderRadius: 6,
  },
  wrapBlock: {
    backgroundColor: Colors.white,
    width: width * 0.75,
    shadowOffset: {width: 3, height: 5},
    shadowOpacity: 0.1,
    shadowColor: Colors.dark,
    elevation: 5,
  },
  radius4: {borderRadius: 4},
  p12: {padding: 12},
  mr8: {marginRight: 8},
  row: {flexDirection: 'row'},
  cenItem: {
    alignItems: 'center',
  },
  endItem: {
    justifyContent: 'flex-end',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
