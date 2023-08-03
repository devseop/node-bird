import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Router from "next/router";
import Head from "next/head";
import { END } from "redux-saga";

import styled from "@emotion/styled";
import { Form, Input, Checkbox, Button } from "antd";
import AppLayout from "@/components/AppLayout";
import useInput from "@/hooks/useInput";
import { SIGN_UP_REQUEST, LOAD_MY_INFO_REQUEST } from "@/reducers/user";
import wrapper from "@/store/configureStore";
import Link from "next/link";

const SignUp = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, myInfo } = useSelector(
    (state) => state.user
  );

  // 회원가입 화면에서 로그인시 메인 화면으로 이동
  useEffect(() => {
    if (myInfo && myInfo.id) {
      Router.replace("/");
    }
  }, [myInfo && myInfo.id]);

  // 회원가입 성공시
  useEffect(() => {
    if (signUpDone) {
      alert("회원가입이 완료됐습니다.");
      Router.push("/");
    }
  }, [signUpDone]);

  // 회원가입 실패시
  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  const RegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const isValid = !(
    email !== " " &&
    nickname !== " " &&
    password !== " " &&
    RegEx.test(password) &&
    password === passwordCheck &&
    term === true
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if (!term) {
      return setTermError(true);
    }
    console.log({ email: email, nickname: nickname, password: password });
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>Sign Up | NodeBird</title>
      </Head>
      <Styled.FormWrapper onFinish={onSubmit}>
        <Styled.LoginTitle>
          <p>🧑🏻‍💻</p>
          <p>회원가입</p>
        </Styled.LoginTitle>
        <Styled.InputWrapper>
          <label htmlFor="user-email">이메일</label>
          <Input
            name="user-email"
            value={email}
            required
            onChange={onChangeEmail}
            type="email"
            size="large"
            placeholder="실제 사용하는 이메일로 입력하지 마세요"
          />
        </Styled.InputWrapper>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
            type="text"
            size="large"
            placeholder="원하는 닉네임을 입력해주세요"
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
            size="large"
            placeholder="실제 이용하는 비밀번호로 입력하지 마세요"
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
            size="large"
            placeholder="비밀번호를 한 번 더 입력해주세요"
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
          (필수) 이용에 동의합니다.
        </Checkbox>
        <Styled.ButtonWrapper>
          <Styled.ActionButton
            type="primary"
            htmlType="submit"
            loading={signUpLoading}
            disabled={isValid}
          >
            가입하기
          </Styled.ActionButton>
          <Styled.BackButton type="button" onClick={(e) => Router.push("/")}>
            돌아가기
          </Styled.BackButton>
        </Styled.ButtonWrapper>
      </Styled.FormWrapper>
    </AppLayout>
  );
};

const ErrorMessage = styled.div`
  color: red;
  margin-top: 4px;
`;

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 360px;
  margin: 88px auto 24px;
`;

const LoginTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 16px;
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
  margin-top: 24px;
`;

const ActionButton = styled(Button)`
  font-size: 16px;
  font-weight: 600;
  height: 44px;
`;

const BackButton = styled.button`
  padding: 4px 15px;
  border: 1px solid lightgray;
  border-radius: 6px;
  height: 44px;
  background-color: transparent;
  cursor: pointer;

  font-size: 16px;
  font-weight: 600;
  color: lightgray;
`;

const Styled = {
  ErrorMessage,
  FormWrapper,
  InputWrapper,
  ButtonWrapper,
  ActionButton,
  BackButton,
  LoginTitle,
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

export default SignUp;
