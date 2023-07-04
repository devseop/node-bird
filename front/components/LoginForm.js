import { Button, Form, Input } from "antd";
import Link from "next/link";
// useCallback은 함수를 캐싱, useMemo는 값을 캐싱
import { useCallback } from "react";
import styled from "styled-components";
import useInput from "@/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { logInRequestAction } from "@/reducers/user";

const LoginForm = () => {
  // const [id, setId] = useState("");
  // const [pw, setPw] = useState("");

  // const onChangeId = useCallback((e) => {
  //   setId(e.target.value);
  // }, []);

  // const onChangePw = useCallback((e) => {
  //   setPw(e.target.value);
  // }, []);

  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.user);
  const [id, onChangeId] = useInput("");
  const [pw, onChangePw] = useInput("");

  const onSubmitForm = useCallback(
    (e) => {
      console.log(id, pw);
      dispatch(logInRequestAction({ id, pw }));
    },
    [id, pw]
  );

  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
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
      {/* 객체끼리 비교하면 false로 반환하므로 인라일 스타일을 적용하면 매번 리렌더링이 된다. 
      이럴 땐 styled나 emotion 등의 스타일을 따로 적용하도록 한다. 
      물론 성능에 큰 영향을 주지 않는 컴포넌트라면 인라인 스타일을 사용하여도 무방하다. */}
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          로그인
        </Button>
        <Link href="/signup">
          <Button>회원가입</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

const ButtonWrapper = styled.div`
  margin-top: 12px;
`;

export default LoginForm;
