import useInput from "@/hooks/useInput";
import { CHANGE_NICKNAME_REQUEST } from "@/reducers/user";
import { Form, Input } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const NicknameEditForm = () => {
  const { myInfo } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(myInfo?.nickname || "");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <EditFormStyle>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="nickname"
        enterButton="edit"
        onSearch={onSubmit}
      />
    </EditFormStyle>
  );
};

const EditFormStyle = styled(Form)`
  margin-bottom: 24px;
  padding: 24px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`;

export default NicknameEditForm;
