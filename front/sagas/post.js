import { all, fork, delay, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
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
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
} from "@/reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "@/reducers/user";

// upload images
function uploadImagesAPI(data) {
  return axios.post(`/post/images`, data);
}

function* uploadImagesSaga(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

// load posts
function loadPostsAPI(data) {
  return axios.get("/posts", data);
}

function* loadPostsSaga(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
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
  return axios.post("/post", data);
}

function* addPostSaga(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
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
  return axios.delete(`/post/${data}`);
}

function* removePostSaga(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
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

// like post
function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePostSaga(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// unlike post
function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePostSaga(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// add comment
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addCommentSaga(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
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

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImagesSaga);
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPostsSaga);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePostSaga);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePostSaga);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePostSaga);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addCommentSaga);
}

export default function* postSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),
  ]);
}
