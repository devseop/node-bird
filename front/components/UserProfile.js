import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Card } from "antd";
import styled from "styled-components";
import { logOutRequestAction } from "@/reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { myInfo, isLoggingOut } = useSelector((state) => state.user);
  const onLogout = useCallback(() => {
    dispatch(logOutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          twit
          <br />0
        </div>,
        <div key="followers">
          followers
          <br />0
        </div>,
        <div key="followings">
          followings
          <br />0
        </div>,
      ]}
    >
      <Card.Meta
        title={myInfo.nickname}
        avatar={<Avatar>{myInfo.nickname[0]}</Avatar>}
      />
      <LogoutButton onClick={onLogout} loading={isLoggingOut}>
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
