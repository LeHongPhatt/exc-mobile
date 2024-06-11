import {TextCus} from 'components/TextCus';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Divider} from 'react-native-paper';
export function CardInfo(props: ICardInfo) {
  const {title, subtitle, titleStyle, subtitleStyle, children, style} = props;
  return (
    <View
      style={[styles.wrapCardInfo, styles.wrapShadow, styles.radius8, style]}>
      {(title || subtitle) && (
        <View style={[styles.padTitle, styles.cenItemvh]}>
          {title &&
            (titleStyle ? (
              <TextCus body2 medium style={titleStyle}>
                {title}
              </TextCus>
            ) : (
              <TextCus body2 medium mainLightColor>
                {title}
              </TextCus>
            ))}
          {subtitle && (
            <View style={styles.mt4}>
              {subtitleStyle ? (
                <TextCus body2 medium style={subtitleStyle}>
                  {subtitle}
                </TextCus>
              ) : (
                <TextCus body2 medium>
                  {subtitle}
                </TextCus>
              )}
            </View>
          )}
        </View>
      )}
      {children ? (
        <View>
          <Divider />
          <View style={styles.padContent}>{children}</View>
        </View>
      ) : (
        <View style={styles.mt4} />
      )}
    </View>
  );
}

export interface ICardInfo {
  style?: any;
  title?: any;
  subtitle?: any;
  titleStyle?: any;
  subtitleStyle?: any;
  children: ReactNode;
}
