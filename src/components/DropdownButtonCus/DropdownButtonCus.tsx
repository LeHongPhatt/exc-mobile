import React, {useRef, useState, useEffect} from 'react';
import {View, ViewStyle} from 'react-native';
import {IDropdownOption} from 'types';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'assets/svg/Icon';
import {styleSpacing} from 'utils';
import {Colors} from 'theme';
import styles from './styles';

const DropdownButtonCus = (props: IDropdownButtonCus) => {
  const {
    style,
    data = [],
    onSelect,
    initValue,
    defaultButtonText,
    buttonTextAfterSelection,
    rowTextForSelection,
    buttonStyle,
    buttonTextStyle,
    renderDropdownIcon,
    dropdownIconPosition,
    rowTextStyle,
  } = props;
  const {dropdownButtonRef} = useRef();
  const [isSelected, setIsSelected] = useState(false);
  const [defaultValue, setDefaultValue] = useState();

  useEffect(() => {
    if (initValue) {
      setIsSelected(true);
      setDefaultValue(initValue);
    }
  }, []);

  return (
    <View style={style}>
      <SelectDropdown
        ref={dropdownButtonRef}
        data={data}
        showsVerticalScrollIndicator={false}
        onSelect={(selectedItem, index) => {
          setIsSelected(true);
          onSelect?.(selectedItem, index);
        }}
        defaultButtonText={defaultButtonText}
        defaultValue={defaultValue}
        buttonTextAfterSelection={(selectedItem, index) => {
          buttonTextAfterSelection?.(selectedItem, index);
          if (typeof selectedItem === 'string') {
            return selectedItem;
          }
          return selectedItem?.title;
        }}
        rowTextForSelection={(item, index) => {
          rowTextForSelection?.(item, index);
          if (typeof item === 'string') {
            return item;
          }
          return item?.title;
        }}
        buttonStyle={[
          styles.dropdownBtn,
          styles.txtAlignLeft,
          styleSpacing('px-0'),
          buttonStyle,
        ]}
        buttonTextStyle={[
          styles.txtDef,
          styles.txtAlignLeft,
          styleSpacing('mx-10'),
          isSelected ? undefined : {color: Colors.border},
          buttonTextStyle,
        ]}
        renderDropdownIcon={() =>
          renderDropdownIcon ?? (
            <View style={styleSpacing('mr-10')}>
              {Icon.ChevronDown({color: Colors.border})}
            </View>
          )
        }
        dropdownIconPosition={dropdownIconPosition ?? 'right'}
        dropdownStyle={styles.dropdownDef}
        rowStyle={styles.dropdownRow}
        rowTextStyle={[styles.txtDef, rowTextStyle]}
      />
    </View>
  );
};

export interface IDropdownButtonCus {
  style?: ViewStyle;
  data?: (string | IDropdownOption)[];
  onSelect?: (any, number) => void;
  initValue?: any;
  defaultButtonText?: string | undefined;
  buttonTextAfterSelection?: (any, number) => void;
  rowTextForSelection?: (any, number) => void;
  buttonStyle?: any;
  buttonTextStyle?: any;
  renderDropdownIcon?: any;
  dropdownIconPosition?: string;
  rowTextStyle?: any;
}

export default DropdownButtonCus;
