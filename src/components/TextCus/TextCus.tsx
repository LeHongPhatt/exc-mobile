import React, {memo, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text} from 'react-native';
import {Colors} from 'theme';
import {DefaultFont, FontWeight, Typography} from 'theme/typography';
import {withStyle} from 'HOC';

const Roboto = {
  100: 'Thin',
  200: 'Thin',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Medium',
  700: 'Bold',
  800: 'Bold',
  900: 'Black',
  normal: 'Regular',
  bold: 'Bold',
};

const Montserrat = {
  100: 'Thin',
  200: 'Thin',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Medium',
  700: 'Bold',
  800: 'Bold',
  900: 'Black',
  normal: 'Regular',
  bold: 'Bold',
};

// const Raleway = {
//   100: 'Thin',
//   200: 'ExtraLight',
//   300: 'Light',
//   400: 'Regular',
//   500: 'Medium',
//   600: 'SemiBold',
//   700: 'Bold',
//   800: 'ExtraBold',
//   900: 'Black',
//   normal: 'Regular',
//   bold: 'Bold',
// };

// const Merriweather = {
//   100: 'Light',
//   200: 'Light',
//   300: 'Light',
//   400: 'Regular',
//   500: 'Regular',
//   600: 'Bold',
//   700: 'Bold',
//   800: 'Bold',
//   900: 'Black',
//   normal: 'Regular',
//   bold: 'Bold',
// };

function TextCus(props: ITexts) {
  const {t} = useTranslation();
  const {
    //props style
    header,
    title1,
    title2,
    title3,
    title4,
    headline,
    body1,
    body2,
    callout,
    subhead,
    footnote,
    caption1,
    caption2,
    overline,
    label1,
    label2,
    // props font
    thin,
    ultraLight,
    light,
    regular,
    medium,
    semibold,
    bold,
    heavy,
    black,
    //custom color
    mainColor,
    primaryColor,
    mainLightColor,
    borderColor,
    secondBtn,
    primaryBtn,
    darkPrimaryColor,
    lightPrimaryColor,
    accentColor,
    grayColor,
    dividerColor,
    whiteColor,
    fieldColor,
    errorColor,
    bgInput,
    redColor,
    //numberOfLines
    numberOfLines,
    textAlign,
    //custom
    style,
    //children
    children,
    useI18n = false,
  } = props;

  let textStyle = StyleSheet.flatten([
    {fontFamily: DefaultFont, textAlign},
    header && Typography.header,
    title1 && Typography.title1,
    title2 && Typography.title2,
    title3 && Typography.title3,
    title4 && Typography.title4,
    headline && Typography.headline,
    body1 && Typography.body1,
    body2 && Typography.body2,
    callout && Typography.callout,
    subhead && Typography.subhead,
    footnote && Typography.footnote,
    caption1 && Typography.caption1,
    caption2 && Typography.caption2,
    overline && Typography.overline,
    label1 && Typography.label1,
    label2 && Typography.label2,
    //custom for font
    thin && {fontWeight: FontWeight.thin},
    ultraLight && {fontWeight: FontWeight.ultraLight},
    light && {fontWeight: FontWeight.light},
    regular && {fontWeight: FontWeight.regular},
    medium && {fontWeight: FontWeight.medium},
    semibold && {fontWeight: FontWeight.semibold},
    bold && {fontWeight: FontWeight.bold},
    heavy && {fontWeight: FontWeight.heavy},
    black && {fontWeight: FontWeight.black},
    // default color
    {color: Colors.textBlack},
    //custom for color
    borderColor && {color: Colors.border},
    secondBtn && {color: Colors.secondBtn},
    mainColor && {color: Colors.main},
    primaryColor && {color: Colors.primary},
    mainLightColor && {color: Colors.mainLight},
    primaryBtn && {color: Colors.primaryBtn},
    darkPrimaryColor && {color: Colors.primaryDark},
    lightPrimaryColor && {color: Colors.primaryLight},
    accentColor && {color: Colors.accent},
    grayColor && {color: Colors.border},
    dividerColor && {color: Colors.dividerColor},
    whiteColor && {color: Colors.white},
    fieldColor && {color: Colors.fieldColor},
    errorColor && {color: Colors.error},
    bgInput && {color: Colors.bgInput},
    redColor && {color: Colors.colorRed},
    style,
  ]);

  if (textStyle.fontFamily) {
    const fontStyle = textStyle.fontStyle === 'italic' ? 'Italic' : '';
    const fontWeight = textStyle.fontWeight ?? 400;
    switch (textStyle.fontFamily) {
      case 'Montserrat':
        textStyle.fontFamily = `${textStyle.fontFamily}-${
          Montserrat[fontWeight] === 'Regular'
            ? Montserrat[fontWeight]
            : Montserrat[fontWeight] + fontStyle
        }`;
        break;
      case 'Roboto':
        textStyle.fontFamily = `${textStyle.fontFamily}-${
          Roboto[fontWeight] === 'Regular'
            ? Roboto[fontWeight]
            : Roboto[fontWeight] + fontStyle
        }`;
        break;
      default:
        break;
    }
  }

  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {useI18n ? t(`${children}`) : children ?? ''}
    </Text>
  );
}

export default memo(withStyle(TextCus));

export interface ITexts {
  header?: boolean;
  title1?: boolean;
  title2?: boolean;
  title3?: boolean;
  title4?: boolean;
  headline?: boolean;
  body1?: boolean;
  body2?: boolean;
  callout?: boolean;
  subhead?: boolean;
  footnote?: boolean;
  caption1?: boolean;
  caption2?: boolean;
  overline?: boolean;
  label1?: boolean;
  label2?: boolean;
  //define font custom
  thin?: boolean;
  ultraLight?: boolean;
  light?: boolean;
  regular?: boolean;
  medium?: boolean;
  semibold?: boolean;
  bold?: boolean;
  heavy?: boolean;
  black?: boolean;
  //custon for text color
  mainColor?: boolean;
  primaryColor?: boolean;
  mainLightColor?: boolean;
  borderColor?: boolean;
  secondBtn?: boolean;
  primaryBtn?: boolean;
  darkPrimaryColor?: boolean;
  lightPrimaryColor?: boolean;
  accentColor?: boolean;
  grayColor?: boolean;
  dividerColor?: boolean;
  whiteColor?: boolean;
  fieldColor?: boolean;
  errorColor?: boolean;
  bgInput?: boolean;
  redColor?: boolean;
  //numberOfLines
  numberOfLines?: Number;
  textAlign?: String;
  //custom style
  style?: any;
  children?: ReactNode; // plain text
  useI18n?: boolean;
}
