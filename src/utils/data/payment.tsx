import {Images} from 'assets';
import {EnumPaymentType} from '../enum';
import {IBank, IRechargeMethod} from 'types';

export const paymentMethod = [
  {id: 1, title: 'Chuyển xu', data: EnumPaymentType.COIN},
  {id: 2, title: 'Tiền mặt', data: EnumPaymentType.CASH},
];

export const rechargeMethod: IRechargeMethod[] = [
  {
    id: 1,
    title: 'Chuyển khoản ngân hàng',
    subtitle: 'Tiếp tục để nhận hướng dẫn và thông tin ngân hàng',
    icons: [Images.ic_vietcombank, Images.ic_viettinbank],
  },
  {
    id: 2,
    title: 'Thẻ Visa, thẻ Master, thẻ JCB',
    subtitle: 'Nhập thông tin thẻ để tiến hành thanh toán qua cổng Stripe.',
    icons: [Images.ic_visa, Images.ic_master_card, Images.ic_jcb],
  },
  {
    id: 3,
    title: 'ATM',
    subtitle: 'Sử dụng thẻ ATM thanh toán qua cổng VNPT EPAY.',
    icons: [Images.ic_napas],
  },
  {
    id: 4,
    title: 'AlePay',
    subtitle: 'Sử dụng thẻ thanh toán quốc tế để thanh toán qua cổng AlePay.',
    icons: [Images.ic_alepay],
  },
  {
    id: 5,
    title: 'ZaloPay',
    subtitle: 'Thanh toán bằng cổng thanh toán Zalopay',
    icons: [Images.ic_zalopay],
  },
  {
    id: 6,
    title: 'Momo',
    subtitle: 'Thanh toán bằng ví điện tử Momo',
    icons: [Images.ic_momo],
  },
];

export const banks: IBank[] = [
  {
    id: 1,
    shortName: 'Vietcombank',
    name: 'Ngân hàng thương mại cổ phần Ngoại thương Việt Nam',
    image: Images.logo_vietcombank,
    accountName: 'CÔNG TY CP TM VÀ DỊCH VỤ EXC-GO',
    accountNumber: '98888 888888 88888',
    branch: 'Hội sở - Hà Nội',
  },
  {
    id: 2,
    shortName: 'Vietinbank',
    name: 'Ngân hàng TMCP Công Thương Việt Nam',
    image: Images.logo_vietinbank,
    accountName: 'CÔNG TY CP TM VÀ DỊCH VỤ EXC-GO',
    accountNumber: '98888 888888 88888',
    branch: 'Hội sở - Hà Nội',
  },
];

export const COPY_CONTENT: string =
  'Sao chép nội dung chuyển khoản bên dưới và thực hiện thanh toán chuyển khoản. Quá trình nạp điểm sẽ hoàn tất khi đã chuyển khoản và bấm “Hoàn tất”.';

export const NOTICE_1: string =
  'Chuyển tiền trong cùng hệ thống ngân hàng sẽ nhanh chóng hơn. Việc nạp Điểm chỉ hoàn tất sau khi chuyển khoản hoàn tất và chúng tôi đã nhận được.';

export const NOTICE_2: string =
  'Vào thứ 7 và chủ nhật, hình thức chuyển khoản thường sẽ được ngân hàng xử lý vào đầu tuần tiếp theo. Vì vậy hãy lựa chọn hình thức chuyển khoản nhanh hoặc đổi sang phương thức thanh toán khác để hoàn thành quá trình nạp điểm';
