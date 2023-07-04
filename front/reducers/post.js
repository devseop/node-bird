export const initailState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "unknown_user_1",
      },
      content: "첫번째 게시글 #해시태그 #노드",
      Images: [
        {
          src: "https://images.unsplash.com/photo-1682685794761-c8e7b2347702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
        },
        {
          src: "https://images.unsplash.com/photo-1687800132770-8f1600a5849e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        {
          src: "https://images.unsplash.com/photo-1687704840383-959f27cf03c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "unknown_user_2",
          },
          content: "oh my god",
        },
        {
          User: {
            nickname: "unknown_user_3",
          },
          content: "wow amazing",
        },
      ],
    },
  ],
  // 이미지 업로드 할 때 이미지 경로를 저장할 곳
  imagePaths: [],
  // 게시글 추가가 완료되었을 때를 확인하기 위한 상태
  postAddad: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "it is dummy data",
  User: {
    id: 1,
    nickname: "devseop",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    default:
      return state;
  }
};

export default reducer;
