import AppLayout from "@/components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "@/components/NicknameEditForm";
import FollowList from "@/components/FollowList";

const Profile = () => {
  const followerList = [
    { nickname: "seop1" },
    { nickname: "seop2" },
    { nickname: "seop3" },
  ];

  const followingList = [
    { nickname: "youn1" },
    { nickname: "youn2" },
    { nickname: "youn3" },
  ];

  return (
    <>
      <Head>
        <title>Profile | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Followings" data={followingList} />
        <FollowList header="Followers" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
