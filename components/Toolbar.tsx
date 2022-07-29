import { Row, Col, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  setFilters,
  selectFiltersState,
  setResetFilter,
} from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import useDebounce from "../hooks/useDebounce";

const { Option } = Select;

export const Toolbar = () => {
  const [search, setSearch] = useState(null);
  const [isReset, setReset] = useState(false);
  const filters = useSelector(selectFiltersState);
  const dispatch = useDispatch();
  const firstUpdate = useRef(true);

  const debouncedSearch = useDebounce(search, 500);

  const onSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  const onGenderChange = (value: string) => {
    dispatch(setFilters({ ...filters, gender: value }));
  };

  const resetFilter = () => {
    setSearch(null);
    setReset(true);
    dispatch(setResetFilter());
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (isReset) {
      setReset(false);
    } else {
      dispatch(setFilters({ ...filters, search: debouncedSearch }));
    }
  }, [debouncedSearch]);

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
          value={filters.gender}
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
