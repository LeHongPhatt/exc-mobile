import {Images} from 'assets';
import Emotions from 'assets/svg/Emotions';
import {ImageCus} from 'components';
import {TextCus} from 'components/TextCus';
import {TouchCus} from 'components/TouchCus';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {EAction, IItemTicket} from 'types';
import {
  emotionsDefault,
  getPaddingVertical,
  getWidth,
  showImgSrc,
  styleSpacing,
} from 'utils';
import styles from './styles';

const RIGHT = -200;
const RIGHT_ACTIVE = 170;

export function CardTicket(props: ICardTicket) {
  const {
    ticket,
    submitReact,
    showAction = true,
    style,
    onChat,
    onPick,
    ownerId,
    driverId,
    onEdit,
    onCancel,
    onShowDetail,
    image,
    isOwner = false,
  } = props;

  const [right, setRight] = useState(RIGHT);
  const [reactions, setReactions] = useState(ticket?.reactions || []);
  // console.log(
  //   '===============ticket--reactions=================',
  //   ticket?.id,
  //   ticket,
  // );
  const renderEmotion = useCallback(
    (key = '') => {
      const uniqeReactions = reactions.filter((react, index) => {
        return index === reactions.findIndex(item => react.icon === item.icon);
      });
      switch (key) {
        case EAction.REACT:
          return (
            <View style={[styles.row, styles.cenItem]}>
              {emotionsDefault.map(icon => (
                <TouchCus
                  onPress={() => {
                    setRight(RIGHT);
                    submitReact?.({icon, id: ticket?.id});
                    setReactions([...reactions, {icon, user: [ownerId]}]);
                  }}
                  style={styles.ml4}
                  key={icon}>
                  {Emotions?.[`${icon}`]({width: 24, height: 24}) ?? null}
                </TouchCus>
              ))}
            </View>
          );

        default:
          return (
            <View style={[styles.row, styles.cenItem]}>
              {uniqeReactions.map((react, i) => (
                <View style={styles.ml4} key={i}>
                  {Emotions?.[`${react?.icon}`]({}) ?? null}
                </View>
              ))}
            </View>
          );
      }
    },
    [reactions],
  );

  const renderCard = useCallback(
    () => (
      <View>
        <TouchCus onPress={() => onShowDetail?.()}>
          <View
            style={[
              isOwner ? styles.wrapCardOwner : styles.wrapCardInfo,
              styles.wrapMaxTicket,
              styles.wrapShadow,
              styles.radius8,
              style,
            ]}>
            <View style={[styles.padTitle, styles.spaceItem, styles.row]}>
              <View style={[styles.flex, styleSpacing('mr-8')]}>
                {ticket?.owner_id && (
                  <TextCus mainLightColor body2 medium>
                    {ticket?.owner?.full_name ?? ''}
                  </TextCus>
                )}
              </View>
              <View>
                {ticket?.status && (
                  <View
                    style={[
                      styles.btnStatus,
                      styles.radius37,
                      ticket?.status === EAction.RECEIVED
                        ? styles.recevied
                        : styles.pending,
                    ]}>
                    <TextCus whiteColor label2 medium useI18n>
                      {ticket?.status}
                    </TextCus>
                  </View>
                )}
              </View>
            </View>
            <View style={[styles.row, styles.spaceItem, styles.padItemContent]}>
              <TextCus body2 medium useI18n>
                route
              </TextCus>
              <View style={styles.w50}>
                <TextCus textAlign={'right'} body2>
                  {ticket?.name}
                </TextCus>
              </View>
            </View>
            <View style={[styles.row, styles.spaceItem, styles.padItemContent]}>
              <TextCus body2 medium useI18n>
                pay_method
              </TextCus>
              <TextCus body2 useI18n>
                {ticket?.payment_type}
              </TextCus>
            </View>
            <View style={[styles.row, styles.spaceItem, styles.padItemContent]}>
              <TextCus body2 medium useI18n>
                amount
              </TextCus>
              <TextCus body2>{ticket?.amount}</TextCus>
            </View>
            <View style={[styles.row, styles.spaceItem, styles.padContent]}>
              <TextCus body2 medium useI18n>
                discount
              </TextCus>
              <TextCus body2>{ticket?.commission}</TextCus>
            </View>
            <View style={[styles.row, styles.spaceItem, styles.padContent]}>
              {showAction && (
                <TouchCus
                  style={[
                    isOwner ? styles.pending : styles.btnRecevie,
                    styles.btnAction,
                    styles.radius4,
                    styles.cenItemvh,
                    styles.flex,
                  ]}
                  onPress={() => (isOwner ? onEdit?.() : onPick?.())}>
                  <TextCus whiteColor body2 medium useI18n>
                    {isOwner ? 'edit' : 'receive_now'}
                  </TextCus>
                </TouchCus>
              )}
              <View style={getWidth(8)} />
              {showAction && isOwner && (
                <TouchCus
                  style={[
                    isOwner ? styles.btnRecevie : styles.pending,
                    styles.btnAction,
                    styles.radius4,
                    styles.cenItemvh,
                    styles.flex,
                  ]}
                  onPress={() => onCancel?.()}>
                  <TextCus whiteColor body2 medium useI18n>
                    cancel_drive
                  </TextCus>
                </TouchCus>
              )}
              {!isOwner &&
                (ownerId === driverId || (!driverId && showAction)) && (
                  <TouchCus
                    style={[
                      isOwner ? styles.btnRecevie : styles.pending,
                      styles.btnAction,
                      styles.radius4,
                      styles.cenItemvh,
                      styles.flex,
                    ]}
                    onPress={() => (isOwner ? onCancel?.() : onChat?.())}>
                    <TextCus whiteColor body2 medium useI18n>
                      chat
                    </TextCus>
                  </TouchCus>
                )}
            </View>
            {ticket?.time && (
              <View style={[styles.row, styles.spaceItem, styles.padContent]}>
                <TextCus body2>{ticket?.time}</TextCus>
              </View>
            )}
          </View>
        </TouchCus>
        <View style={styles.wrapEmotion}>
          <View style={[styles.row, styles.cenItem]}>
            {!!reactions.length && (
              <View
                style={[
                  styles.row,
                  styles.wrapGroupEmo,
                  styles.radius37,
                  styles.wrapShadow,
                  styleSpacing('py-2'),
                ]}>
                {renderEmotion()}
                <TextCus style={styles.ml4}>{reactions.length}</TextCus>
              </View>
            )}
            <View>
              {ticket.owner_id !== ownerId && (
                <View
                  style={[styles.posAbsolute, styles.wrapPosReact, {right}]}>
                  <View
                    style={[
                      styles.wrapReact,
                      styles.wrapShadow,
                      styles.radius37,
                      getPaddingVertical(2),
                    ]}>
                    {renderEmotion(EAction.REACT)}
                  </View>
                </View>
              )}
              <TouchCus
                onLongPress={() =>
                  ticket.owner_id !== ownerId && setRight(RIGHT_ACTIVE)
                }
                style={styles.ml8}
                onPress={() => {
                  right === RIGHT_ACTIVE && setRight(RIGHT);
                }}>
                {Emotions.LikeAction({width: 24, height: 24})}
              </TouchCus>
            </View>
          </View>
        </View>
      </View>
    ),
    [ticket, reactions, right],
  );

  return (
    <View style={isOwner ? styles.rightItem : styles.topItem}>
      <View style={[styles.row]}>
        {!isOwner && (
          <ImageCus
            source={showImgSrc('', image, Images.driver)}
            style={[styles.wrapImg, styles.mr8, style]}
          />
        )}
        {renderCard()}
      </View>
    </View>
  );
}

export interface ICardTicket {
  style?: any;
  ticket: IItemTicket;
  image?: any;
  ownerId?: string;
  driverId?: string;
  showAction?: boolean;
  isOwner?: boolean;
  onPick?: () => void;
  onChat?: () => void;
  submitReact?: (a: any) => void;
  onEdit?: () => void;
  onCancel?: () => void;
  onShowDetail?: () => void;
}
