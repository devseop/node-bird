import { all, fork, delay, put, throttle } from "redux-saga/effects";
import axios from "axios";

// add post
function addPostAPI() {
  return axios.post("/api/post");
}

function* addPost() {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  // takeLatest는 완료된 것은 취소되지 않고 동시에 로딩된 것만 취소된다.
  // => 응답(BackEnd)을 취소하는 것이지 요청(FrontEnd)을 취소하는 것이 아니다.
  // => 서버에서는 데이터가 두 번 저장될 수 있기 때문에 검사를 해줘야한다.
  // throttle은 설정한 시간(ms) 내에서만 한 번 실행되도록 한다.
  yield throttle("ADD_POST_REQUEST", addPost, 2000);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
