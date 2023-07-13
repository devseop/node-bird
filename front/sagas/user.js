import { all, fork, delay, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_OUT_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
} from "@/reducers/user";

// load my info
function loadMyInfoAPI() {
  return axios.get("/user");
}

function* loadMyInfoSaga(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// follow
function followAPI() {
  return axios.post("/api/follow");
}

function* followSaga(action) {
  try {
    yield delay(1000);
    // const result = yield call(followAPI);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// unfollow
function unfollowAPI() {
  return axios.post("/api/unfollow");
}

function* unfollowSaga(action) {
  try {
    yield delay(1000);
    // const result = yield call(unfollowAPI);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// log in
function logInAPI(data) {
  return axios.post("/user/logIn", data);
}

function* logInSaga(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// log out
function logOutAPI() {
  return axios.post("/user/logOut");
}

function* logOutSaga() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// sign up
function signUpAPI(data) {
  return axios.post("/user", data);
}

function* signUpSaga(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

// 이벤트 리스너와 같은 역할을 하는 함수
// yield take(...)의 치명적인 단점은 일회용이라는 것.
// 한 번 실행하고 난 뒤에는 해당 함수까지 사라진다.
// while(true)로 감싸서 해결할 수 있지만 직관적인 방법은 아니다.
// 이럴 때는 takeEvery를 이용한다. takeEvery는 마지막에 호출한 것만 실행되도록 한다.
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfoSaga);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, followSaga);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollowSaga);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logInSaga);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOutSaga);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUpSaga);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
