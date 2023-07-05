import React, { useCallback, useRef, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addPostRequestAction } from "@/reducers/post";
import useInput from "@/hooks/useInput";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post
  );
  const [text, onChangeText, setText] = useInput("");

  const onSubmit = useCallback(
    (e) => {
      dispatch(addPostRequestAction(text));
    },
    [text]
  );

  // 포스팅이 완료되면 기존 입력창의 텍스트를 초기화하는 side Effect가 실행되도록 useEffect를 사용
  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

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
        <Button
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
          loading={addPostLoading}
        >
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
