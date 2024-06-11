import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';
import {width} from 'utils/libs';

export default StyleSheet.create({
  footercon: {
    position: 'relative',
    backgroundColor: '#eb2329',
    width: '100%',
  },
  rowItem: {
    flexDirection: 'row',
  },
  cenItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconft: {
    color: Colors.white,
    fontSize: 17,
    marginBottom: 5,
  },
  iconftplus: {
    color: '#eb2329',
    backgroundColor: '#fff',
    fontSize: 12,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
    borderColor: '#eb2329',
    borderWidth: 3,
    paddingTop: 20,
  },
  textft: {
    color: '#FFFFFF',
    fontSize: 12,
    paddingLeft: 0,
    paddingRight: 0,
    textTransform: 'uppercase',
  },
  btfooter: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  topBottomfooter: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  wrapContent: {
    width: width * 0.25,
  },
});
