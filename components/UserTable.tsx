import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useState, useEffect } from "react";

interface DataType {
  login: string;
  name: string;
  email: string;
  registered: string;
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
const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export const UserTable = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setLoader] = useState(true);

  const loadUsers = () => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoader(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Table
      loading={isLoading}
      style={{ paddingTop: 24 }}
      columns={columns}
      dataSource={users}
      onChange={onChange}
    />
  );
};
