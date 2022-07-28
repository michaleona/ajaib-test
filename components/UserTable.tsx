import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useState, useEffect } from "react";
import { selectGenderState } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

interface DataType {
  login: string;
  name: string;
  email: string;
  registered: string;
}

interface ParamsType {
  sorter: {
    field: "";
    order: "";
  };
}

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
  },
  {
    title: "Gender",
    dataIndex: "gender",
    sorter: true,
  },
  {
    title: "Registered Date",
    dataIndex: "registered",
    sorter: true,
    width: "24%",
    render: (registered) => <span>{registered.date}</span>,
  },
];

export const UserTable = () => {
  const gender = useSelector(selectGenderState);

  const [users, setUsers] = useState(null);
  const [isLoading, setLoader] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 100,
    pageSize: 10,
    showSizeChanger: false,
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    let params: ParamsType = {
      sorter: null,
    };
    if (sorter.hasOwnProperty("column")) {
      params.sorter = { field: sorter.field, order: sorter.order };
    }
    setPagination((prevState) => {
      return { ...prevState, current: pagination.current };
    });

    loadUsers(params, pagination);
  };

  const loadUsers = (params = null, pagination) => {
    setLoader(true);
    const queryParams: Params = new URLSearchParams();
    console.log(pagination);
    queryParams.append("page", pagination.current);
    queryParams.append("pageSize", pagination.pageSize);
    queryParams.append("results", 100);
    if (params && params.sorter.order) {
      queryParams.append("sortBy", params.sorter.field);
      queryParams.append("sortOrder", params.sorter.order);
    }
    if (gender && gender !== "all") {
      queryParams.append("gender", gender);
    }
    fetch(`https://randomuser.me/api?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoader(false);
      });
  };

  useEffect(() => {
    loadUsers(null, pagination);
  }, []);

  useEffect(() => {
    loadUsers(null, pagination);
  }, [gender]);

  return (
    <Table
      loading={isLoading}
      style={{ paddingTop: 24 }}
      columns={columns}
      pagination={pagination}
      dataSource={users}
      onChange={onChange}
    />
  );
};
