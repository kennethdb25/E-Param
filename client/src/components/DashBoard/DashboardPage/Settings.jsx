import React, { useContext, useRef, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import {
  Col,
  Row,
  Table,
  Button,
  Space,
  Input,
  Form,
  message,
  Modal,
  Select,
  Divider,
} from "antd";
import {
  SearchOutlined,
  ReadOutlined,
  UndoOutlined,
  PlusCircleOutlined,
  RollbackOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./style.css";
import "antd/dist/antd.min.css";
import { GradeData } from "../../../Data/Data";

const { TextArea } = Input;

const Settings = (props) => {
  const [form] = Form.useForm();
  const {
    adminAccount,
    librarianAccount,
    section,
    sectiionData,
    announcement,
    announcementData,
  } = props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [onOpenSection, setOnOpenSection] = useState(false);
  const [onOpenAnnouncement, setOnOpenAnnouncement] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [viewDetailsData, setViewDetailsData] = useState(null);

  const onViewDetails = async (record, e) => {
    e.defaultPrevented = true;
    setViewDetailsData(record);
  };

  const onSectionChangeStatus = async (record) => {
    const data = await fetch(
      `/change-status-section?sectionId=${record.sectionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    if (res.status === 200) {
      message.success(
        res.body.status === "Active"
          ? "Section Activated Succesfully"
          : "Section Deactivated Successfully"
      );
      sectiionData();
    }
  };

  const onAnnouncementChangeStatus = async (record) => {
    const data = await fetch(
      `/change-status-announcement?announcementId=${record.announcementId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    if (res.status === 200) {
      message.success(
        res.body.status === "Active"
          ? "Announcement Activated Succesfully"
          : "Announcement Deactivated Successfully"
      );
      announcementData();
    }
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

  let sectionCount = 0;
  for (var key3 in section) {
    if (section.hasOwnProperty(key3)) {
      sectionCount++;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [paginationSection, setPaginationSection] = useState({
    defaultCurrent: 1,
    pageSize: 5,
    total: sectionCount,
  });

  const onAddAnnouncement = () => {
    form.resetFields();
    setOnOpenAnnouncement(true);
  };

  const onFinishAnnouncement = async (values) => {
    const data = await fetch("/add-announcement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res = await data.json();
    if (res.status === 201) {
      message.success("Announcement Added Successfully");
      announcementData();
    }
  };

  const onConfirmAnnouncement = () => {
    form.submit();
    setOnOpenAnnouncement(false);
  };

  const onFinishAnnouncementFailed = (error) => {
    console.error(error);
  };

  const onAddSection = () => {
    form.resetFields();
    setOnOpenSection(true);
  };

  const onFinishSection = async (values) => {
    const data = await fetch("/add-section", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res = await data.json();
    if (res.status === 201) {
      message.success("Section Added Successfully");
      sectiionData();
    }
  };

  const onConfirmSection = () => {
    form.submit();
    setOnOpenSection(false);
  };

  const onFinishSectionFailed = (error) => {
    console.error(error);
  };

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
              >
                LIBRARIAN ACCOUNT
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
      width: "70%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Not Active",
          value: "Not Active",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      dataIndex: "",
      key: "",
      width: "20%",
      render: (record) => (
        <>
          <div
          // style={{ display: "flex", justifyContent: "center", gap: "10px", alignItems: "center", justifyContent: "center", alignContent: "center" }}
          >
            <Button
              type="primary"
              onClick={(e) => {
                onAnnouncementChangeStatus(record);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              {record.status === "Active" ? "Deactivate" : "Activate"}
            </Button>
          </div>
        </>
      ),
    },
  ];

  const sectionColumns = [
    {
      title: "ID",
      dataIndex: "sectionId",
      key: "sectionId",
      width: "10%",
      ...getColumnSearchProps("sectionId", "ID"),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      width: "40%",
      filters: [
        {
          text: "Grade 7",
          value: "Grade 7",
        },
        {
          text: "Grade 8",
          value: "Grade 8",
        },
        {
          text: "Grade 9",
          value: "Grade 9",
        },
        {
          text: "Grade 10",
          value: "Grade 10",
        },
        {
          text: "Grade 11",
          value: "Grade 11",
        },
        {
          text: "Grade 12",
          value: "Grade 12",
        },
      ],
      onFilter: (value, record) => record.grade.indexOf(value) === 0,
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
      width: "40%",
      ...getColumnSearchProps("section", "Content"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
    },
    {
      dataIndex: "",
      key: "",
      width: "20%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              type="primary"
              onClick={() => {
                onSectionChangeStatus(record);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              {record.status === "Active" ? "Deactivate" : "Activate"}
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
        {loginData.validUser?.userType === "Super Admin" ? (
          <>
            <Row gutter={20}>
              <Col span={24}>
                <Divider orientation="left" orientationMargin="0">
                  <h3>LIBRARIAN ACCOUNTS</h3>
                </Divider>
                <Table
                  columns={columns}
                  dataSource={librarianAccount}
                  pagination={paginationLibrarian}
                />
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Divider orientation="left" orientationMargin="0">
                  <h3 style={{ marginTop: "20px" }}>ADMIN ACCOUNTS</h3>
                </Divider>
                <Table
                  columns={columnAdmin}
                  dataSource={adminAccount}
                  pagination={paginationAdmin}
                />
              </Col>
            </Row>
            <Divider orientation="left" orientationMargin="0">
              <h3>OTHER SETTINGS</h3>
            </Divider>
          </>
        ) : null}

        <Row gutter={20} style={{ marginTop: "30px" }}>
          <Col xs={24} md={loginData.validUser.userType === "Super Admin" ? 16 : 24}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <h3>ATTENDANCE ANNOUNCEMENT</h3>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                style={{
                  backgroundColor: "#000080",
                  border: "1px solid #d9d9d9",
                }}
                onClick={() => onAddAnnouncement()}
              >
                ADD ANNOUNCEMENT
              </Button>
            </div>
            <Table columns={columnAnnouncement} dataSource={announcement} />
          </Col>
          {loginData.validUser?.userType === "Super Admin" ? (
            <>
              <Col xs={24} md={8}>
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
                    onClick={() => onAddSection()}
                  >
                    ADD SECTIION
                  </Button>
                </div>
                <Table
                  columns={sectionColumns}
                  dataSource={section}
                  pagination={paginationSection}
                />
              </Col>
            </>
          ) : null}
        </Row>
      </main>
      {/* MODAL ADD ANNOUNCEMENT */}
      <Modal
        key="AnnouncementModel"
        title="ADDING ANNOUCEMENT"
        width={600}
        open={onOpenAnnouncement}
        onCancel={() => setOnOpenAnnouncement(false)}
        footer={[
          <Button
            type="primary"
            icon={<CheckOutlined />}
            key="cancel1"
            onClick={() => onConfirmAnnouncement()}
          >
            Confirm
          </Button>,
          <Button
            type="primary"
            icon={<RollbackOutlined />}
            key="cancel8"
            onClick={() => {
              setOnOpenAnnouncement(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{
            span: 12,
          }}
          layout="horizontal"
          onFinish={onFinishAnnouncement}
          onFinishFailed={onFinishAnnouncementFailed}
          autoComplete="off"
          style={{
            width: "100%",
          }}
        >
          <Row>
            <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
                  <Form.Item
                    label="Announcement"
                    name="content"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please input announcement!",
                      },
                    ]}
                  >
                    <TextArea
                      rows={10}
                      maxLength={120}
                      showCount
                      placeholder="Enter Announcement"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
      {/* MODAL ADD SECTION */}
      <Modal
        key="SectionModel"
        title="ADDING GRADE AND SECTION"
        width={600}
        open={onOpenSection}
        onCancel={() => {
          setOnOpenSection(false);
          form.resetFields();
        }}
        footer={[
          <Button
            type="primary"
            icon={<CheckOutlined />}
            key="cancel4"
            onClick={() => onConfirmSection()}
          >
            Confirm
          </Button>,
          <Button
            type="primary"
            icon={<RollbackOutlined />}
            key="cancel6"
            onClick={() => {
              setOnOpenSection(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{
            span: 12,
          }}
          layout="horizontal"
          onFinish={onFinishSection}
          onFinishFailed={onFinishSectionFailed}
          autoComplete="off"
          style={{
            width: "100%",
          }}
        >
          <Row>
            <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 12 }} layout="vertical">
                  <Form.Item
                    label="Grade"
                    name="grade"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please input grade!",
                      },
                    ]}
                  >
                    <Select placeholder="Select your Grade">
                      {GradeData.map((value, index) => (
                        <Select.Option key={index} value={value.value}>
                          {value.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} layout="vertical">
                  <Form.Item
                    label="Section"
                    name="section"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please input section!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter section" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Settings;
