import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Card } from "antd";
import { logOutRequestAction } from "@/reducers/user";
import styled from "@emotion/styled";
import Router, { useRouter } from "next/router";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { myInfo, logOutLoading } = useSelector((state) => state.user);

  // 프로필 & 로그아웃 버튼 구분을 위한 url 캐치
  const router = useRouter();
  const [profilePath, setProfilePath] = useState(router.pathname.slice(1)); // output: profile

  const onLogout = useCallback(() => {
    dispatch(logOutRequestAction());
  }, []);

  const goToProfile = useCallback(() => {
    Router.push("/profile");
  });

  return (
    <Styled.ProfileWrapper>
      <Card style={{ border: "none" }}>
        <Card.Meta
          title={myInfo.nickname}
          avatar={<Avatar size={56}>{myInfo.nickname[0]}</Avatar>}
          description={
            <div style={{ display: "flex", gap: "8px" }}>
              <p key="twit">{myInfo.Posts.length} 트윗</p>
              <p key="followers">{myInfo.Followers.length} 팔로워</p>
              <p key="followings">{myInfo.Followings.length} 팔로잉</p>
            </div>
          }
        />
      </Card>
      {profilePath === "profile" ? (
        <Button onClick={onLogout} loading={logOutLoading}>
          로그아웃
        </Button>
      ) : (
        <Button onClick={goToProfile}>프로필</Button>
      )}
    </Styled.ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 44px;
`;

const Styled = { ProfileWrapper };

export default UserProfile;
