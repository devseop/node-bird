import { StopOutlined } from "@ant-design/icons";
import { Button, Card, List } from "antd";
import PropTypes from "prop-types";

const FollowList = ({ header, data }) => {
  return (
    <List
      style={{ marginBottom: "24px" }}
      grid={{ gutter: 16, column: 3 }}
      size="default"
      header={<span>{header}</span>}
      loadMore={
        <div style={{ textAlign: "center", margin: "16px 0" }}>
          <Button>more</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: "16px", padding: "0 8px" }}>
          <Card actions={[<StopOutlined key="stop" />]}>
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
};

export default FollowList;
