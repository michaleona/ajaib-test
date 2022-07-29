import { Row, Col, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  setGender,
  setSearch,
  selectGenderState,
  selectSearchState,
  setResetFilter,
} from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export const Toolbar = () => {
  const gender = useSelector(selectGenderState);
  const search = useSelector(selectSearchState);
  const dispatch = useDispatch();

  const onSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setSearch(e.target.value));
  };

  const onGenderChange = (value: string) => {
    dispatch(setGender(value));
  };

  const resetFilter = () => {
    dispatch(setResetFilter());
  };

  return (
    <Row gutter={8}>
      <Col>
        Search
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search..."
          allowClear
          onChange={onSearch}
          value={search}
        />
      </Col>
      <Col>
        Gender
        <br />
        <Select
          onChange={onGenderChange}
          defaultValue="all"
          style={{ width: 120 }}
          value={gender}
        >
          <Option value="all">All</Option>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Col>
      <Col>
        <br />
        <Button onClick={() => resetFilter()}>Reset Filter</Button>
      </Col>
    </Row>
  );
};
