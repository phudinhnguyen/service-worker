import { Col, Row, Typography } from "antd";
import React from "react";
import TimeLineComponent from "./Components/TimeLine";
import { TimeLineListMedia } from "./Components/TimeLineListMedia";
import moment from "moment";
interface Props {}

const MediaLibrary = (props: Props) => {
  return (
    <Row className="w-100">
      <Col span={24}>
        <Typography.Title className="title-curent-date color-yellow" level={4}>
          {moment().format("MMMM YYYY")}
        </Typography.Title>
      </Col>
      <Col span={18} md={18} lg={20}>
        <TimeLineListMedia />
      </Col>
      <Col span={6} md={6} lg={4}>
        <TimeLineComponent />
      </Col>
    </Row>
  );
};
export default MediaLibrary;
