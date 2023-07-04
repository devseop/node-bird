import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => (
  <div>
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
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
