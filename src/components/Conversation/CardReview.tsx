import {TextCus} from 'components';
import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';
import Icon from 'assets/svg/Icon';
import {Colors} from 'theme';
import {getWidth} from 'utils';

export function CardReview(props: ICardReview) {
  const {amount, style} = props;
  const [rateAmount, setRateAmount] = useState(-1);

  useEffect(() => {
    setRateAmount(amount);
  }, []);

  const itemDivider = () => {
    return <View style={getWidth(2)} />;
  };

  return (
    <View style={[style, styles.pending, styles.radius95]}>
      <View style={[styles.row]}>
        <FlatList
          horizontal
          data={[...Array(5)]}
          scrollEnabled={false}
          ItemSeparatorComponent={itemDivider}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <View key={item}>
              {Icon.Favorite({
                color: index <= rateAmount - 1 ? Colors.main : Colors.white,
              })}
            </View>
          )}
        />
        <TextCus overline whiteColor ml-8>
          {amount}
        </TextCus>
      </View>
    </View>
  );
}

export interface ICardInfo {
  style?: any;
  amount?: number;
}
