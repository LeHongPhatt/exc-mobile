import {Linking, Platform} from 'react-native';
import {API_HOST} from '@env';
import {Images} from 'assets';

export const callNumber = phone => {
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        //do nothing
        console.log('not supported');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};

export const sendMail = mail => {
  let mailTo = mail;
  mailTo = `mailto:${mail}`;
  Linking.canOpenURL(mailTo)
    .then(supported => {
      if (!supported) {
        //do nothing
        console.log('not supported');
      } else {
        return Linking.openURL(mailTo);
      }
    })
    .catch(err => console.log(err));
};

export const increaseHitSlop = (t = 0, l, b, r) => ({
  top: t,
  left: l || t,
  bottom: b || t,
  right: r || t,
});

export const createError = (msg = '') => Promise.reject(new Error(msg));

export const openLinks = async (url, skipCanOpen = false) => {
  if (skipCanOpen) {
    return await Linking.openURL(url);
  }

  return Linking.canOpenURL(url).then(canOpen => {
    if (!canOpen) {
      return createError(`invalid URL provided: ${url}`);
    } else {
      return Linking.openURL(url);
    }
  });
};

export const openMapByLatLng = (lat, lng, place) => {
  const url = Platform.select({
    ios: `maps:0,0&q=${place}@${lat},${lng}&zoom=14&views=traffic"`,
    android: `geo:0,0?q=${lat},${lng}(${place})`,
  });
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url = `https://www.google.de/maps/@${place}`;
        return Linking.openURL(browser_url);
      }
    })
    .catch(() => {
      if (Platform.OS === 'ios') {
        Linking.openURL(`maps://?q=${place}`);
      }
    });
};
export const openMapByPlace = place => {
  const url = Platform.select({
    ios: `maps:0,0&q=${place}&zoom=14&views=traffic"`,
    android: `geo:0,0?q=${place}`,
  });
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url = `https://www.google.de/maps/@${place}`;
        return Linking.openURL(browser_url);
      }
    })
    .catch(() => {
      if (Platform.OS === 'ios') {
        Linking.openURL(`maps://?q=${place}`);
      }
    });
};

export const showImgSrc = (
  imgUrl?: string,
  imgPath?: string,
  defaultImg?: any,
) => {
  return imgUrl
    ? {uri: `${imgUrl}`}
    : imgPath
    ? {
        uri: `${API_HOST}/images?path=${imgPath}`,
      }
    : defaultImg ?? Images.default_image;
};
