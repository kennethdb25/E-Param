import React, { useContext, useRef, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import { Col, Row, Table, Button, Space, Input, message, List } from "antd";
import {
  SearchOutlined,
  ReadOutlined,
  UndoOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./style.css";
import "antd/dist/antd.min.css";

const Settings = (props) => {
  const { adminAccount, librarianAccount} = props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [viewDetailsData, setViewDetailsData] = useState(null);

  const onViewDetails = async (record, e) => {
    e.defaultPrevented = true;
    setViewDetailsData(record);
  };

  let adminCount = 0;
  for (var key1 in adminAccount) {
    if (adminAccount.hasOwnProperty(key1)) {
      adminCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationAdmin, setPaginationAdmin] = useState({
    defaultCurrent: 1,
    pageSize: 10,
    total: adminCount,
  });

  let librarianCount = 0;
  for (var key2 in librarianAccount) {
    if (librarianAccount.hasOwnProperty(key2)) {
      librarianCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationLibrarian, setPaginationLibrarian] = useState({
    defaultCurrent: 1,
    pageSize: 10,
    total: librarianCount,
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex, colName) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          prefix={<SearchOutlined style={{ marginRight: "10px" }} />}
          placeholder={`Search ${colName}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            borderRadius: "10px",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 100,
            }}
          >
            Search
          </Button>
          <Button
            type="link"
            size="small"
            icon={<UndoOutlined />}
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
              confirm({
                closeDropdown: true,
              });
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : "white",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // VIEW DETAILS


  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      width: "10%",
      ...getColumnSearchProps("employeeId", "Employee ID"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "10%",
      ...getColumnSearchProps("lastName", "Last Name"),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "10%",
      ...getColumnSearchProps("firstName", "First Name"),
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      key: "middleName",
      width: "10%",
      ...getColumnSearchProps("middleName", "Middle Name"),
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      width: "10%",
    },
    {
      title: "Accoount Status",
      dataIndex: "acctStatus",
      key: "acctStatus",
      width: "15%",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Disabled",
          value: "Disabled",
        },
      ],
      onFilter: (value, record) => record.acctStatus.indexOf(value) === 0,
    },
    {
      title: (
        <>
          {loginData?.validUser?.userType === "Librarian" ||
          loginData?.validUser?.userType === "Super Admin" ? (
            <div>
              <Button
                type="primary"
                shape="round"
                icon={<PlusCircleOutlined />}
                // onClick={() => handleOpenModal()}
                style={{
                  backgroundColor: "#000080",
                  border: "1px solid #d9d9d9",
                }}
              >LIBRARIAN ACCOUNT
              </Button>
            </div>
          ) : null}
        </>
      ),
      dataIndex: "",
      key: "",
      width: "15%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              icon={<ReadOutlined />}
              type="primary"
              onClick={(e) => {
                onViewDetails(record, e);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              Account Details
            </Button>
          </div>
        </>
      ),
    },
  ];

  const columnAdmin = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      width: "10%",
      ...getColumnSearchProps("employeeId", "Employee ID"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "10%",
      ...getColumnSearchProps("lastName", "Last Name"),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "10%",
      ...getColumnSearchProps("firstName", "First Name"),
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      key: "middleName",
      width: "10%",
      ...getColumnSearchProps("middleName", "Middle Name"),
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      width: "10%",
    },
    {
      title: "Accoount Status",
      dataIndex: "acctStatus",
      key: "acctStatus",
      width: "15%",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Disabled",
          value: "Disabled",
        },
      ],
      onFilter: (value, record) => record.acctStatus.indexOf(value) === 0,
    },
    {
      title: (
        <>
          {loginData?.validUser?.userType === "Librarian" ||
          loginData?.validUser?.userType === "Super Admin" ? (
            <div>
              <Button
                type="primary"
                shape="round"
                icon={<PlusCircleOutlined />}
                // onClick={() => handleOpenModal()}
                style={{
                  backgroundColor: "#000080",
                  border: "1px solid #d9d9d9",
                }}
              >
                ADMIN ACCOUNT
              </Button>
            </div>
          ) : null}
        </>
      ),
      dataIndex: "",
      key: "",
      width: "10%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              icon={<ReadOutlined />}
              type="primary"
              onClick={(e) => {
                onViewDetails(record, e);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              Account Details
            </Button>
          </div>
        </>
      ),
    },
  ];

  const columnAnnouncement = [
    {
      title: "ID",
      dataIndex: "announcementId",
      key: "announcementId",
      width: "10%",
      ...getColumnSearchProps("announcementId", "ID"),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "30%",
      ...getColumnSearchProps("content", "Content"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Inactive",
          value: "Inactive",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: (
        <>
          {loginData?.validUser?.userType === "Librarian" ||
          loginData?.validUser?.userType === "Super Admin" ? (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="primary"
                shape="round"
                icon={<PlusCircleOutlined />}
                // onClick={() => handleOpenModal()}
                style={{
                  backgroundColor: "#000080",
                  border: "1px solid #d9d9d9",
                }}
              >
                ADD AN ANNOUNCEMENT
              </Button>
            </div>
          ) : null}
        </>
      ),
      dataIndex: "",
      key: "",
      width: "20%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              icon={<ReadOutlined />}
              type="primary"
              onClick={(e) => {
                onViewDetails(record, e);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              Account Details
            </Button>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (loginData) {
      fetch(`/uploads/${loginData?.validUser.imgpath}`)
        .then((res) => res.blob())
        .then(
          (result) => {
            setImg(URL.createObjectURL(result));
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [loginData]);
  return (
    <>
      <header>
        <h1>
          <label htmlFor="nav-toggle">
            <span className="las la-bars">Settings</span>
          </label>
        </h1>
        <div className="user-wrapper">
          <img src={img} width="40px" height="40px" alt="" />
          <div>
            <h4>{`${loginData?.validUser.firstName} ${loginData?.validUser.lastName}`}</h4>
            <small>{`${loginData?.validUser.userType}`}</small>
          </div>
        </div>
      </header>
      <main>
        <Row gutter={20}>
          <Col span={24}>
            <h3>LIBRARIAN ACCOUNTS</h3>
            <Table columns={columns} dataSource={librarianAccount}pagination={paginationLibrarian}/>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={24}>
            <h3 style={{ marginTop: "20px" }}>ADMIN ACCOUNTS</h3>
            <Table columns={columnAdmin} dataSource={adminAccount} pagination={paginationAdmin}/>
          </Col>
        </Row>
        <Row gutter={20} style={{ marginTop: "30px" }}>
          <Col sxs={24} md={12}>
            <h3>ATTENDACE ANNOUNCEMENT</h3>
            <Table columns={columnAnnouncement} />
          </Col>
          <Col xs={24} md={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <h3>SECTION SETTINGS</h3>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                style={{
                  backgroundColor: "#000080",
                  border: "1px solid #d9d9d9",
                }}
              >
                ADD SECTIION
              </Button>
            </div>
            <div
              id="scrollableDiv"
              style={{
                height: 600,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
                backgroundColor: "f9f9f9",
              }}
            >
              <List></List>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default Settings;
