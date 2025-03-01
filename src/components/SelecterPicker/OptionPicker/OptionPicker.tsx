import React, {useEffect, useState} from 'react';
import {ScrollPicker} from 'components';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'theme';
import {ISelectOption, TArrayGender} from 'types';
interface Props {
  dataOptions: TArrayGender | string[] | number[];
  selectedOption: ISelectOption;
  setSelectedOption: React.Dispatch<React.SetStateAction<any>>;
}
const OptionPicker: React.FC<Props> = ({
  dataOptions,
  selectedOption,
  setSelectedOption,
}) => {
  const [selectedOptionPicker, setSelectedOptionPicker] = useState({
    index: selectedOption?.index ?? 1,
    data: selectedOption?.data ?? 'Nữ',
  });
  useEffect(() => {
    setSelectedOption(selectedOptionPicker);
  }, [selectedOptionPicker, setSelectedOption]);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollPicker
          dataSource={dataOptions}
          selectedIndex={selectedOptionPicker.index}
          selectedData={selectedOptionPicker.data}
          onValueChange={(data, selectedIndex) => {
            setSelectedOptionPicker({
              data,
              index: selectedIndex,
            });
          }}
          wrapperWidth={'30%'}
          itemHeight={48}
          highlightColor={Colors.transparent}
          highlightBorderWidth={2}
          wrapperBackground={Colors.transparent}
          wrapperActiveBackground={Colors.gunPowder}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  content: {
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.transparent,
  },
});
export default React.memo(OptionPicker);
