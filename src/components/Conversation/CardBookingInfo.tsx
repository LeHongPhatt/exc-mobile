import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {EAction, IItemBookingInfo} from 'types';
import {
  width,
  getPaddingHorizontal,
  getPaddingVertical,
  getHeight,
} from 'utils';
import Icon from 'assets/svg/Icon';
import {Colors} from 'theme';
import {TouchCus, TextCus} from 'components';
import {Divider} from 'react-native-paper';

export function CardBookingInfo(props: ICardBookingInfo) {
  const {bookingInfo, onConfirm, isOwner = false, style} = props;
  const [showDetail, setShowDetail] = useState(false);
  console.log('=====bookingInfo=========', bookingInfo);

  return (
    <View
      style={[
        styles.wrapCardInfo,
        width,
        styles.wrapShadow,
        getPaddingVertical(8),
        style,
      ]}>
      <TouchCus
        style={getPaddingHorizontal(16)}
        onPress={() => setShowDetail(!showDetail)}>
        <View style={[styles.spaceItem, styles.row, styles.topItem]}>
          <View style={[styles.row, styles.cenItem, styles.flex]}>
            <View style={styles.mr8}>
              {Icon.LocationInfo({color: Colors.mainLight})}
            </View>
            <View style={[styles.flex, styles.mr16]}>
              {bookingInfo?.name && (
                <TextCus mainLightColor body2 medium>
                  {bookingInfo?.name}
                </TextCus>
              )}
              {bookingInfo?.payment_type &&
                bookingInfo?.amount &&
                bookingInfo?.commission &&
                !showDetail && (
                  <View style={styles.mt4}>
                    <TextCus>
                      <TextCus caption1 useI18n>
                        {bookingInfo?.payment_type}
                      </TextCus>
                      <TextCus caption1> / {bookingInfo?.amount}</TextCus>
                      <TextCus caption1> / {bookingInfo?.commission}%</TextCus>
                    </TextCus>
                  </View>
                )}
            </View>
          </View>
          <View style={[styles.spaceItem, styles.rightItem]}>
            {bookingInfo?.status && (
              <View
                style={[
                  styles.btnStatus,
                  styles.radius37,
                  bookingInfo?.status === EAction.RECEIVED
                    ? styles.recevied
                    : styles.pending,
                ]}>
                <TextCus whiteColor label2 medium useI18n>
                  {bookingInfo?.status}
                </TextCus>
              </View>
            )}
            <View style={styles.mt8}>
              {showDetail
                ? Icon.ChevronUp({color: Colors.mainLight})
                : Icon.ChevronDown({color: Colors.mainLight})}
            </View>
          </View>
        </View>
      </TouchCus>
      {showDetail && (
        <View>
          <Divider
            style={[
              getHeight(1),
              styles.mv16,
              {backgroundColor: Colors.whisper},
            ]}
          />
          <View style={getPaddingHorizontal(16)}>
            <View style={[styles.row, styles.spaceItem]}>
              <TextCus caption1 medium useI18n bgInput>
                poster
              </TextCus>
              <TextCus caption1 medium mainLightColor>
                {bookingInfo?.owner?.full_name || '222'}
              </TextCus>
            </View>
            <View style={[styles.row, styles.spaceItem, styles.mt8]}>
              <TextCus caption1 medium useI18n bgInput>
                pay_method
              </TextCus>
              <TextCus caption1>{bookingInfo?.payment_type}</TextCus>
            </View>
            <View style={[styles.row, styles.spaceItem, styles.mt8]}>
              <TextCus caption1 medium useI18n bgInput>
                amount
              </TextCus>
              <TextCus caption1>{bookingInfo?.amount}</TextCus>
            </View>
            <View style={[styles.row, styles.spaceItem, styles.mt8]}>
              <TextCus caption1 medium useI18n bgInput>
                referral_fee
              </TextCus>
              <TextCus caption1>{`${bookingInfo?.commission ?? ''}%`}</TextCus>
            </View>
            {bookingInfo?.status === EAction.PENDING && !isOwner && (
              <View style={[styles.rightItem, styles.mt8]}>
                <TouchCus
                  style={[
                    styles.pending,
                    styles.btnAction,
                    styles.radius4,
                    styles.cenItemvh,
                  ]}
                  onPress={() => onConfirm?.()}>
                  <TextCus whiteColor body2 medium useI18n>
                    confirm
                  </TextCus>
                </TouchCus>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

export interface ICardBookingInfo {
  style?: any;
  bookingInfo: IItemBookingInfo;
  isOwner?: boolean;
  onConfirm?: () => void;
}
