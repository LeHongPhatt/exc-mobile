/** @format */

import {createSlice} from '@reduxjs/toolkit';
import {INewsState} from 'types';
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    loading: false,
    error: null,
    newsList: {},
    newsDetail: {},
  } as INewsState,
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

export const {actionRequest, getDataSuccess} = newsSlice.actions;

export default newsSlice.reducer;
