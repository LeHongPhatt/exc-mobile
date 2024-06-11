import {Colors} from 'theme';

const spacing = {
  'mt-': 'marginTop',
  'mb-': 'marginBottom',
  'mr-': 'marginRight',
  'ml-': 'marginLeft',
  'mx-': 'marginHorizontal',
  'my-': 'marginVertical',
  'pt-': 'paddingTop',
  'pb-': 'paddingBottom',
  'pr-': 'paddingRight',
  'pl-': 'paddingLeft',
  'px-': 'paddingHorizontal',
  'py-': 'paddingVertical',
  'm-': 'margin',
  'p-': 'padding',
  't-': 'top',
  'r-': 'right',
  'b-': 'bottom',
  'l-': 'left',
  'w-': 'width',
  'h-': 'height',
  'maxh-': 'maxHeight',
  'maxw-': 'maxWidth',
  'minh-': 'minHeight',
  'minw-': 'minWidth',
  'bg-': 'backgroundColor',
  'fd-': 'flexDirection',
  'items-': 'alignItems',
  'justify-': 'justifyContent',
  'br-': 'borderRadius',
  'brw-': 'borderRightWidth',
  'brc-': 'borderRightColor',
};

export const withOpacity = (color, opacity) => {
  let op = Math.round(255 * opacity);
  return `${color}${op.toString(16).toUpperCase()}`;
};

export const styleSpacing = key => {
  const exceptNum = ['fd-', 'items-', 'justify-', 'brc-', 'bg-'];
  for (const [prefix, prop] of Object.entries(spacing)) {
    if (key.indexOf(prefix) === 0) {
      const keys = key.split(prefix)[1];
      const vals = exceptNum.includes(prefix) ? keys : Number(keys);
      const v = ['bg-'].includes(prefix) ? Colors[`${vals}`] : vals;
      return {[prop]: v};
    }
  }
  return {};
};
