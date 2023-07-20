import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import { END } from "redux-saga";
import useSWR from "swr";

import AppLayout from "@/components/AppLayout";
import NicknameEditForm from "@/components/NicknameEditForm";
import FollowList from "@/components/FollowList";
import { LOAD_MY_INFO_REQUEST } from "@/reducers/user";
import wrapper from "@/store/configureStore";

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  // const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  // swr로 팔로워 데이터 불러오기
  const { data: followersData, error: followerError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher
  );

  // swr로 팔로잉 데이터 불러오기
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher
  );

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_FOLLOWERS_REQUEST,
  //   });
  //   dispatch({
  //     type: LOAD_FOLLOWINGS_REQUEST,
  //   });
  // }, []);

  useEffect(() => {
    if (!(myInfo && myInfo.id)) {
      alert("로그인 후 이용해주세요.");
      Router.push("/");
    }
  }, [myInfo && myInfo.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  });

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  });

  if (!myInfo) {
    return "내 정보를 불러오는 중입니다.";
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return "팔로잉 또는 팔로워 정보를 불러오는 도중에 오류가 발생했어요.";
  }

  return (
    <>
      <Head>
        <title>Profile | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="Followings"
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followingError}
        />
        <FollowList
          header="Followers"
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followerError}
        />
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
