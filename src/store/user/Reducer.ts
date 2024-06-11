/** @format */

import {createSlice} from '@reduxjs/toolkit';
import {ELanguage, IAppState} from 'types';

const initialState = {
  loading: false,
  error: null,
  language: ELanguage.VI,
  isAuth: false,
  user: null,
  profile: null,
  accessToken: null,
} as IAppState;

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionRequest: state => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    actionRequestDone: state => {
      return {
        ...state,
        loading: false,
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
    reset: () => initialState,
  },
});

export const {actionRequest, getDataSuccess, actionRequestDone, reset} =
  userSlice.actions;

export default userSlice.reducer;
