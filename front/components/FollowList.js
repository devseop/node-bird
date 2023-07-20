import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  removeFollowerRequestAction,
  unfollowRequestAction,
} from "@/reducers/user";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch();

  const onCancel = (id) => () => {
    if (header === "팔로잉") {
      dispatch(unfollowRequestAction(id));
    }
    dispatch(removeFollowerRequestAction(id));
  };

  return (
    <List
      style={{ marginBottom: "24px" }}
      grid={{ gutter: 16, column: 3 }}
      size="default"
      header={<span>{header}</span>}
      loadMore={
        <div style={{ textAlign: "center", margin: "16px 0" }}>
          <Button onClick={onClickMore} loading={loading}>
            More
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      locale={`팔로잉 또는 팔로우 중인 사용자가 없습니다.`}
      renderItem={(item) => (
        <List.Item style={{ marginTop: "16px", padding: "0 8px" }}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FollowList;
