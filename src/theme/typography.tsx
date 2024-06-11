import {StyleSheet} from 'react-native';

/**
 * Fontweight setting
 * - This font weight will be used for style of screens where needed
 * - Check more how to use font weight with url below
 * @url https://passionui.com/docs/listar-pro/theme
 */
export const FontWeight = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

/**
 * Define list font use for whole application
 */
export const FontSupport = [
  'Raleway',
  'Montserrat',
  'Roboto',
  'Merriweather',
  'Inter',
];

/**
 * Define font default use for whole application
 */
export const DefaultFont = 'Montserrat';

export const BaseStyle = StyleSheet.create({
  textInput: {
    height: 46,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

/**
 * Typography setting
 * - This font weight will be used for all template
 * - Check more how to use typography in url below
 * @url https://passionui.com/docs/listar-pro/theme
 */
export const Typography = StyleSheet.create({
  header: {
    fontSize: 34,
    fontWeight: FontWeight.regular,
  },
  title1: {
    fontSize: 28,
    fontWeight: FontWeight.regular,
  },
  title2: {
    fontSize: 22,
    fontWeight: FontWeight.regular,
  },
  title3: {
    fontSize: 20,
    fontWeight: FontWeight.regular,
  },
  title4: {
    fontSize: 18,
    fontWeight: FontWeight.regular,
  },
  headline: {
    fontSize: 17,
    fontWeight: FontWeight.regular,
  },
  body1: {
    fontSize: 17,
    fontWeight: FontWeight.regular,
  },
  body2: {
    fontSize: 14,
    fontWeight: FontWeight.regular,
  },
  callout: {
    fontSize: 17,
    fontWeight: FontWeight.regular,
  },
  subhead: {
    fontSize: 15,
    fontWeight: FontWeight.regular,
  },
  footnote: {
    fontSize: 13,
    fontWeight: FontWeight.regular,
  },
  caption1: {
    fontSize: 12,
    fontWeight: FontWeight.regular,
  },
  caption2: {
    fontSize: 11,
    fontWeight: FontWeight.regular,
  },
  overline: {
    fontSize: 10,
    fontWeight: FontWeight.regular,
  },
  label1: {
    fontSize: 9,
    fontWeight: FontWeight.regular,
  },
  label2: {
    fontSize: 8,
    fontWeight: FontWeight.regular,
  },
});
