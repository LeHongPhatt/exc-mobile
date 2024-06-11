export enum EStatisticTab {
  pick = 'pick',
  post = 'post',
}

export interface IStatisticParams {
  limit: number;
  page: number;
  startTime?: string;
  endTime?: string;
  type?: EStatisticTab | null;
  keyword?: string;
}

export interface IStatistic {
  finish_drive?: IFinishDrive;
  canceled_drive?: ICanceledDrive;
  received_drive?: IReceivedDrive;
  pending_drive?: IPendingDrive;
  total_drive?: number;
  average_a_day?: number;
  drives?: IDrivers[];
}

export interface IFinishDrive {
  quantity?: number;
  percent?: any;
}

export interface ICanceledDrive {
  quantity?: number;
  percent?: any;
}

export interface IReceivedDrive {
  quantity?: number;
  percent?: any;
}

export interface IPendingDrive {
  quantity?: number;
  percent?: any;
}

export interface IDrivers {
  driver_id?: string;
  status?: string;
  name?: string;
  payment_type?: string;
  amount?: number;
  commission?: number;
  id?: string;
  owner_id?: string;
  drive_code?: string;
  reactions?: any[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
