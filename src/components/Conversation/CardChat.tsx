import {TextCus} from 'components/TextCus';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {TouchCus} from 'components/TouchCus';
import Emotions from 'assets/svg/Emotions';
import {emotionsDefault, EnumPosition, showImgSrc, width} from 'utils';
import {ImageCus} from 'components';
import {Images} from 'assets';

export function CardChat(props: ICardChat) {
  const {
    message,
    position = EnumPosition.L,
    showEmotions = false,
    activeText = false,
    avatar,
    matched = false,
    style,
    images,
    box_chat,
  } = props;

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

  const renderCard = useCallback(
    () => (
      <View
        style={[
          activeText ? styles.wrapCardOwner : styles.wrapCardInfo,
          matched ? styles.wrapMatched : null,
          styles.wrapMaxChat,
          styles.wrapShadow,
          styles.radius8,
          style,
        ]}>
        {message && (
          <View style={[styles.padTitle, styles.spaceItem, styles.row]}>
            <TextCus>{message}</TextCus>
          </View>
        )}

        {/* {box_chat && <TextCus>{box_chat}</TextCus>} */}

        {images?.length > 0 && (
          <ImageCus
            source={{
              uri: 'http://103.90.233.56:3030/image/' + images[0].image_path,
            }}
            style={{width: 70, height: 100, borderRadius: 3}}
          />
        )}
        {showEmotions && (
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
        )}
        {box_chat && (
          <View style={{flex: 1, width: width / 2 + 100}}>{box_chat}</View>
        )}
      </View>
    ),
    [matched, activeText],
  );

  return (
    <View
      style={[position === EnumPosition.L ? styles.topItem : styles.rightItem]}>
      <View style={styles.row}>
        {position === EnumPosition.L && (
          <ImageCus
            source={showImgSrc('', avatar, Images.driver)}
            style={[styles.wrapImg, styles.mt12, styles.mr8]}
          />
        )}
        {renderCard()}
      </View>
    </View>
  );
}

export interface ICardChat {
  style?: any;
  message: string;
  position?: EnumPosition;
  showEmotions?: boolean;
  activeText?: boolean;
  avatar?: string;
  matched?: boolean;
  images?: any;
  box_chat?: any;
}
