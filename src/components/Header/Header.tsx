import React, {ReactNode, useEffect} from 'react';
import {View, StatusBar, Keyboard} from 'react-native';
import styles from './styles';
import {NavigationService} from 'navigation';
import {Title, Subheading} from 'react-native-paper';
import {TouchCus} from 'components';

export function Header(props: IHeader) {
  const {
    style,
    styleLeft,
    styleCenter,
    styleRight,
    title,
    subTitle,
    onPressLeft,
    renderLeft,
    renderCenter,
    renderRight,
    notGoBack = false,
    showCenter = true,
    showRight = true,
  } = props;

  useEffect(() => {
    const option = 'dark-content';
    StatusBar.setBarStyle(option, true);
  });

  return (
    <View style={[styles.contain, styles.row, styles.spaceBetween, style]}>
      {showCenter && (
        <View style={[styles.centVHItem, styles.absoluteCenter, styleCenter]}>
          {renderCenter && renderCenter()}
          {!renderCenter && (
            <Title numberOfLines={1} style={[styles.txtDark, styles.headLine]}>
              {title}
            </Title>
          )}
          {subTitle && !renderCenter && <Subheading>{subTitle}</Subheading>}
        </View>
      )}
      <TouchCus
        style={styleLeft}
        onPress={() => {
          if (!notGoBack) {
            if (onPressLeft) {
              onPressLeft();
            } else {
              Keyboard.dismiss();
              NavigationService.goBack();
            }
          }
        }}>
        {renderLeft && renderLeft()}
      </TouchCus>
      {showRight && (
        <View style={[styles.right, styleRight]}>
          {renderRight && renderRight()}
        </View>
      )}
    </View>
  );
}

export interface IHeader {
  style?: any;
  styleLeft?: any;
  styleCenter?: any;
  styleRight?: any;
  styleRightSecond?: any;
  renderCenter?: () => ReactNode;
  renderLeft?: () => ReactNode;
  renderRight?: () => ReactNode;
  renderRightSecond?: () => ReactNode;
  onPressRightSecond?: () => void;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  title?: string;
  subTitle?: string;
  barStyle?: string;
  notGoBack?: boolean;
  showCenter?: boolean;
  showRight?: boolean;
  // type?: 'threeItem' | 'twoItem' | 'oneItem' | 'none';
}
