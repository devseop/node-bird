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
      label: <Link href="/">Node-Bird</Link>,
      key: "home",
    },
    {
      label: <Link href="/profile">Profile</Link>,
      key: "profile",
    },

    {
      label: <Link href="/signup">Sign Up</Link>,

      key: "signUp",
    },
    {
      label: (
        <Styled.SearchBar
          placeholder="Input Search Text"
          allowClear
          enterButton
          value={searchInput}
          onChange={onChangeSearchInput}
          onSearch={onSearch}
        />
      ),
      key: "search",
    },
  ];

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Styled.GNB>
        <Menu mode="horizontal" items={MenuItems} style={{ height: "56px" }} />
      </Styled.GNB>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {myInfo ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <span>Made by </span>
          <a
            href="https://devseop.github.io/"
            /* target="_blank" 이용 시에는 꼭 rel="norefferrer noopener"를 설정할 것 */
            target="_blank"
            rel="norefferrer noopener"
          >
            Devseop
          </a>
        </Col>
      </Row>
    </Layout>
  );
};

const GNB = styled(Header)`
  background-color: #fff;
  height: 56px;
`;

const SearchBar = styled(Input.Search)`
  vertical-align: middle;
`;

const Styled = { GNB, SearchBar };

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
