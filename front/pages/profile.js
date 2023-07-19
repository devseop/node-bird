import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import { END } from "redux-saga";

import AppLayout from "@/components/AppLayout";
import NicknameEditForm from "@/components/NicknameEditForm";
import FollowList from "@/components/FollowList";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from "@/reducers/user";
import wrapper from "@/store/configureStore";

const Profile = () => {
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!(myInfo && myInfo.id)) {
      alert("로그인 후 이용해주세요.");
      Router.push("/");
    }
  }, [myInfo && myInfo.id]);

  if (!myInfo) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Profile | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Followings" data={myInfo.Followings} />
        <FollowList header="Followers" data={myInfo.Followers} />
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Profile;
