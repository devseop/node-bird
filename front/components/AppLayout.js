import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { Input, Menu, Row, Col } from "antd";
import styled from "styled-components";
import useInput from "@/hooks/useInput";

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
      label: (
        <SearchBar
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
    {
      label: <Link href="/signup">Sign Up</Link>,
      key: "signUp",
    },
  ];

  return (
    <>
      <MenuBar mode="horizontal" items={MenuItems} />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {myInfo ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://devseop.github.io/"
            /* target="_blank" 이용 시에는 꼭 rel="norefferrer noopener"를 설정할 것 */
            target="_blank"
            rel="norefferrer noopener"
          >
            Made by Devseop
          </a>
        </Col>
      </Row>
    </>
  );
};

const MenuBar = styled(Menu)`
  margin-bottom: 32px;
  padding: 0 0 12px 0;
`;

const SearchBar = styled(Input.Search)`
  vertical-align: middle;
`;

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
