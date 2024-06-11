import {TextCus, TouchCus} from 'components';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {getWidth, paymentMethod, styleSpacing} from 'utils';
import {Control, useWatch} from 'react-hook-form';
import {IItemFormCreateTicket} from 'types';

const PaymentSelected = (props: IPaymentSelectedProps) => {
  const {control, onCancelSelect, onConfirmSelect} = props;

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const paymentType = useWatch({control, name: 'paymentType'});

  useEffect(() => {
    const index = paymentMethod.indexOf(initPaymentType());
    setSelectedIndex(index);
  }, []);

  const initPaymentType = () => {
    const filterType = paymentMethod.filter(e => e.data === paymentType);
    return filterType[0];
  };

  return (
    <View>
      <View style={[styles.cenItem, styleSpacing('p-12')]}>
        <TextCus medium style={[styles.fs16, styles.lh24]}>
          Chọn hình thức thanh toán
        </TextCus>
      </View>
      <View>
        {paymentMethod.map((e, index) => (
          <TouchCus key={e.id} onPress={() => setSelectedIndex(index)}>
            <View
              style={[
                styles.cenItem,
                styleSpacing('py-12'),
                selectedIndex === index
                  ? styles.wrapSelected
                  : styles.wrapUnselected,
              ]}>
              <TextCus
                useI18n
                mainLightColor={selectedIndex === index}
                bgInput={selectedIndex !== index}>
                {e.data}
              </TextCus>
            </View>
          </TouchCus>
        ))}
      </View>
      <View
        style={[
          styles.row,
          styles.cenItem,
          styleSpacing('mx-16'),
          styleSpacing('my-13'),
        ]}>
        <TouchCus
          onPress={() => {
            const index = paymentMethod.indexOf(initPaymentType());
            setSelectedIndex(index);
            onCancelSelect();
          }}
          style={styles.btnCancel}>
          <TextCus medium body2 whiteColor>
            Hủy
          </TextCus>
        </TouchCus>
        <View style={getWidth(8)} />
        <TouchCus
          onPress={() =>
            selectedIndex !== -1 &&
            onConfirmSelect(paymentMethod[selectedIndex])
          }
          style={[styles.btnChoose]}>
          <TextCus medium body2 whiteColor>
            Chọn
          </TextCus>
        </TouchCus>
      </View>
    </View>
  );
};

export default PaymentSelected;

interface IPaymentSelectedProps {
  control: Control<IItemFormCreateTicket>;
  onCancelSelect: () => void;
  onConfirmSelect: (value) => void;
}
