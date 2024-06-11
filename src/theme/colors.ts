/**
 * @description define all colors value used in project
 */

export interface IColors {
  main: string;
  white: string;
  background: string;
  primary: string;
  text: string;
  textBlack: string;
  border: string;
  card: string;
  error: string;
  warning: string;
  info: string;
  status: string;
  mainLight: string;
  dark: string;
  whisper: string;
  snow: string;
  accent: string;
  modalOverlay: string;
  borderLight: string;
  bgTransparentBlack59: string;
  bgTransparentBlack40: string;
  bgTransparentBlack: string;
  dividerColor: string;
  fieldColor: string;
  primaryDark: string;
  primaryLight: string;
  primaryBtn: string;
  secondBtn: string;
  bgInput: string;
  inputColor: string;
  bgActive: string;
  btnStyles: string;
  btnAction: string;
  note: string;
  flActive: string;
  cardItem: string;
  cardContent: string;
  textBl: string;
  bgCard: string;
  colorF8: string;
  textB5: string;
  text74: string;
  blueColor: string;
  bgBlocAdv: string;
  color74: string;
  borderSwitch: string;
  borderBottom: string;
  bgAdv: string;
  txtLabel: string;
  colorF7: string;
  colorBlue: string;
  btnColor: string;
  colorEfe: string;
  bgClose: string;
  bgDrawer: string;
  colorF4: string;
  colorDc: string;
  colorPin: string;
  colorF0: string;
  colorCf: string;
  bgFC: string;
  bgF0: string;
  color09: string;
  colorF1: string;
  colorB8: string;
  color14: string;
  tabBarColor: string;
  color85: string;
  bgWarning: string;
  bgGreen: string;
  colorDA: string;
  colorLine: string;
  colorSelected: string;
  colorF80: string;
  colorFCA: string;
  colorE6: string;
  color81: string;
  colorF9: string;
  colorE6E7: string;
  colorFC: string;
  transparent: string;
  bgTab: string;
  colorRed: string;
  colorSolitude: string;
  black: string;
  gunPowder: string;
  jaguar: string;
  cardOwner: string;
  gray82: string;
  disabled: string;
}

export const Colors: IColors = {
  main: '#FFB901',
  dark: '#3A3A3C',
  white: '#FFFFFF',
  fieldColor: '#F5F5F5',
  inputColor: '#e3e3e3',
  dividerColor: '#BDBDBD',
  mainLight: '#61BD79',
  primary: '#1E1E1E',
  background: '#2B2B2B',
  text: '#FFF',
  textBlack: '#333',
  border: '#ADB3BC',
  card: '#575454',
  error: '#FF2300',
  warning: '#FFD500',
  info: '#FF9900',
  status: '#04B404',
  whisper: '#EEEEEE',
  snow: '#FBFBFB',
  accent: '#4A90A4',
  secondBtn: '#0085de',
  primaryBtn: '#eb2329',
  primaryDark: '#C31C0D',
  primaryLight: '#FF8A65',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  borderLight: '#e4e4e4',
  bgInput: '#858688',
  bgActive: '#440000',
  bgTransparentBlack59: '#00000059',
  bgTransparentBlack40: '#00000040',
  bgTransparentBlack: '#00000000',
  btnStyles: '#e8edf2',
  btnAction: '#880000',
  note: '#FF6600',
  flActive: '#00cc00',
  cardItem: '#f2f2f2',
  cardContent: '#b5bbc436',
  textBl: '#444444',
  bgCard: '#d9f1e5',
  colorF8: '#f8f8f8',
  textB5: '#b5bbc4',
  text74: '#747b9a',
  blueColor: '#0089d0',
  bgBlocAdv: '#EFEFF0',
  color74: '#747474',
  borderSwitch: '#E0E0E0',
  borderBottom: '#E3E3E3',
  bgTab: '#E7E7E7',
  bgAdv: '#d9f1e5bf',
  txtLabel: '#9A9A9A',
  colorF7: '#F7F7F7',
  colorBlue: '#1076BB',
  btnColor: '#FF3B3B',
  colorEfe: '#EFEFEF',
  bgClose: '#00354E',
  bgDrawer: '#1D1D1D',
  colorF4: '#F4F6F9',
  colorDc: '#DC232B',
  colorPin: '#086792',
  colorF0: '#F0F2F5',
  colorCf: '#06C270',
  bgFC: '#FCFDFC',
  bgF0: '#F0F2F5',
  color09: '#09101DCC',
  colorF1: '#1F1F39',
  colorB8: '#B8B8D2',
  color14: '#141414',
  tabBarColor: '#231F20',
  color85: '#858585',
  bgWarning: '#FFF3F2',
  bgGreen: '#F2FFF6',
  colorDA: '#DA2128',
  colorLine: '#231f20',
  colorSelected: '#FCAF17',
  colorF80: '#FFFFFF80',
  colorFCA: '#FCAD1C',
  colorE6: '#E68165',
  color81: '#818286',
  colorF9: '#FFFFFF99',
  colorE6E7: '#E6E7E9',
  colorFC: '#FCFCFC',
  transparent: 'transparent',
  colorRed: '#FF1111',
  colorSolitude: '#E9ECF2',
  black: '#000',
  gunPowder: '#515159',
  jaguar: '#252528',
  cardOwner: '#E6EDFB',
  gray82: '#D1D1D1',
  disabled: '#ADB1B9',
};

export const hexToRgb = (hex: string, a = 1) => {
  const rs = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  console.log('rs', rs);
  if (rs) {
    return hex;
  }
  const r = parseInt(rs?.[1], 16);
  const g = parseInt(rs[2], 16);
  const b = parseInt(rs[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
