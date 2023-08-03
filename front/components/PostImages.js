import { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  });

  const onClose = useCallback(() => {
    console.log(showImagesZoom);
    setShowImagesZoom(false);
  });

  if (images.length === 1) {
    return (
      <>
        {/* 이미지를 클릭할 필요가 없다는 것을 알려주려면 role='presentation'을 추가한다. */}
        <Styled.ImageWrapper
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
          imageLength={images.length}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <Styled.ImageWrapper
            role="presentation"
            src={`http://localhost:3065/${images[0].src}`}
            alt={images[0].src}
            onClick={onZoom}
            imageLength={images.length}
          />
          <Styled.ImageWrapper
            role="presentation"
            width="50%"
            src={`http://localhost:3065/${images[1].src}`}
            alt={images[1].src}
            onClick={onZoom}
            imageLength={images.length}
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Styled.ImageWrapper
          role="presentation"
          width="50%"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
          imageLength={images.length}
        />
        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
            cursor: "pointer",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ).isRequired,
};

const ImageWrapper = styled.img`
  object-fit: cover;
  width: ${(props) => (props.imageLength >= 2 ? "50%" : "560px")};
  height: 200px;
  border: 1px solid #f0f0f0;
  border-radius: 8px !important;
  cursor: pointer;
`;

const Styled = { ImageWrapper };

export default PostImages;
