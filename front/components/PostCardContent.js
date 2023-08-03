import Link from "next/link";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const PostCardContent = ({ postData }) => (
  <Styled.ContentWrapper>
    {postData.split(/(#[^\s#]+)/g).map((h, idx) => {
      if (h.match(/(#[^\s#]+)/)) {
        return (
          <Link href={`/hashtag/${h.slice(1)}`} key={idx}>
            {h}
          </Link>
        );
      }
      return h;
    })}
  </Styled.ContentWrapper>
);

const ContentWrapper = styled.div`
  /* min-height: 160px; */
  padding: 20px 0 4px;
  font-size: 16px;
  color: #000;
`;

const Styled = { ContentWrapper };

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
