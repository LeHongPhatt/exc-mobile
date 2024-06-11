import {ReactNode} from 'react';
import {IFormImgData, IUser} from './user';

/**
 * @description the interface of user authentication entity
 * @export
 * @interface IAppState
 */
export interface IAppState {
  loading: boolean;
  language: string;
  error: string | null;
  isAuth: boolean;
  user?: IUser | null;
  profile?: any[] | null;
  accessToken?: string | null;
}

export interface IDriverState {
  loading: boolean;
  error: string | null;
  list?: any[] | null;
  listDetail?: any[] | null;
  listUser?: any[] | null;
  listSearch?: any[] | null;
}

export interface INewsState {
  loading: boolean;
  error: string | null;
  newsList?: any[] | null;
  newsDetail?: any[] | null;
}

export interface ITransactionState {
  loading: boolean;
  error: string | null;
}

export interface IStatisticState {
  loading: boolean;
  error: string | null;
}

export interface IAccountState {
  loading: boolean;
  error: string | null;
}

export interface IPayloadHome {
  isObject?: boolean;
  redirect?: boolean;
  isPaginate?: boolean;
  formData?: any; // IParamsRequest;
  dataKey?: keyof IAppState | keyof IDriverState | keyof INewsState;
  isPagination?: boolean;
  type?: string | undefined | null;
  endPoint?: string;
  headers?: any;
  isFormData?: boolean;
}
export interface IDataResponse {
  errorCode?: string;
  message?: string;
  result: any[];
}

export interface IResponse {
  status: number;
  data: IDataResponse;
  errorMessage: '';
}

export type ICallback = (results: IResponse) => void;

export interface IHomeActionPayload {
  payload: IPayloadHome;
  callback?: ICallback;
}

export enum ELanguage {
  VI = 'vi',
  EN = 'en',
}
export interface IHomeState {
  listSlider: any;
  newsGroup?: any;
  listProject?: IProjectItem[];
  contacts?: any;
  contactEmp?: any;
  countBadget: number;
  loading?: boolean;
  visibleBanner?: boolean;
  error?: string | null;
}

