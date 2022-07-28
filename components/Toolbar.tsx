import { Row, Col, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { setGender } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export const Toolbar = () => {
  const dispatch = useDispatch();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
  };

  const onGenderChange = (value: string) => {
    dispatch(setGender(value));
  };

  return (
    <Row gutter={8}>
      <Col style={{ marginRight: 16 }}>
        Search
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search..."
          allowClear
          onChange={onChange}
        />
      </Col>
      <Col>
        Gender
        <br />
        <Select
          onChange={onGenderChange}
          defaultValue="all"
          style={{ width: 120 }}
        >
          <Option value="all">All</Option>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Col>
      <Col>
        <br />
        <Button>Reset Filter</Button>
      </Col>
    </Row>
  );
};
