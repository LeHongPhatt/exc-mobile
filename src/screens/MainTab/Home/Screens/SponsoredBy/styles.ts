import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {width} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  pt10: {
    paddingTop: 10,
  },
  pt12: {
    paddingTop: 12,
  },
  pr8: {
    paddingRight: 8,
  },
  btnDetail: {
    backgroundColor: Colors.mainLight,
    color: Colors.white,
  },
  radius6: {
    borderRadius: 6,
    shadowColor: Colors.white,
  },
  wrapBlock: {
    backgroundColor: Colors.white,
    width: '100%',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowColor: Colors.dark,
    elevation: 5,
  },
  wrapImg: {
    width: '100%',
    height: (width * 165) / 341,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  wrapImgDetail: {
    width: '100%',
    height: (width * 214) / 343,
  },
  row: {flexDirection: 'row'},
  spaceItem: {
    justifyContent: 'space-between',
  },
  btnAdv: {
    backgroundColor: Colors.mainLight,
    borderRadius: 4,
  },
  cenItem: {
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
});
