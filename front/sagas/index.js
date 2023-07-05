import { all, fork } from "redux-saga/effects";
//* fork와 call의 차이점 => fork는 비동기 호출, call은 동기 호출이라는 것.

import userSaga from "./user";
import postSaga from "./post";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
