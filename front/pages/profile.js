import { useSelector } from "react-redux";
import AppLayout from "@/components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "@/components/NicknameEditForm";
import FollowList from "@/components/FollowList";

const Profile = () => {
  const { myInfo } = useSelector((state) => state.user);

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