export interface IProjectItem {
  address?: string; //'Số 16  Đường Nguyễn Đức Thuận, Phường 13, Quận Tân Bình, Thành phố Hồ Chí Minh, Việt Nam';
  area?: number; //10000;
  cityname?: string; //'79';
  contactaddress?: string; //'16 Nguyễn Đức Thuận , P.13, Q. Tân Bình, TP.HCM';
  contactemail?: string; //'crm@diyassky.vn';
  handoverdate?: string; //'2021-09-15T00:00:00';
  highlights?: string; //'<b>DIYAS (Do It Yourself Alliances) – </b>Cộng đồng liên minh DIY 4.0 là nơi hội tụ của những người trẻ đam mê DIY để cùng nhau xây dựng và phát triển bầu trời sáng tạo riêng một cách bài bản, có đầu tư và có được một cộng đồng cùng chung đam mê, sở thích và có thể tự chủ tài chính với hình thức kinh doanh trí tuệ.<div><b>DIYAS (Do It Yourself Alliances) –&nbsp;</b>Cộng đồng liên minh DIY 4.0 là nơi hội tụ của những người trẻ đam mê DIY để cùng nhau xây dựng và phát triển bầu trời sáng tạo riêng một cách bài bản, có đầu tư và có được một cộng đồng cùng chung đam mê, sở thích và có thể tự chủ tài chính với hình thức kinh doanh trí tuệ.<br></div><div><b>DIYAS (Do It Yourself Alliances) –&nbsp;</b>Cộng đồng liên minh DIY 4.0 là nơi hội tụ của những người trẻ đam mê DIY để cùng nhau xây dựng và phát triển bầu trời sáng tạo riêng một cách bài bản, có đầu tư và có được một cộng đồng cùng chung đam mê, sở thích và có thể tự chủ tài chính với hình thức kinh doanh trí tuệ.<br></div>';
  hotline?: string; //'0889 258 268';
  investname?: string; //'CÔNG TY CỔ PHẦN PHÁT TRIỀN NHÀ STUDIO DIYAS';
  latitude?: number; // 10.8070319;
  longitude?: number; // 106.640253;
  project?: string; //'DIY';
  projectdesc?: string; //'<span style="color: rgb(0, 0, 0); font-family: Roboto, &quot;Helvetica Neue&quot;, helvetica, arial, verdana, sans-serif; font-size: 12px;">A​</span><font face="Roboto, Helvetica Neue, helvetica, arial, verdana, sans-serif">MÓN QUÀ TÂM HUYẾT CỦA C.T GROUP</font><div style=""><font face="Roboto, Helvetica Neue, helvetica, arial, verdana, sans-serif">Dành cho giới trẻ</font></div><div style=""><font face="Roboto, Helvetica Neue, helvetica, arial, verdana, sans-serif">Dự án DIYAS đầu tiên mang tên DIYAS SKY – nói về một bầu trời mới của Liên minh các cộng đồng DIY, để cho ra sản phẩm đầu tiên giao ngay ở khu vực Tân Bình. DIYAS SKY là giải pháp nhà ở dành cho giới trẻ tài năng, sáng tạo và là dự án tiên phong cuộc cách mạng nhà 4.0</font></div><div style=""><font face="Roboto, Helvetica Neue, helvetica, arial, verdana, sans-serif">C.T Group cũng liên tục xây dựng 20.000 căn DIYAS khác trong năm 2021 dọc theo tuyến Metro số 2 để tạo thuận lợi cho giới trẻ đi làm việc và tăng hiệu quả của phương tiện giao thông công cộng như tàu điện ngầm.</font></div>';
  projectname?: string; //'DỰ ÁN CĂN HỘ DIY 4.0';
  projecttype?: string; //'02';
  quantity?: number; //365;
  shortname?: string; //'DIYAS SKY';
  startdate?: string; //'2020-01-01T00:00:00';
  taxcode?: string; //'000190910';
  timemode?: string; //'50';
  timemodedesc?: string; //'50 năm';
  typename?: string; //'Sở hữu 30 năm';
  utilities?: string; //'<div style=""><font face="Roboto, Helvetica Neue, helvetica, arial, verdana, sans-serif">Hàng ngàn căn hộ DIY nhiều sắc màu cá tính thể hiện phong cách của từng chủ nhân tạo nên DIYAS SKY như một khu triển lãm nghệ thuật độc đáo về phong cách sống của giới trẻ ngày nay. Diyas Sky được ví như một khu vườn thần tiên ươm ước mơ của các start up sáng tạo trẻ. Trong DIYAS, các bạn trẻ sẽ tự sáng tạo nên môi trường sống theo thiết kế vườn startup, tăng cường giao lưu kết nối. Vớikhông gi an startup trải rộng từ những mô hình nghiên cứu công nghệ cao, đến quán cà phê DIY, shop thời trang, công ty design, mô hình kinh doanh AirBnB, Homestay, hay mua nhà và decor để bán lại… Tất cả sẽ được hiện thực hoá tại chính căn nhà của bạn, mà không bị giới hạn sự sáng tạo.</font></div><div style=""><font face="Roboto, Helvetica Neue, helvetica, arial, verdana, sans-serif"><br></font></div><div style=""><font face="Roboto, Helvetica Neue, helvetica, arial, verdana, sans-serif">Đến với DIYAS các bạn trẻ được trải nghiệm DIYAS LAB nơi có đầy đủ trang thiết bị, dụng cụ giúp các bạn thỏa sức sáng tạo làm ra những sản phẩm mà mình yêu thích. Ngoài ra, với cộng đồng liên minh 4.0 DIYAS các bạn có thể lan tỏa, giới thiệu thành phẩm xuất sắc của mình. DIYAS LAB 4.0 đầy đủ trang thiết bị, dụng cụ chuyên dụng hiện đại được nhập khẩu từ Ý như máy in 3D, máy cắt laser, các loại cưa mài cắt cầm tay… dành cho các cư dân trẻ sống tại dự án, các bạn có thể sử dụng tất cả các thiết bị, dụng cụ trong không gian này mà không phải tốn phí, cùng sự hỗ trợ đến từ đội ngũ hỗ trợ kỹ thuật chuyên nghiệp 24/7. Hiện tại, DIYAS LAB 4.0 đang mở cửa theo khung giờ từ 7h30 tới 21h00.</font></div>';
  website?: string; //'https://diyassky.com/';
}

