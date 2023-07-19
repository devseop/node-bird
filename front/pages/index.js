import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Head from "next/head";
import AppLayout from "@/components/AppLayout";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";
import { LOAD_POSTS_REQUEST } from "@/reducers/post";
import { LOAD_MY_INFO_REQUEST } from "@/reducers/user";
import wrapper from "@/store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } =
    useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    //* window.scrollY: 사용자가 스크롤을 얼마나 내렸는지
    //* document.documentElement.clientHeight: 클라이언트(브라우저)의 보이는 화면 높이
    //* document.documentElement.scrollHeight: 프로젝트(개발화면)의 총 높이
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  // console.log("mainPosts", mainPosts);
  return (
    <>
      <Head>
        <title>Home | NodeBird</title>
      </Head>
      <AppLayout>
        {myInfo && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
