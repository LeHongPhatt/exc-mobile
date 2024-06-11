export enum SELECT_OPTION {
  DATE_PICKER = 'date',
  OPTION_PICKER = 'option',
  TIME_PICKER = 'time',
}
export type TGender = 0 | 1 | 3;
export type TGenderValue = 'Nam' | 'Nữ' | 'Khác';
export interface ISelectOption {
  index: TGender;
  data: TGenderValue;
}
export type TArrayGender = ReadonlyArray<TGenderValue>;
export interface ISelectTime {
  hour: string | number;
  minute: string | number;
}
interface ISectionTitle {
  sectionTitle: string;
}
export const dataDates: ISectionTitle[] = [
  {
    sectionTitle: 'Ngày',
  },
  {
    sectionTitle: 'Tháng',
  },
  {
    sectionTitle: 'Năm',
  },
];
export const dataTimes = [
  {
    sectionTitle: 'Giờ',
  },
  {
    sectionTitle: 'Phút',
  },
];
