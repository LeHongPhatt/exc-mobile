import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';
import {IItemImage} from 'types';
import Emotions from 'assets/svg/Emotions';
import {emotionsDefault, getPaddingHorizontal, getPaddingVertical} from 'utils';
import {ImageCus, TouchCus, TextCus} from 'components';

export function CardImage(props: ICardImage) {
  const {cardImage, style, onSelectImage} = props;

  const renderEmotion = () => {
    return (
      <View style={styles.row}>
        {emotionsDefault.map(e => (
          <View style={styles.ml4} key={e}>
            {Emotions?.[`${e}`]({}) ?? null}
          </View>
        ))}
      </View>
    );
  };

  const renderImageItem = (item: any, index) => (
    <View key={item} style={[styles.flex, styles.margin2]}>
      <TouchCus onPress={() => onSelectImage?.(index)}>
        <ImageCus
          style={[styles.flex, styles.wrapCardImg, styles.radius4]}
          source={item}
        />
      </TouchCus>
    </View>
  );

  const renderCard = useCallback(
    () => (
      <View style={[styles.rightItem]}>
        <View
          style={[
            getPaddingHorizontal(8),
            getPaddingVertical(8),
            styles.wrapCardInfo,
            styles.wrapMaxTicket,
            styles.wrapShadow,
            styles.radius8,
            style,
          ]}>
          <FlatList
            data={cardImage?.images}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            renderItem={({item, index}) => renderImageItem(item, index)}
          />
          {cardImage?.comment && (
            <View style={styles.mt4}>
              <TextCus caption1>{cardImage?.comment}</TextCus>
            </View>
          )}
          {cardImage?.time && (
            <View style={styles.mt4}>
              <TextCus label2 bgInput>
                {cardImage?.time}
              </TextCus>
            </View>
          )}
        </View>
      </View>
    ),
    [],
  );

  return (
    <View>
      {renderCard()}
      <View style={styles.wrapEmotion}>
        <View style={styles.row}>
          <View style={[styles.row, styles.wrapGroupEmo, styles.radius37]}>
            {renderEmotion()}
            <TextCus style={styles.ml4}>12</TextCus>
          </View>
          <TouchCus style={styles.ml8} onPress={() => {}}>
            <Emotions.Like />
          </TouchCus>
        </View>
      </View>
    </View>
  );
}

export interface ICardImage {
  style?: any;
  cardImage: IItemImage;
  showAction?: boolean;
  onSelectImage?: (number) => void;
}
