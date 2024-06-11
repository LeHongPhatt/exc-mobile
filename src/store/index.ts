/** @format */

import {combineReducers} from 'redux';
import notify from './notify/Reducer';
import user from './user/Reducer';
import driver from './driver/Reducer';
import news from './news/Reducer';
import transaction from './transaction/Reducer';
import statistic from './statistic/Reducer';
import account from './account/Reducer';

export default combineReducers({
  user,
  driver,
  notify,
  news,
  transaction,
  statistic,
  account,
});
