import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { Input, Menu, Row, Col, Layout } from "antd";
import styled from "@emotion/styled";
import useInput from "@/hooks/useInput";

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput("");
  const { myInfo } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  const MenuItems = [
    {
      label: (
        <Link href="/">
          <ICNodeBird>( ˙◊˙ )</ICNodeBird>
        </Link>
      ),
      key: "home",
    },
    // {
    //   label: (
    //     <Styled.SearchBar
    //       placeholder="Input Search Text"
    //       allowClear
    //       enterButton
    //       value={searchInput}
    //       onChange={onChangeSearchInput}
    //       onSearch={onSearch}
    //     />
    //   ),
    //   key: "search",
    // },
  ];

  return (
    <Layout style={{ backgroundColor: "transparent" }}>
      {myInfo ? (
        <Styled.GNB>
          <Styled.MenuBar mode="horizontal" items={MenuItems} />
        </Styled.GNB>
      ) : null}
      <Styled.ContentLayout>
        {myInfo ? <UserProfile /> : <LoginForm />}
        {children}
      </Styled.ContentLayout>
      <Styled.FooterWrapper>
        <span>Made by </span>
        <a
          href="https://devseop.github.io/"
          /* target="_blank" 이용 시에는 꼭 rel="norefferrer noopener"를 설정할 것 */
          target="_blank"
          rel="norefferrer noopener"
        >
          Devseop
        </a>
      </Styled.FooterWrapper>
    </Layout>
  );
};

const GNB = styled(Header)`
  padding: 0;
  background-color: #fff;
  position: fixed;
  z-index: 1000;
  width: 100%;
`;

const MenuBar = styled(Menu)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  /* border: none; */
`;

const ICNodeBird = styled.span`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -1px;
`;

const ContentLayout = styled(Content)`
  width: 560px;
  min-width: 336px;
  margin: 120px auto 0;
`;

const SearchBar = styled(Input.Search)`
  vertical-align: middle;
`;

const FooterWrapper = styled(Footer)`
  text-align: center;
  width: 560px;
  margin: 0 auto;
  background-color: transparent;

  span {
    color: lightslategray;
  }
`;

const Styled = {
  GNB,
  MenuBar,
  ICNodeBird,
  ContentLayout,
  SearchBar,
  FooterWrapper,
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
