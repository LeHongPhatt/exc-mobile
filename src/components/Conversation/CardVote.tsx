import {TextCus} from 'components/TextCus';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Divider} from 'react-native-paper';
import {IItemVote} from 'types';
export function CardVote(props: ICardVote) {
  const {title, subtitle, children, votes, style} = props;

  const renderVote = ({name, qty}: IItemVote) => (
    <View
      key={name}
      style={[
        styles.row,
        styles.spaceItem,
        styles.cenItem,
        styles.voteItem,
        styles.radius4,
        styles.pH16,
        styles.mb8,
      ]}>
      <TextCus>{name}</TextCus>
      <TextCus>{`x${qty}`}</TextCus>
    </View>
  );

  return (
    <View
      style={[styles.wrapCardInfo, styles.wrapShadow, styles.radius8, style]}>
      {(!!title || !!subtitle) && (
        <View style={[styles.padTitle, styles.cenItemvh]}>
          {title && (
            <TextCus mainLightColor body2 medium>
              {title}
            </TextCus>
          )}
          {subtitle && <TextCus>{subtitle}</TextCus>}
        </View>
      )}
      <Divider />
      <View style={styles.padContent}>{children}</View>
      <View style={styles.p12}>
        {!!votes.length && votes.map(e => renderVote(e))}
      </View>
    </View>
  );
}

export interface ICardVote {
  style?: any;
  title?: any;
  subtitle?: any;
  children: ReactNode;
  votes: IItemVote[];
}
