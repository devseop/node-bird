import { all, fork, delay, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// log in
function logInAPI() {
  return axios.post("/api/logIn");
}

function* logIn(action) {
  try {
    console.log("saga logIn");
    yield delay(1000);
    // const result = yield call(logInAPI);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

// log out
function logOutAPI() {
  return axios.post("/api/logOut");
}

function* logOut() {
  try {
    yield delay(1000);
    // const result = yield call(logOutAPI);
    yield put({
      type: "LOG_OUT_SUCCESS",
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

// 이벤트 리스너와 같은 역할을 하는 함수
function* watchLogIn() {
  // yield take(...)의 치명적인 단점은 일회용이라는 것.
  // 한 번 실행하고 난 뒤에는 해당 함수까지 사라진다.
  // while(true)로 감싸서 해결할 수 있지만 직관적인 방법은 아니다.
  // 이럴 때는 takeEvery를 이용한다. takeEvery는 마지막에 호출한 것만 실행되도록 한다.
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
