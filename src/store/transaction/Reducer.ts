/** @format */

import {createSlice} from '@reduxjs/toolkit';
import {ITransactionState} from 'types';
const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    loading: false,
    error: null,
  } as ITransactionState,
  reducers: {
    actionRequest: state => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    getDataSuccess: (state, {payload}: {payload: any}) => {
      return {
        ...state,
        error: null,
        loading: false,
        ...payload,
      };
    },
  },
});

export const {actionRequest, getDataSuccess} = transactionSlice.actions;

export default transactionSlice.reducer;
