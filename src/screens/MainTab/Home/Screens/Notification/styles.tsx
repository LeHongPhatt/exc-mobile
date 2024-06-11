import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  shrinkTxt: {
    fontSize: 18,
    color: 'blue',
  },
  activeBell: {
    width: 16,
    height: 16,
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    top: 1,
  },
  unActive: {
    width: 16,
    height: 16,
    backgroundColor: 'black',
    alignSelf: 'flex-start',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    top: 1,
  },
  notiContainer: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomColor: '#EEEEEE',
  },
});
