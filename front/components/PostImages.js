import { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";
import PropTypes from "prop-types";

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
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
          style={{
            borderRadius: "8px 8px 0 0",
            // faker 사용시 해당 옵션때문에 사이즈가 어긋남
            // width: "628px",
            objectFit: "cover",
          }}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <img
            role="presentation"
            src={images[0].src}
            alt={images[0].src}
            onClick={onZoom}
            style={{
              borderRadius: "8px 0 0 0",
              width: "50%",
              cursor: "pointer",
            }}
          />
          <img
            role="presentation"
            width="50%"
            src={images[1].src}
            alt={images[1].src}
            onClick={onZoom}
            style={{
              borderRadius: "0 8px 0 0",
              width: "50%",
              cursor: "pointer",
            }}
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          role="presentation"
          width="50%"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
          style={{ borderRadius: "8px 0 0 0", cursor: "pointer" }}
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

export default PostImages;
