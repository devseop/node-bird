import React, { useCallback, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "@/reducers/post";

const PostForm = () => {
  const imagePaths = useSelector((state) => state.post.imagePaths);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      style={{ margin: "12px 0 24px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          ref={imageInput}
        />
        <Button onClick={onClickImageUpload}>이미지 추가하기</Button>
        {/* 게시글 작성버튼 */}
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          Tweet
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={v} style={{ width: "200px" }} alt={v} />
              <div>
                <Button>DELETE</Button>
              </div>
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default PostForm;
