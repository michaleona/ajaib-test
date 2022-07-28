import { Row, Col } from "antd";
import { Toolbar } from "../components/Toolbar";
import { UserTable } from "../components/UserTable";

export default () => {
  return (
    <Row justify="center" style={{ paddingTop: 60 }}>
      <Col span={16}>
        <Toolbar />
        <UserTable />
      </Col>
    </Row>
  );
};
