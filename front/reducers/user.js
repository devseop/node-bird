export const initailState = {
  isLoggingIn: false, // 로그인 시도 중
  isLoggedIn: false,
  isLoggingOut: false, // 로그아웃 시도 중
  myInfo: null,
  signUpData: {},
  loginData: {},
};

export const logInRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

export const logOutRequestAction = () => {
  return {
    type: "LOG_OUT_REQUEST",
  };
};

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      console.log("reducer logIn");
      return {
        ...state,
        isLoggingIn: true,
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        myInfo: { ...action.data, nickname: "devseop" },
      };
    case "LOG_IN_FAILURE":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggingOut: true,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        myInfo: null,
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default reducer;
