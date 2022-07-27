import { Row, Col, Input, Select, Button } from "antd";

const { Search } = Input;
const { Option } = Select;

export const Toolbar = () => {
  const onSearch = (value: string) => console.log(value);

  const onGenderChange = (value: string) => {
    console.log(value);
  };

  return (
    <Row gutter={8}>
      <Col>
        Search
        <Search placeholder="Search..." onSearch={onSearch} enterButton />
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
