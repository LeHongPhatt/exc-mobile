import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {width} from 'utils';

export default StyleSheet.create({
  wrapCardInfo: {
    backgroundColor: Colors.white,
  },
  wrapMaxTicket: {
    maxWidth: width - 100,
    minWidth: width - 100,
  },
  wrapPosReact: {width: '100%', top: -35},
  wrapReact: {backgroundColor: Colors.white, width: 200},
  posAbsolute: {position: 'absolute'},
  wrapShadow: {
    shadowColor: Colors.dark,
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 0.1,
    elevation: 5,
  },
  wrapEmotion: {
    position: 'absolute',
    right: 10,
    bottom: -14,
  },
  wrapGroupEmo: {
    backgroundColor: Colors.white,
  },
  wrapImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  w50: {width: width * 0.5},
  mt12: {marginTop: 12},
  mr8: {marginRight: 8},
  mb8: {marginBottom: 8},
  ml8: {marginLeft: 8},
  ml4: {marginLeft: 4},
  pending: {backgroundColor: Colors.mainLight},
  recevied: {backgroundColor: Colors.white},
  btnRecevie: {backgroundColor: Colors.error},
  done: {backgroundColor: Colors.mainLight},
  radius8: {
    borderRadius: 8,
  },
  radius37: {
    borderRadius: 37,
  },
  pH16: {
    paddingHorizontal: 16,
  },
  h100: {
    height: 100,
  },
  btnAction: {
    width: width * 0.5 - 60,
    height: 33,
  },
  btnStatus: {height: 19, paddingHorizontal: 8, paddingVertical: 4},
  row: {
    flexDirection: 'row',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  radius4: {
    borderRadius: 4,
  },
  voteItem: {
    borderWidth: 1,
    borderColor: Colors.border,
    height: 52,
  },
  cenItem: {alignItems: 'center'},
  cenItemvh: {alignItems: 'center', justifyContent: 'center'},
  padContent: {padding: 12, paddingTop: 8},
  padTitle: {padding: 12, paddingBottom: 8},
  p12: {padding: 12},
  mt8: {marginTop: 8},
  padItemContent: {paddingHorizontal: 12, paddingTop: 8},
  mt4: {marginTop: 4},
  rightItem: {alignItems: 'flex-end'},
  topItem: {alignItems: 'flex-start'},
  flex: {flex: 1},
  mr16: {marginRight: 16},
  mv16: {marginVertical: 16},
  radius95: {borderRadius: 95},
  margin2: {margin: 2},
  wrapCardImg: {aspectRatio: 1},
  wrapMaxChat: {maxWidth: width - 85},
  wrapCardOwner: {backgroundColor: Colors.cardOwner},
  wrapCardTime: {backgroundColor: Colors.border, borderRadius: 61},
  wrapMatched: {borderWidth: 1, borderColor: Colors.main},
  border: {borderRadius: 20},
  center: {
    alignItems: 'center',
  },
});
