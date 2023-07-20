import { useSelector } from "react-redux";
import AppLayout from "@/components/AppLayout";
import Head from "next/head";
import { Avatar, Card } from "antd";
import wrapper from "@/store/configureStore";
import { LOAD_USER_INFO_REQUEST } from "@/reducers/user";
import { END } from "redux-saga";

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>Zerocho | NodeBird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

//* getServerSideProps와 getStaticProps의 사용범 차이
//* getServerSideProps => 접속할 때마다 접속한 상황에 따라 화면이 변경되어야 할 때 사용
//* getStaticProps => 언제 접속해도 데이터가 변경될 일이 없을 때 사용 (ex. 블로그 게시물)

//* 예를 들어 상품 페이지의 경우 데이터의 변경이 빈번한데 이 땐 getStaticProps를 사용하기엔 애매하지 않을까?
//* 그럴 땐 getServerSideProps를 사용하는 것이 맞겠다
//* getStaticProps는 SSG 방식이 유리한 블로그나 소개 사이트 등이 맞을 것 같다

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch({
      type: LOAD_USER_INFO_REQUEST,
      data: 1,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default About;
