import {
  all,
  fork,
  delay,
  put,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import axios from "axios";
import shortId from "shortid";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  generateDummyPost,
} from "@/reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "@/reducers/user";

// load posts
function loadPostsAPI(data) {
  return axios.get("/api/post");
}

function* loadPostsSaga(action) {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

// add post
function addPostAPI(data) {
  return axios.post("/api/post");
}

function* addPostSaga(action) {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// remove post
function removePostAPI(data) {
  return axios.post("/api/post");
}

function* removePostSaga(action) {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// add comment
function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addCommentSaga(action) {
  try {
    yield delay(1000);
    // const result = yield call(addCommentAPI);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

// takeLatest는 완료된 것은 취소되지 않고 동시에 로딩된 것만 취소된다.
// => 응답(BackEnd)을 취소하는 것이지 요청(FrontEnd)을 취소하는 것이 아니다.
// => 서버에서는 데이터가 두 번 저장될 수 있기 때문에 검사를 해줘야한다.
// throttle은 설정한 시간(ms) 내에서만 한 번 실행되도록 한다.

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPostsSaga);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePostSaga);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addCommentSaga);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
