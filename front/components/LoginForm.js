import { Button, Form, Input } from "antd";
import Link from "next/link";
// useCallback은 함수를 캐싱, useMemo는 값을 캐싱
import { useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import useInput from "@/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { logInRequestAction } from "@/reducers/user";

const LoginForm = () => {
  // const [id, setId] = useState("");
  // const [password, setPw] = useState("");

  // const onChangeId = useCallback((e) => {
  //   setId(e.target.value);
  // }, []);

  // const onChangePw = useCallback((e) => {
  //   setPw(e.target.value);
  // }, []);

  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePw] = useInput("");

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(
    (e) => {
      // console.log(email, password);
      dispatch(logInRequestAction({ email, password }));
    },
    [email, password]
  );

  return (
    <Styled.FormWrapper onFinish={onSubmitForm}>
      <Styled.InputWrapper>
        <label htmlFor="user-email">이메일</label>
        <Input
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          required
          type="email"
          style={{ padding: "8px 12px", height: "44px", borderRadius: "8px" }}
        />
      </Styled.InputWrapper>
      <Styled.InputWrapper>
        <label htmlFor="user-password">비밀번호</label>
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePw}
          required
          size="large"
        />
      </Styled.InputWrapper>
      {/* 객체끼리 비교하면 false로 반환하므로 인라일 스타일을 적용하면 매번 리렌더링이 된다. 
      이럴 땐 styled나 emotion 등의 스타일을 따로 적용하도록 한다. 
      물론 성능에 큰 영향을 주지 않는 컴포넌트라면 인라인 스타일을 사용하여도 무방하다. */}
      <Styled.ButtonWrapper>
        <Styled.ActionButton
          type="primary"
          htmlType="submit"
          loading={logInLoading}
        >
          로그인
        </Styled.ActionButton>
        <Styled.ActionButton style={{ padding: "8px" }} href="/signup">
          회원가입
        </Styled.ActionButton>
      </Styled.ButtonWrapper>
    </Styled.FormWrapper>
  );
};

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
`;

const ActionButton = styled(Button)`
  font-size: 16px;
  font-weight: 600;
  height: 44px;
`;

const Styled = {
  FormWrapper,
  InputWrapper,
  ButtonWrapper,
  ActionButton,
};

export default LoginForm;