export interface INewsState {
  newsList?: [];
  newsImgList?: [];
  newsListRelated?: [];
  eventList?: [];
  eventListRelated?: [];
  pomList?: [];
  pomListRelated?: [];
  loading?: boolean;
  error?: string | null;
  eventPomCheck?: any;
  listPin?: any;
  listPinAdmin?: any;
  listUnPin?: any;
}

/**
 * @description the interface of user login entity
 * @export
 * @interface IFormDataLogin
 */
export interface IFormDataLogin {
  phoneNumber?: string;
  email?: string;
  otpCode?: string;
  typeCheck?: string;
  password?: string;
  rePassword?: string;
  confirmPassword?: string;
}

export interface IFormVerifyOTP {
  phoneNumber: string;
  otpCode: string;
  typeCheck: string;
}
export interface IUserKYC {
  avatar?: string;
  fullName: string;
  phone: string;
  email?: string;
  accountBank?: string;
  identificationFront?: string;
  identificationBack?: string;
  licenseFront?: string;
  licenseBack?: string;
  birthday?: string;
  address?: string;
}

export interface IFormLoginNonePass {
  phonenumber: string;
  secKey: string;
  captcha: string;
  newPassword?: string;
  route?: string;
  refreshToken?: string;
}

export interface IFormLoginGuest {
  secKey: string;
  phonenumber?: string; //'',
  password?: string; //'',
  mail?: string; //BaseSetting.EMAIL_GUEST,
  captcha?: string; //'',
  token?: string; //BaseSetting.TOKEN,
}

export interface IFormForgotPassword {
  email?: string;
  phone?: string;
  confirmCode?: string;
  captcha: string;
  route?: string;
}

/**
 * @description the interface of user register entity
 * @export
 * @interface IFormRegisterData
 */
export interface IFormRegisterData {
  name: string;
  email: string;
  phonenumber: string;
  operatorid?: string;
  reference1?: string;
  reference2?: string;
  captcha?: string;
  confirmKey?: string;
  route?: string;
  dataImage?: IFormImgData;
}

/**
 * @description the interface of user login entity
 * @export
 * @interface ILoginParams
 */
export interface ILoginParams {
  account: string;
  password: string;
  seckey?: string;
}

export interface IRefreshParams {
  token: string;
  refreshToken: string;
}

/**
 * @description the interface of request body entity
 * @export
 * @interface IAppState
 */
export interface IPageData<T = any> {
  page: number;
  limit: number;
  query?: T;
}

/**
 * @description the interface of axios response entity
 * @export
 * @interface IAxiosResponse
 */
export interface IAxiosResponse<T = any> {
  status: number;
  message: number;
  payload?: T;
}

export interface IActivityProps {
  animating?: boolean;
  color?: string;
  size?: string | any;
  loading?: boolean;
  backdropColor?: string;
}

export interface IAnimatedProps {
  children?: ReactNode;
  style?: any;
  duration?: number;
  toValue?: number;
  useNativeDriver?: boolean;
  type?: any;
}

export interface IRefBottom {
  show: () => void;
  close: () => void;
}

/**
 * @description the interface of user change password
 * @export
 * @interface IFormDataChangePass
 */

export enum EAction {
  SEARCH = 'search',
  PIN = 'pin',
  UNPIN = 'unpin',
  NOTI_OFF = 'off',
  NOTI_ON = 'on',
  LEAVE = 'leave',
  DONE = 'done',
  PENDING = 'pending',
  REACT = 'react',
  RECEIVED = 'receive',
  CANCELED = 'canceled',
  COMPLAIN = 'complain',
  PROFILE = 'profile',
}

export enum EActionModal {
  LOGIN = 'login',
  ADDNEW = 'add_new',
  EDIT = 'edit',
}
