import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import useInput from "@/hooks/useInput";
import PropTypes from "prop-types";
import { ADD_COMMENT_REQUEST, addCommentRequestAction } from "@/reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.myInfo?.id);
  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.post
  );
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    // console.log(post.id, commentText);
    // dispatch({
    //   type: ADD_COMMENT_REQUEST,
    //   data: { content: commentText, postId: post.id, userId: id },
    // });
    dispatch(
      addCommentRequestAction({
        content: commentText,
        postId: post.id,
        userId: id,
      })
    );
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          Reply
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
