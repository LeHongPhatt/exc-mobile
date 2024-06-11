import React from 'react';
import {View, FlatList} from 'react-native';
import {ICardProfile} from 'types';
import {TouchCus, TextCus} from 'components';
import {styleSpacing, getHeight} from 'utils';
import styles from './styles';
import {Divider} from 'react-native-paper';

const CardItem = ({data}: ICardProfile) => {
  const itemDivider = () => {
    return <Divider style={[getHeight(1), styles.divider]} />;
  };

  const renderItem = (item: any) => {
    return (
      <TouchCus onPress={() => item?.onPress?.()}>
        <View
          style={[
            styles.row,
            styles.cenItem,
            styleSpacing('px-16'),
            styleSpacing('py-12'),
          ]}>
          {item?.icon}
          <TextCus medium body2 ml-12>
            {item?.title}
          </TextCus>
        </View>
      </TouchCus>
    );
  };

  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      ItemSeparatorComponent={itemDivider}
      renderItem={({item}) => renderItem(item)}
    />
  );
};

export default CardItem;
