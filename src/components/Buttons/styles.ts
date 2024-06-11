import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {FontWeight, Typography} from 'theme/typography';

export default StyleSheet.create({
  default: {
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  textDefault: {
    ...Typography.headline,
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },
  outline: {
    borderWidth: 1,
  },
  shadow: {shadowColor: Colors.dark, shadowOpacity: 0.9},
  full: {
    width: '100%',
    alignSelf: 'auto',
  },
  round: {
    borderRadius: 28,
  },
  padLeft5: {paddingLeft: 5},
});
