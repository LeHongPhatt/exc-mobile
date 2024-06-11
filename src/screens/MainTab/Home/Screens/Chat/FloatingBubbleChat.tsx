import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {HomeLayout, IconCus, ImageCus, TextCus, TouchCus} from 'components';
import {Bubble, FloatingBubble} from 'react-native-floating-bubble';

import {Colors} from 'theme';

const FloatingBubbleChat = () => {
  return (
    <HomeLayout statusBarMode={'dark-content'} bgColor={Colors.main}>
      <View style={styles.container}>
        <FloatingBubble
          openCloseDuration={200}
          bubbleSize={60}
          showDot={true}
          dotSize={12}
          bubbleColor={'blue'}
          onPress={() => console.log('Bubble Pressed')}>
          <Bubble
            onPress={() => console.log('Inner Bubble Pressed')}
            text="Click me!"
            bubbleSize={40}
            bubbleColor={'red'}
            textColor={'white'}
          />
        </FloatingBubble>
      </View>
    </HomeLayout>
  );
};
export default FloatingBubbleChat;
