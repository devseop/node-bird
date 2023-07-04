import { Form, Input } from "antd";
import { useMemo } from "react";
import styled from "styled-components";

const NicknameEditForm = () => {
  const EditFormStyle = styled(Form)`
    margin-bottom: 24px;
    padding: 24px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
  `;

  return (
    <EditFormStyle>
      <Input.Search addonBefore="nickname" enterButton="edit" />
    </EditFormStyle>
  );
};

export default NicknameEditForm;
