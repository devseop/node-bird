import AppLayout from "@/components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";
import Head from "next/head";
import { useCallback, useState } from "react";
import useInput from "@/hooks/useInput";
import styled from "styled-components";
import { SIGN_UP_REQUEST } from "@/reducers/user";
import { useDispatch, useSelector } from "react-redux";

const ErrorMessage = styled.div`
  color: red;
  margin-top: 4px;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [pw, onChangePw] = useInput("");

  const [pwCheck, setPwCheck] = useState("");
  const [pwError, setPwError] = useState(false);
  const onChangePwCheck = useCallback(
    (e) => {
      setPwCheck(e.target.value);
      setPwError(e.target.value !== pw);
    },
    [pw]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  const onSubmit = useCallback(() => {
    if (pw !== pwCheck) {
      return setPwError(true);
    }

    if (!term) {
      return setTermError(true);
    }
    console.log({ email: email, nickname: nickname, pw: pw });
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, pw, nickname },
    });
  }, [email, pw, pwCheck, term]);

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
          <label htmlFor="user-pw">비밀번호</label>
          <br />
          <Input
            name="user-pw"
            type="password"
            value={pw}
            onChange={onChangePw}
            required
          />
        </div>
        <div>
          <label htmlFor="user-pw-check">비밀번호 확인</label>
          <br />
          <Input
            name="user-pw-check"
            type="password"
            value={pwCheck}
            onChange={onChangePwCheck}
            required
          />
          {pwError && (
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
