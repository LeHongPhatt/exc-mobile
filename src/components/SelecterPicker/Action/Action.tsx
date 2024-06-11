import {TextCus, TouchCus} from 'components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'theme';
import {getWidth} from 'utils';

interface Props {
  onCancelSelect: () => void;
  onChooseSelect: () => void;
}
const Action: React.FC<Props> = ({onCancelSelect, onChooseSelect}) => {
  return (
    <View style={styles.container}>
      <TouchCus onPress={onCancelSelect} style={styles.btn}>
        <TextCus useI18n medium body2>
          Hủy
        </TextCus>
      </TouchCus>
      <View style={getWidth(8)} />
      <TouchCus
        onPress={onChooseSelect}
        style={[styles.btn, {backgroundColor: Colors.mainLight}]}>
        <TextCus useI18n medium body2 whiteColor>
          Chọn
        </TextCus>
      </TouchCus>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 13,
    paddingHorizontal: 14,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.disabled,
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 10,
    display: 'flex',
  },
});
export default Action;
