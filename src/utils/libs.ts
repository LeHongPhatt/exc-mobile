import moment from 'moment';
import {
  Dimensions,
  Linking,
  PixelRatio,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

const scaleValue = PixelRatio.get() / 2;

const dimensions = Dimensions.get('window');

const isIos = Platform.OS === 'ios';

export const withoutLeading0 = (text: string) => {
  return text.replace(/^0+/, '');
};

const formatMoney = (value: number) =>
  `¥${value?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

export {dimensions, formatMoney, isIos};

export const formatCurrency = (value: number) => {
  if (value) {
    return value.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return 0;
};

export const formatCurrencyWithFixed = (
  value: number,
  fixed: number = 0,
  s?: string,
  c?: string,
) => {
  if (value) {
    let regex =
      '\\d(?=(\\d{' +
      (value.length || 3) +
      '})+' +
      (fixed > 0 ? '\\.' : '$') +
      ')';
    let num = value?.toFixed(Math.max(0, ~~fixed));
    return `${(c ? num.replace('.', c) : num).replace(
      new RegExp(regex, 'g'),
      '$&' + (s || ','),
    )}`;
  } else {
    return '0';
  }
};

export const addOrRemoveItemSelected = (array, item) => {
  const exists = array.includes(item);
  return exists ? array.filter(c => c !== item) : [item, ...array];
};

export const onlyUnique = (value, index, array) =>
  array.indexOf(value) === index;

export const openLink = (k: string, val: string) => {
  switch (k) {
    case 'email':
      return Linking.openURL(`mailto:${val}`);
    case 'telephone':
      return Linking.openURL(`${isIos ? 'telprompt:' : 'tel:'}${val}`);
    case 'url':
      return Linking.openURL(val);
  }
};

export const offsetKeyboard = Platform.select({
  ios: 0,
  android: 20,
});

//rotate90: { transform: `rotate(${}deg)`},
export const getTransformRotate = (deg: number) => ({
  transform: [{rotate: `${deg}deg`}],
});

export const getWidth = (width: number) => ({
  width,
});

export const getHeight = (height: number) => ({
  height,
});

export const getPaddingHorizontal = (paddingHorizontal: number) => ({
  paddingHorizontal,
});

export const getPaddingVertical = (paddingVertical: number) => ({
  paddingVertical,
});

export const getWidthBySpace = (w: number) => ({
  width: width - w,
});

// export const sleep = (ms: number) => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// };

export const trimStr = (str: string): string => {
  return str.toUpperCase().replace(/\s/g, '');
};

export const strExists = (str: string) => str.search(/Hidden/g) !== -1;

export const validateEmail = (email: string) => {
  var re =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePhone = (phone: string) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return phoneRegExp.test(phone);
};

export const {width, height} = Dimensions.get('window');

export const scaleWithPixel = (size: number, limitScale = 1.2) => {
  /* setting default upto 20% when resolution device upto 20% with defalt iPhone 7 */
  const value = scaleValue > limitScale ? limitScale : scaleValue;
  return size * value;
};

export const heightHeader = () => {
  const landscape = width > height;

  if (Platform.OS === 'android') {
    return 45;
  }

  switch (height) {
    case 375:
    case 414:
    case 812:
    case 896:
    case 926:
    case 844:
    case 812:
    case 844:
      return landscape ? 45 : 88;
    default:
      return landscape ? 45 : 65;
  }
};

export const getFileExtension = (filename: string) => {
  const ext = /^.+\.([^.]+)$/.exec(filename);
  return !ext ? '' : ext[1];
};

export const getFileName = (path: string) => {
  try {
    const ext = path.split('/');
    return ext[ext.length - 1];
  } catch (error) {
    return '';
  }
};

export const getScreen = {
  TCK: 'SupportTicketDetail',
  EVE: 'EventDetail',
  NEW: 'NewsDetail',
  POM: 'PromotionDetail',
  ACT: 'Schedule',
  PCT: 'ContractList',
};

export const genCodeByStr = (str: string) => {
  const t = `${moment().format('YYYYMMDD-HHmmss')}${str}-`;
  const rand = makeid(25 - t.length);
  return `${t}${rand}`;
};

export const getNow = () => moment().format('DD/MM/YYYY');

export const getPrevDay = () =>
  moment().subtract(1, 'days').format('DD/MM/YYYY');

export const getPrevMonth = () =>
  moment().subtract(1, 'months').format('DD/MM/YYYY');

export const formatDBYMDHMS = (str: string) =>
  moment(str).format('YYYY-MM-DD HH:mm:ss');

export const formatDBYMDHM = (str: string) =>
  moment(str).format('YYYY-MM-DD HH:mm');

export const formatDBYMD = (str: string) => moment(str).format('YYYY-MM-DD');

export const convertYMD = (str: string) => {
  const s = str.split('/');
  return `${s[2]}-${s[1]}-${s[0]}`;
};

export const formatDBHM = (str: string) => moment(str).format('HH:mm');
export const formatMinuteHours = (str: string) =>
  moment(str, 'HH').format('HH:mm');

export const formatDMY = (str: string) => moment(str).format('DD/MM/YYYY');
export const formatYMD = (str: string) => moment(str).format('YYYY-MM-DD');
export const formatYYYY = (str: string) => moment(str).format('YYYY');

export const formatDMYHM = (str: string) =>
  moment(str).format('DD/MM/YYYY HH:mm');

export const formatHMDMY = (str: string, separator: string = ' ') =>
  moment(str).format(`HH:mm${separator}DD/MM/YYYY`);

export const formatDMYIso = (str: string) =>
  moment(str, 'DD/MM/YYYY').toISOString();

export const formatUtcDMY = (str: string) => moment.utc(str, 'DD/MM/YYYY');

export const checkDayIsAfter = (startDate: string, endDate: string) =>
  moment(formatUtcDMY(endDate)).isAfter(formatUtcDMY(startDate));

export const refreshListByActivityId = (
  list: any,
  item: any,
  type?: string | null,
) => {
  let newList = [];
  if (type) {
    newList = list.filter((e: any) => {
      if (e.activityid === item?.activityid) {
        e.cusconfirm = type;
      }
      return e;
    });
  } else {
    newList = list.filter((e: any) => e.activityid !== item?.activityid);
  }
  return newList;
};

export const makeid = (code: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < code; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const sortListBykey = (list: any, key: string) => {
  const newList = list.sort((a, b) =>
    (key === 'ASC' ? a.issuedate < b.issuedate : a.issuedate > b.issuedate)
      ? -1
      : 1,
  );
  console.log('newList====================================');
  console.log(newList);
  console.log('====================================');
  return newList;
};

export const formatHTML = () => {
  return `
  <style>ul, ol{padding: 0, margin: 0}</style>
  `;
};

export const getCurrentTS = () => {
  return moment().unix();
};

const now = new Date();

const getLstDayOfMonFnc = (date: any) => {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
};

export const getDateFrom = (value: number) => {
  let dateFrom;
  switch (value) {
    case 1:
      dateFrom =
        now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
      break;
    case 2:
      dateFrom =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay(),
        ).getFullYear() +
        '-' +
        (new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay(),
        ).getMonth() +
          1) +
        '-' +
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay(),
        ).getDate();
      break;
    case 3:
      dateFrom =
        new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-01';
      break;
    default:
      dateFrom = null;
  }

  return dateFrom;
};

export const getDateTo = (value: number) => {
  let dateTo;
  switch (value) {
    case 1:
      dateTo =
        now.getFullYear() +
        '-' +
        (now.getMonth() + 1) +
        '-' +
        (now.getDate() + 1);

      break;
    case 2:
      dateTo =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay(),
        ).getFullYear() +
        '-' +
        (new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay(),
        ).getMonth() +
          1) +
        '-' +
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay() + 6,
        ).getDate();
      break;
    case 3:
      dateTo =
        now.getFullYear() +
        '-' +
        (now.getMonth() + 1) +
        '-' +
        getLstDayOfMonFnc(now);

      break;
    default:
      dateTo = null;
  }

  return dateTo;
};

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const isArray = (obj: any) => {
  return !!obj && obj.constructor === Array;
};

export const groupByDoctype = (arr: any, type = 'doctypename') => {
  switch (type) {
    case 'doctypename': {
      const groupByDocType = arr.reduce((group: any, item: any) => {
        const {doctypename} = item;
        group[doctypename] = group[doctypename] ?? [];
        group[doctypename].push(item);
        return group;
      }, {});

      return groupByDocType;
    }
    case 'projectname': {
      const groupByDocType = arr.reduce((group: any, item: any) => {
        const {projectname = ''} = item;
        group[projectname] = group[projectname] ?? [];
        group[projectname].push(item);
        return group;
      }, {});

      return groupByDocType;
    }
    case 'month': {
      const groupByDocType = arr.reduce((group: any, item: any) => {
        const {yearnmonth} = item;
        group[yearnmonth] = group[yearnmonth] ?? [];
        group[yearnmonth].push(item);
        return group;
      }, {});

      return groupByDocType;
    }
    case 'qnatype': {
      const groupByDocType = arr.reduce((group: any, item: any) => {
        const {typename} = item;
        group[typename] = group[typename] ?? [];
        group[typename].push(item);
        return group;
      }, {});

      return groupByDocType;
    }
    default: {
      const groupByDocType = arr.reduce((group: any, item: any) => {
        const {doctypename = 'khac'} = item;
        group[doctypename] = group[doctypename] ?? [];
        group[doctypename].push(item);
        return group;
      }, {});

      return groupByDocType;
    }
  }
};

export const includeValues = (qrvalue: string) => {
  return (
    qrvalue.includes('https://') ||
    qrvalue.includes('http://') ||
    qrvalue.includes('geo:')
  );
};

export const randomItem = (arr: any) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateArr = (arr: any, screenType: string) => {
  switch (screenType) {
    case CateByType.NEWTYPE: {
      let arrTmp = [...new Map(arr.map((m: any) => [m.newsid, m])).values()];
      return arrTmp.slice(0, 3); // pin 3 item
    }

    case CateByType.EVETYPE: {
      let arrTmp = [
        ...new Map(arr.map((m: any) => [m.eventscode, m])).values(),
      ];
      return arrTmp.slice(0, 3);
    }

    case CateByType.POMTYPE: {
      let arrTmp = [
        ...new Map(arr.map((m: any) => [m.promotioncode, m])).values(),
      ];
      return arrTmp.slice(0, 3);
    }

    default: {
      return arr;
    }
  }
};

export const generateSex = (value: any) => {
  switch (value) {
    case 'M': {
      return 'label.reference2_male';
    }
    case 'F': {
      return 'label.reference2_female';
    }
    default: {
      return 'label.reference2_other';
    }
  }
};

export const arrayChunk = (arr: any, n: number) => {
  if (arr?.length > 0 && arr?.length > n) {
    const array = arr?.slice();
    const chunks = [];
    while (array?.length) {
      chunks.push(array.splice(0, n));
    }
    return chunks;
  } else {
    return arr;
  }
};

export const divisibleNumber = (n: number, divider: number) =>
  n % divider === 0;
export const generateLocaleTime = (time: string) => {
  if (time) {
    let timeTmp = time.slice(0, 2);
    if (Number(timeTmp) < 12) {
      return 'AM';
    } else {
      return 'PM';
    }
  }
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export function getExtension(filename: string) {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}

export const isImage = (filename: string) => {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
      //etc
      return true;
  }
  return false;
};

export const isVideo = (filename: string) => {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
      // etc
      return true;
  }
  return false;
};

export const isPdfFile = (filename: string) => {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'pdf':
      return true;
  }
  return false;
};

export const replaceHtml = (value: any) => {
  return value?.replace(/\\n/i, '');
};

export const generateTypeGroup = (fileName: string) => {
  if (fileName) {
    const lastIndex = fileName.lastIndexOf('.');
    return fileName.slice(0, lastIndex);
  }
};

export const sortByKey = (data: any[], key: string) => {
  try {
    return data.sort((a, b) => (a?.[key] < b?.[key] ? 1 : -1));
  } catch (error) {
    return data;
  }
};

export const getComponent = disabled => {
  if (!disabled) {
    return View;
  }
  return TouchableOpacity;
};
