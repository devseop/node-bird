import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Card } from "antd";
import styled from "styled-components";
import { logOutRequestAction } from "@/reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { myInfo, logOutLoading } = useSelector((state) => state.user);
  const onLogout = useCallback(() => {
    dispatch(logOutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          트윗
          <br />
          {myInfo.Posts.length}
        </div>,
        <div key="followers">
          팔로워
          <br />
          {myInfo.Followers.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {myInfo.Followings.length}
        </div>,
      ]}
    >
      <Card.Meta
        title={myInfo.nickname}
        avatar={<Avatar>{myInfo.nickname[0]}</Avatar>}
      />
      <LogoutButton onClick={onLogout} loading={logOutLoading}>
        로그아웃
      </LogoutButton>
    </Card>
  );
};

const LogoutButton = styled(Button)`
  margin-top: 24px;
  width: 100%;
`;

export default UserProfile;
