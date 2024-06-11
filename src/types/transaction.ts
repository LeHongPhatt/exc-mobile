export enum EFilterType {
  increase = 'increase',
  decrease = 'decrease',
}

export interface ITransactionParams {
  limit: number;
  page: number;
  type?: EFilterType | null;
  startTime?: string;
  endTime?: string;
}

export interface ITransaction {
  type: string;
  title: string;
  amount: number;
  createdAt: string;
}

export interface IRechargeMethod {
  id: number;
  title: string;
  subtitle: string;
  icons: any[];
}

export interface IFormRecharge {
  coin: string;
  money: string;
  rechargeMethod: IRechargeMethod;
}

export interface IFormWithdraw {
  coin: string;
  money: string;
  bankInfo: string;
}

export interface IBank {
  id: number;
  shortName: string;
  name: string;
  image: any;
  accountName: string;
  accountNumber: string;
  branch: string;
}
