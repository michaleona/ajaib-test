import { Table, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useState, useEffect, useRef } from "react";
import {
  selectPaginationState,
  selectFiltersState,
  selectSorterState,
  setSorter,
  setPagination,
  setIsResetFilter,
  selectResetFilterState,
} from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

interface DataType {
  login: string;
  name: string;
  email: string;
  registered: string;
}
export const UserTable = () => {
  const filters = useSelector(selectFiltersState);
  const sorter: SorterResult<DataType> = useSelector(selectSorterState);
  const pagination = useSelector(selectPaginationState);
  const resetFilter = useSelector(selectResetFilterState);
  const dispatch = useDispatch();

  const firstUpdate = useRef(true);

  const [users, setUsers] = useState(null);
  const [isLoading, setLoader] = useState(true);
  const columns: ColumnsType<DataType> = [
    {
      title: "Username",
      dataIndex: "login",
      render: (login) => <span>{login.username}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      sorter: true,
      sortOrder: sorter.field === "name" ? sorter.order : null,
      render: (name) => (
        <span>
          {name.first} {name.last}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      sortOrder: sorter.field === "email" ? sorter.order : null,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: true,
      sortOrder: sorter.field === "gender" ? sorter.order : null,
    },
    {
      title: "Registered Date",
      dataIndex: "registered",
      sorter: true,
      sortOrder: sorter.field === "registered" ? sorter.order : null,
      width: "24%",
      render: (registered) => (
        <span>{moment(registered.date).format("DD-MM-YYYY HH:mm")}</span>
      ),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (sorter.hasOwnProperty("column")) {
      dispatch(setSorter(sorter as SorterResult<DataType>));
    }
    dispatch(setPagination({ ...pagination, current: pagination.current }));
  };

  const loadUsers = (sorter, pagination) => {
    setLoader(true);
    const queryParams: Params = new URLSearchParams();

    if (sorter && sorter.order) {
      queryParams.append("sortBy", sorter.field);
      queryParams.append("sortOrder", sorter.order);
    }
    if (filters.gender && filters.gender !== "all") {
      queryParams.append("gender", filters.gender);
    }
    if (filters.search) {
      queryParams.append("keyword", filters.search);
    }
    queryParams.append("page", pagination.current);
    queryParams.append("pageSize", pagination.pageSize);
    queryParams.append("results", 100);

    fetch(
      `https://randomuser.me/api?inc=gender,name,registered,login,email,phone&${queryParams.toString()}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoader(false);
      })
      .catch(() => {
        message.error("Cannot fetch data. Reload the page.");
        setLoader(false);
      });
  };

  useEffect(() => {
    loadUsers(sorter, pagination);
  }, [pagination, sorter]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (resetFilter) {
      dispatch(setIsResetFilter(false));
      return;
    }
    dispatch(setPagination({ ...pagination, current: 1 }));
    dispatch(setSorter({ field: null, order: null }));
  }, [filters]);

  return (
    <Table
      loading={isLoading}
      style={{ paddingTop: 40 }}
      columns={columns}
      pagination={pagination}
      showSorterTooltip={false}
      dataSource={users}
      onChange={onChange}
      rowKey="phone"
    />
  );
};
