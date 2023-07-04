import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Popover, Button, Avatar, List } from "antd";
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
  HeartFilled,
} from "@ant-design/icons";
import PropTypes from "prop-types";

import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import styled from "styled-components";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setcommentFormOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    console.log("liked!");
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setcommentFormOpened((prev) => !prev);
  }, []);

  const id = useSelector((state) => state.user.myInfo?.id);

  return (
    <div style={{ marginBottom: "16px" }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartFilled
              key="heart"
              onClick={onToggleLike}
              style={{ color: "red" }}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="commnet" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <CommentWrapper>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </CommentWrapper>
      )}
    </div>
  );
};

const CommentWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
