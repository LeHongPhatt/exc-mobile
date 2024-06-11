import {all} from 'redux-saga/effects';
import userSagas from './user/Sagas';
import driverSagas from './driver/Sagas';
import newsSagas from './news/Sagas';
import transactionSagas from './transaction/Sagas';
import statisticSagas from './statistic/Sagas';
import accountSagas from './account/Sagas';

export default function* rootSaga() {
  yield all([
    userSagas(),
    driverSagas(),
    newsSagas(),
    transactionSagas(),
    statisticSagas(),
    accountSagas(),
  ]);
}
