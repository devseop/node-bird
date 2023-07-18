import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import PropTypes from "prop-types";
import { followRequestAction, unfollowRequestAction } from "@/reducers/user";

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { myInfo, followLoading, unfollowLoading, followBtnId } = useSelector(
    (state) => state.user
  );
  const isFollowing = myInfo?.Followings?.find((v) => v.id === post.User.id);
  const isClickedBtn = post.User.id === followBtnId;

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowRequestAction(post.User.id));
    } else {
      dispatch(followRequestAction(post.User.id));
    }
  }, [isFollowing]);

  if (post.User.id === myInfo.id) {
    return null;
  }

  return (
    <Button
      loading={isClickedBtn && (followLoading || unfollowLoading)}
      onClick={onClickButton}
    >
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
