import { List, Skeleton } from "antd";

const LatestActivitiesSkeleton = () => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Skeleton.Avatar
            active
            size={48}
            shape="square"
            style={{ borderRadius: "4px" }}
          />
        }
        title={<Skeleton.Button active style={{ height: "16px" }} />}
        description={
          <Skeleton.Button active style={{ height: "16px", width: "300px" }} />
        }
      />
    </List.Item>
  );
};

export default LatestActivitiesSkeleton;
