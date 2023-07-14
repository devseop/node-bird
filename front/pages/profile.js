import { useDispatch, useSelector } from "react-redux";
import AppLayout from "@/components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "@/components/NicknameEditForm";
import FollowList from "@/components/FollowList";
import { useEffect } from "react";
import Router from "next/router";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from "@/reducers/user";

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

export default Profile;
