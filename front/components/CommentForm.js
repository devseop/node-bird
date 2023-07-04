import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import useInput from "@/hooks/useInput";
import PropTypes from "prop-types";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.myInfo?.id);

  const [commentText, onChangeCommentText] = useInput("");

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40 }}
          type="primary"
          htmlType="submit"
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
