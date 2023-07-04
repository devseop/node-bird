import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { Input, Menu, Row, Col } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  // const [isLoggedin, setIsLoggedIn] = useState(false);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <MenuBar mode="horizontal">
        <Menu.Item>
          <Link href="/">Node-Bird</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item>
          <SearchBar
            placeholder="Input Search Text"
            size="large"
            allowClear
            enterButton
            /* 검색어를 콘솔에 표시 */
            onSearch={(value) => console.log(value)}
            style={{ verticalAlign: "middle" }}
          />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">Sign Up</Link>
        </Menu.Item>
      </MenuBar>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
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
