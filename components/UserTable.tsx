import { Table, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useState, useEffect } from "react";
import { selectGenderState, selectSearchState } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

interface DataType {
  login: string;
  name: string;
  email: string;
  registered: string;
}

interface ParamsType {
  sorter: {};
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
  const search = useSelector(selectSearchState);

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
    queryParams.append("page", pagination.current);
    queryParams.append("pageSize", pagination.pageSize);
    queryParams.append("results", 100);
    if (params && params.sorter) {
      if (params.sorter.order !== undefined) {
        queryParams.append("sortBy", params.sorter.field);
        queryParams.append("sortOrder", params.sorter.order);
      }
    }
    if (gender && gender !== "all") {
      queryParams.append("gender", gender);
    }
    if (search) {
      queryParams.append("keyword", "anto");
    }
    fetch(
      `https://randomuser.me/api?inc=gender,name,registered,login,${queryParams.toString()}&seed=abc`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoader(false);
      })
      .catch(() => {
        message.error("Cannot fetch data. Reload the page.");
      });
  };

  useEffect(() => {
    loadUsers(null, pagination);
  }, [gender, search]);

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
