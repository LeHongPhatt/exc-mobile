/** @format */

import {createSlice} from '@reduxjs/toolkit';
import {IStatisticState} from 'types';
const statisticSlice = createSlice({
  name: 'statistic',
  initialState: {
    loading: false,
    error: null,
  } as IStatisticState,
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

export const {actionRequest, getDataSuccess} = statisticSlice.actions;

export default statisticSlice.reducer;
