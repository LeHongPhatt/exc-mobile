export enum EUtilType {
  P = 'privacy_policy',
  T = 'terms_of_use',
}

export enum EUserRequest {
  feedback = 'feedback',
  remove_account = 'remove_account',
  withdraw = 'withdraw',
  deposit = 'deposit',
}

export interface IUtilParams {
  type: EUtilType;
}

export interface IUserRequestParams {
  content?: string;
  type: EUserRequest;
}

export interface IFormChangePass {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
