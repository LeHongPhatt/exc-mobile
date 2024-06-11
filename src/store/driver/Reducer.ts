/** @format */

import {createSlice} from '@reduxjs/toolkit';
import {IDriverState} from 'types';
const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    loading: false,
    error: null,
    list: {},
    listDetail: {},
    listUser: {},
    listSearch: {},
  } as IDriverState,
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

export const {actionRequest, getDataSuccess} = driverSlice.actions;

export default driverSlice.reducer;
