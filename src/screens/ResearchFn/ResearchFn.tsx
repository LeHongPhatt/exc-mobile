import React, {useState} from 'react';
import {Button, Text} from 'react-native';
import {BottomSheetModals} from 'components';

const ResearchFn = () => {
  // renders
  const [show, setShow] = useState(true);
  return (
    <>
      <Button title="Close Sheet" onPress={() => setShow(true)} />
      {show && (
        <BottomSheetModals
          type="success"
          onOk={() => {}}
          onClose={() => setShow(false)}
          titleBtn="Bắt đầu ngay"
          title="Đăng ký thành công"
          subtitle="Chào mừng bạn đã đến và trải nghiệm cùng
EXC">
          <Text>Awesome 🎉</Text>
        </BottomSheetModals>
      )}
    </>
  );
};

export default ResearchFn;
