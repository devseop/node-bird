import { all, fork } from "redux-saga/effects";
//* fork와 call의 차이점 => fork는 비동기 호출, call은 동기 호출이라는 것.
import axios from "axios";
import userSaga from "./user";
import postSaga from "./post";

axios.defaults.baseURL = "http://localhost:3065";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
