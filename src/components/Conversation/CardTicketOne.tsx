import {TextCus} from 'components/TextCus';
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {IItemTicketOne} from 'types';
import {TouchCus} from 'components';
import {Divider} from 'react-native-paper';

export function CardTicketOne(props: ICardTicket) {
  const {ticketOne, style} = props;

  return (
    <View
      style={[styles.wrapCardInfo, styles.wrapShadow, styles.radius8, style]}>
      <View style={[styles.padTitle, styles.cenItemvh, styles.row]}>
        <TextCus>
          {ticketOne?.name && (
            <TextCus mainLightColor body2 medium>
              {ticketOne?.name}
            </TextCus>
          )}
          <TextCus body2 medium>
            {' '}
            đã nhận thông tin cuốc xe
          </TextCus>
        </TextCus>
      </View>
      <Divider />
      <View style={styles.padContent}>
        <View style={[styles.row, styles.spaceItem]}>
          <TextCus body2 medium useI18n>
            route
          </TextCus>
          <View style={styles.w50}>
            <TextCus textAlign={'right'} body2 medium mainLightColor>
              {ticketOne?.route}
            </TextCus>
          </View>
        </View>
        <View style={[styles.row, styles.spaceItem, styles.mt8]}>
          <TextCus body2 medium useI18n>
            pay_method
          </TextCus>
          <TextCus body2>{ticketOne?.pay_method}</TextCus>
        </View>
        <View style={[styles.row, styles.spaceItem, styles.mt8]}>
          <TextCus body2 medium useI18n>
            amount
          </TextCus>
          <TextCus body2>{ticketOne?.amount}</TextCus>
        </View>
        <View style={[styles.row, styles.spaceItem, styles.mt8]}>
          <TextCus body2 medium useI18n>
            referral_fee
          </TextCus>
          <TextCus body2>{ticketOne?.referral_fee}</TextCus>
        </View>
        <View style={[styles.rightItem, styles.mt8]}>
          <TouchCus
            style={[
              styles.btnRecevie,
              styles.btnAction,
              styles.radius4,
              styles.cenItemvh,
            ]}
            onPress={() => {}}>
            <TextCus whiteColor body2 medium useI18n>
              receive_now
            </TextCus>
          </TouchCus>
        </View>
      </View>
    </View>
  );
}

export interface ICardTicket {
  style?: any;
  ticketOne: IItemTicketOne;
}
