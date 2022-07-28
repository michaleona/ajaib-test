import { Row, Col, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  setGender,
  setSearch,
  selectGenderState,
  selectSearchState,
  selectPaginationState,
  setPagination,
} from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export const Toolbar = () => {
  const gender = useSelector(selectGenderState);
  const search = useSelector(selectSearchState);
  const pagination = useSelector(selectPaginationState);
  const dispatch = useDispatch();

  const resetPagination = () => {
    if (pagination.current !== 1)
      dispatch(setPagination({ ...pagination, current: 1 }));
    dispatch(setPagination({ ...pagination, current: 1 }));
  };

  const onSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    resetPagination();
    dispatch(setSearch(e.target.value));
  };

  const onGenderChange = (value: string) => {
    resetPagination();
    dispatch(setGender(value));
  };

  const resetFilter = () => {
    resetPagination();
    dispatch(setGender("all"));
    dispatch(setSearch(null));
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
