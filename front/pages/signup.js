import AppLayout from "@/components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";
import Head from "next/head";
import { useCallback, useState } from "react";
import useInput from "@/hooks/useInput";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
  margin-top: 4px;
`;

const SignUp = () => {
  const [id, onChangeId] = useInput("");
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
    console.log({ id: id, nickname: nickname, pw: pw });
  }, [pw, pwCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>Sign Up | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
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
          <Button type="primary" htmlType="submit">
            회원가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default SignUp;
