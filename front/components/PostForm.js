import React, { useCallback, useRef, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  ADD_POST_REQUEST,
  removeImageRequestAction,
  uploadImagesRequestAction,
} from "@/reducers/post";
import useInput from "@/hooks/useInput";
import { PictureFilled, PictureOutlined } from "@ant-design/icons";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post
  );
  const [text, onChangeText, setText] = useInput("");

  // 포스팅이 완료되면 기존 입력창의 텍스트를 초기화하는 side Effect가 실행되도록 useEffect를 사용
  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append("image", p);
    });
    formData.append("content", text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    // console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch(uploadImagesRequestAction(imageFormData));
  }, []);

  const onRemoveImage = useCallback((index) => () => {
    dispatch(removeImageRequestAction(index));
  });

  return (
    <Form
      style={{
        margin: "0 0 44px",
        borderTop: "1px solid lightgray",
        // borderBottom: "1px solid lightgray",
      }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="오늘은 어떤 일이 있었나요?"
        autoSize={{ minRows: 3, maxRows: 8 }}
        bordered={false}
        style={{ fontSize: "16px", padding: "16px 0 12px" }}
      />
      <div>
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button size="large" shape="circle" onClick={onClickImageUpload}>
          <PictureOutlined />
        </Button>
        {/* 게시글 작성버튼 */}
        <Button
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
          loading={addPostLoading}
          size="large"
        >
          게시
        </Button>
      </div>
      {/* 이미지 미리보기 */}
      <div>
        {imagePaths.map((v, i) => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <div style={{ position: "absolute", padding: "32px 0 0 8px" }}>
                {/* map() 안에 데이터를 넣고 싶다면, 콜백함수를 쓰고 싶다면 고차함수를 이용한다. */}
                <Button size="small" onClick={onRemoveImage(i)}>
                  제거
                </Button>
              </div>
              <img
                src={`http://localhost:3065/${v}`}
                style={{
                  width: "200px",
                  borderRadius: "8px",
                  border: "0.5px solid lightgray",
                  marginTop: "24px",
                  marginRight: "8px",
                }}
                alt={v}
              />
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default PostForm;
