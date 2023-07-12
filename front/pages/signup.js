import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Head from "next/head";

import styled from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";

import AppLayout from "@/components/AppLayout";
import useInput from "@/hooks/useInput";
import { SIGN_UP_REQUEST } from "@/reducers/user";

const ErrorMessage = styled.div`
  color: red;
  margin-top: 4px;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, myInfo } = useSelector(
    (state) => state.user
  );

  // 회원가입 화면에서 로그인시 메인 화면으로 이동
  useEffect(() => {
    if (!(myInfo && myInfo.id)) {
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
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            value={email}
            required
            onChange={onChangeEmail}
            type="email"
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            (필수) 이용에 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: "24px" }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            회원가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default SignUp;
