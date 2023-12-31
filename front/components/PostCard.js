import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Card, Popover, Button, Avatar, List } from "antd";
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartFilled,
} from "@ant-design/icons";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import FollowButton from "./FollowButton";
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  retweetRequestAction,
} from "@/reducers/post";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setcommentFormOpened] = useState(false);
  const id = useSelector((state) => state.user.myInfo?.id);
  const liked = post.Likers.find((v) => v.id === id);

  const onLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnlike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setcommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch(retweetRequestAction(post.id));
  }, [id]);

  return (
    <CardWrapper>
      <Card
        style={{ border: "none" }}
        title={
          post.RetweetId ? (
            `${post.User.nickname}님이 리트윗했습니다.`
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "8px" }}>{post.User.nickname}</div>
              {id && <FollowButton post={post} />}
            </div>
          )
        }
        cover={post.Images[0]?.src ? <PostImages images={post.Images} /> : null}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartFilled
              key="heart"
              onClick={onUnlike}
              style={{ color: "red" }}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="commnet" onClick={onToggleComment} />,
          // edit/delete Button
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="primary"
                      danger
                      loading={removePostLoading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
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
        extra={
          <span
            style={{
              color: "lightgray",
              fontWeight: "400",
              fontSize: "13px",
            }}
          >
            {dayjs(post.createdAt).fromNow()}
          </span>
        }
      >
        {/* Retweet Card Comp */}
        {post.RetweetId && post.Retweet ? (
          <Card
            size="small"
            type="inner"
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{post.Retweet.User.nickname}</span>
                <span
                  style={{
                    color: "lightgray",
                    fontWeight: "400",
                    fontSize: "13px",
                  }}
                >
                  {dayjs(post.createdAt).fromNow()}
                </span>
              </div>
            }
            cover={
              post.Retweet.Images[0]?.src ? (
                <PostImages images={post.Retweet.Images} />
              ) : null
            }
          >
            <Card.Meta
              // title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {/* Commnet Comp */}
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
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  border-bottom: 1px solid #f0f0f0;
  /* margin-bottom: 24px; */
`;

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
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
