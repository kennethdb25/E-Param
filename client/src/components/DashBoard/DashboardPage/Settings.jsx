import React, { useContext, useRef, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import {
  Col,
  Row,
  Table,
  Button,
  Radio,
  Space,
  Input,
  Form,
  message,
  Modal,
  Select,
  Divider,
  Drawer,
  Upload,
  Typography,
} from "antd";
import {
  SearchOutlined,
  ReadOutlined,
  UndoOutlined,
  PlusCircleOutlined,
  RollbackOutlined,
  CheckOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import Highlighter from "react-highlight-words";
import { GiHamburgerMenu } from "react-icons/gi";
import "./style.css";
import "antd/dist/antd.min.css";
import { GradeData } from "../../../Data/Data";
import {
  AdminAccountDetailsModal,
  LibrarianAccountDetailsModal,
  OtherAccountDetailsModal,
} from "../AntdComponents/Modal/modal";

const { TextArea } = Input;

const { Text } = Typography;

const Settings = (props) => {
  const [form] = Form.useForm();
  const {
    adminAccount,
    librarianAccount,
    otherAccount,
    section,
    sectiionData,
    announcement,
    announcementData,
    handleLogout,
    getInventoryData,
  } = props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [onOpenSection, setOnOpenSection] = useState(false);
  const [onOpenAnnouncement, setOnOpenAnnouncement] = useState(false);
  const [librarianVisible, setLibrarianVisible] = useState(false);
  const [adminVisible, setAdminVisible] = useState(false);
  const [otherVisible, setOtherVisible] = useState(false);
  const [viewLDeatailsImg, setViewLDeatailsImg] = useState();
  const [viewADeatailsImg, setViewADeatailsImg] = useState();
  const [viewODetailsImg, setViewODetailsImg] = useState();
  const [viewLDetailsData, setViewLDetailsData] = useState(null);
  const [viewADetailsData, setViewADetailsData] = useState(null);
  const [viewODetailsData, setViewODetailsData] = useState(null);
  const [viewADetailsModal, setViewADetailsModal] = useState(false);
  const [viewLDetailsModal, setViewLDetailsModal] = useState(false);
  const [viewODetailsModal, setViewODetailsModal] = useState(false);

  const onViewLibrarianDetails = async (record, e) => {
    e.defaultPrevented = true;
    setViewLDetailsData(record);
    fetch(`/uploads/${record?.imgpath}`)
      .then((res) => res.blob())
      .then(
        (result) => {
          setViewLDeatailsImg(URL.createObjectURL(result));
        },
        (error) => {
          console.log(error);
        }
      );
    setViewLDetailsModal(true);
  };

  const onViewAdminDetails = async (record, e) => {
    e.defaultPrevented = true;
    setViewADetailsData(record);
    fetch(`/uploads/${record?.imgpath}`)
      .then((res) => res.blob())
      .then(
        (result) => {
          setViewADeatailsImg(URL.createObjectURL(result));
        },
        (error) => {
          console.log(error);
        }
      );
    setViewADetailsModal(true);
  };

  const onViewOtherDetails = async (record, e) => {
    e.defaultPrevented = true;
    setViewODetailsData(record);
    fetch(`/uploads/${record?.imgpath}`)
      .then((res) => res.blob())
      .then(
        (result) => {
          setViewODetailsImg(URL.createObjectURL(result));
        },
        (error) => {
          console.log(error);
        }
      );
    setViewODetailsModal(true);
  };
  const handleOpenLibrarianModal = () => {
    setLibrarianVisible(true);
  };

  const onCloseLibrarian = () => {
    setLibrarianVisible(false);
    form.resetFields();
  };

  const onFinishLibrarian = async (values) => {
    const newdata = new FormData();
    newdata.append("photo", values.photo.file.originFileObj);
    newdata.append("confirmPassword", values.confirmPassword);
    newdata.append("email", values.email);
    newdata.append("firstName", values.firstName);
    newdata.append("lastName", values.lastName);
    newdata.append("middleName", values.middleName);
    newdata.append("password", values.password);
    newdata.append("employeeId", values.employeeId);

    const res = await fetch("/librarian/register", {
      method: "POST",
      body: newdata,
    });
    if (res.status === 201) {
      message.success("Registered Successfully");
      getInventoryData();
      onCloseLibrarian();
      form.resetFields();
    } else {
      message.error("ID already exists!");
    }
  };

  const handleOpenAdminModal = () => {
    setAdminVisible(true);
  };

  const onCloseAdmin = () => {
    setAdminVisible(false);
    form.resetFields();
  };

  const onFinishAdmin = async (values) => {
    const newdata = new FormData();
    newdata.append("photo", values.photo.file.originFileObj);
    newdata.append("confirmPassword", values.confirmPassword);
    newdata.append("email", values.email);
    newdata.append("firstName", values.firstName);
    newdata.append("lastName", values.lastName);
    newdata.append("middleName", values.middleName);
    newdata.append("password", values.password);
    newdata.append("employeeId", values.employeeId);

    const res = await fetch("/admin/register", {
      method: "POST",
      body: newdata,
    });
    if (res.status === 201) {
      message.success("Registered Successfully");
      getInventoryData();
      onCloseAdmin();
      form.resetFields();
    } else {
      message.error("ID already exists!");
    }
  };

  const handleOpenOtherModal = () => {
    setOtherVisible(true);
  };

  const onCloseOther = () => {
    setOtherVisible(false);
    form.resetFields();
  };

  const onFinishOther = async (values) => {
    console.log(values);
    const newdata = new FormData();
    newdata.append("photo", values.photo.file.originFileObj);
    newdata.append("address", values.address);
    newdata.append("confirmPassword", values.confirmPassword);
    newdata.append("email", values.email);
    newdata.append("firstName", values.firstName);
    newdata.append("gender", values.gender);
    newdata.append("lastName", values.lastName);
    newdata.append("userType", values.userType);
    newdata.append("middleName", values.middleName);
    newdata.append("password", values.password);
    newdata.append("studentId", values.studentId);

    const res = await fetch("/student/register", {
      method: "POST",
      body: newdata,
    });
    const data = await res.json();
    if (data.status === 201) {
      message.success("Registered Successfully");
      onCloseOther();
      getInventoryData();
      form.resetFields();
    } else {
      message.error(data.error);
    }
  };

  const imgprops = {
    beforeUpload: (file) => {
      const isIMG = file.type.startsWith("image");

      if (!isIMG) {
        message.error(`${file.name} is not an image`);
      }

      return isIMG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
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

  let otherCount = 0;
  for (var key10 in otherAccount) {
    if (otherAccount.hasOwnProperty(key10)) {
      otherCount++;
    }
  }

  // eslint-disable-next-line no-unused-vars
  const [paginationOther, setPaginationOther] = useState({
    defaultCurrent: 1,
    pageSize: 10,
    total: otherCount,
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
    } else {
      message.error(res.error);
    }
  };

  const onConfirmSection = () => {
    form.submit();
    getInventoryData();
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
                onClick={() => handleOpenLibrarianModal()}
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
                onViewLibrarianDetails(record, e);
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
                onClick={() => handleOpenAdminModal()}
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
                onViewAdminDetails(record, e);
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

  const columnOthers = [
    {
      title: "Employee ID",
      dataIndex: "studentId",
      key: "studentId",
      width: "10%",
      ...getColumnSearchProps("studentId", "Employee ID"),
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
                onClick={() => handleOpenOtherModal()}
                style={{
                  backgroundColor: "#000080",
                  border: "1px solid #d9d9d9",
                }}
              >
                OTHER ACCOUNT
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
                onViewOtherDetails(record, e);
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
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
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
            <span
              className="las la-bars"
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <GiHamburgerMenu style={{ cursor: "pointer" }} />
              Settings
            </span>
          </label>
        </h1>
        <div className="user-wrapper">
          <img src={img} width="40px" height="40px" alt="" />
          <div>
            <h4>{`${loginData?.validUser.firstName} ${loginData?.validUser.lastName}`}</h4>
            <small>{`${loginData?.validUser.userType}`}</small>
          </div>
          {loginData.validUser?.userType === "Super Admin" ||
          loginData.validUser?.userType === "Librarian" ? (
            <div
              onClick={() => handleLogout()}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
                marginLeft: "15px",
                color: "red",
              }}
            >
              <LogoutOutlined />
              <h3 style={{ margin: "0", color: "red" }}>Logout</h3>
            </div>
          ) : (
            <></>
          )}
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
            <Row gutter={20}>
              <Col span={24}>
                <Divider orientation="left" orientationMargin="0">
                  <h3 style={{ marginTop: "20px" }}>OTHER ACCOUNTS</h3>
                </Divider>
                <Table
                  columns={columnOthers}
                  dataSource={otherAccount}
                  pagination={paginationOther}
                />
              </Col>
            </Row>
            <Divider orientation="left" orientationMargin="0">
              <h3>OTHER SETTINGS</h3>
            </Divider>
          </>
        ) : null}

        <Row gutter={20} style={{ marginTop: "30px" }}>
          <Col
            xs={24}
            md={loginData.validUser.userType === "Super Admin" ? 14 : 24}
          >
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
              <Col xs={24} md={10}>
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
                    ADD SECTION
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

      {/* Adding Librarian Account */}

      <Drawer
        title="LIBRARIAN REGISTRATION"
        placement="right"
        onClose={onCloseLibrarian}
        open={librarianVisible}
        height="100%"
        width="100%"
        style={{ display: "flex", justifyContent: "center" }}
        extra={<Space></Space>}
        footer={[
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "15px",
            }}
          >
            <Button type="primary" onClick={() => form.submit()}>
              Confirm Registration
            </Button>
            <Button type="primary" onClick={onCloseLibrarian}>
              Cancel
            </Button>
          </div>,
        ]}
      >
        <Form
          form={form}
          labelCol={{
            span: 8,
          }}
          layout="horizontal"
          onFinish={onFinishLibrarian}
          autoComplete="off"
          style={{
            width: "100%",
          }}
        >
          <Row>
            {/* <Col xs={{ span: 0 }} md={{ span: 4 }}></Col> */}
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Form.Item
                    label="First Name"
                    name="firstName"
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
                        message: "Please input your first name!",
                      },
                      {
                        pattern: /^[a-zA-Z_ ]*$/,
                        message: "First name should have no number.",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your first name" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Middle Name"
                    name="middleName"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        pattern: /^[a-zA-Z]*$/,
                        message: "Middle name should have no number.",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your middle name" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
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
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your last name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Employee ID"
                    name="employeeId"
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
                        message: "Please input your student ID!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your student ID" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item
                    label="Profile Picture"
                    name="photo"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please upload an image",
                      },
                    ]}
                  >
                    <Upload
                      {...imgprops}
                      listType="picture-card"
                      maxCount={1}
                      onPreview={onPreview}
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Email"
                    name="email"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Password"
                    name="password"
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
                        message: "Please input your password!",
                      },
                      { whitespace: true },
                      { min: 8 },
                      { max: 26 },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/,
                        message:
                          "Must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
                      },
                    ]}
                  >
                    <Input.Password placeholder="********" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                      //offset: 2
                    }}
                    hasFeedback
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Confirm Password is required!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject("Passwords does not matched.");
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="********" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
          </Row>
        </Form>
      </Drawer>

      {/* Adding Admin Account */}

      <Drawer
        title="ADMIN REGISTRATION"
        placement="right"
        onClose={onCloseAdmin}
        open={adminVisible}
        height="100%"
        width="100%"
        style={{ display: "flex", justifyContent: "center" }}
        extra={<Space></Space>}
        footer={[
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "15px",
            }}
          >
            <Button type="primary" onClick={() => form.submit()}>
              Confirm Registration
            </Button>
            <Button type="primary" onClick={onCloseAdmin}>
              Cancel
            </Button>
          </div>,
        ]}
      >
        <Form
          form={form}
          labelCol={{
            span: 8,
          }}
          layout="horizontal"
          onFinish={onFinishAdmin}
          autoComplete="off"
          style={{
            width: "100%",
          }}
        >
          <Row>
            {/* <Col xs={{ span: 0 }} md={{ span: 4 }}></Col> */}
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Form.Item
                    label="First Name"
                    name="firstName"
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
                        message: "Please input your first name!",
                      },
                      {
                        pattern: /^[a-zA-Z_ ]*$/,
                        message: "First name should have no number.",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your first name" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Middle Name"
                    name="middleName"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        pattern: /^[a-zA-Z]*$/,
                        message: "Middle name should have no number.",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your middle name" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
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
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your last name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Employee ID"
                    name="employeeId"
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
                        message: "Please input your student ID!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your student ID" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item
                    label="Profile Picture"
                    name="photo"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please upload an image",
                      },
                    ]}
                  >
                    <Upload
                      {...imgprops}
                      listType="picture-card"
                      maxCount={1}
                      onPreview={onPreview}
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Email"
                    name="email"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Password"
                    name="password"
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
                        message: "Please input your password!",
                      },
                      { whitespace: true },
                      { min: 8 },
                      { max: 26 },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/,
                        message:
                          "Must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
                      },
                    ]}
                  >
                    <Input.Password placeholder="********" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                      //offset: 2
                    }}
                    hasFeedback
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Confirm Password is required!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject("Passwords does not matched.");
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="********" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
          </Row>
        </Form>
      </Drawer>

      {/* Adding Other Account */}

      <Drawer
        title="OTHER ACCOUNT REGISTRATION"
        placement="right"
        onClose={onCloseOther}
        open={otherVisible}
        height="100%"
        width="100%"
        style={{ display: "flex", justifyContent: "center" }}
        extra={<Space></Space>}
        footer={[
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "15px",
            }}
          >
            <Button type="primary" onClick={() => form.submit()}>
              Confirm Registration
            </Button>
            <Button type="primary" onClick={onCloseOther}>
              Cancel
            </Button>
          </div>,
        ]}
      >
        <Form
          form={form}
          labelCol={{
            span: 8,
          }}
          layout="horizontal"
          onFinish={onFinishOther}
          autoComplete="off"
          style={{
            width: "100%",
          }}
        >
          <Row>
            {/* <Col xs={{ span: 0 }} md={{ span: 4 }}></Col> */}
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                  <Form.Item
                    label="First Name"
                    name="firstName"
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
                        message: "Please input your first name!",
                      },
                      {
                        pattern: /^[a-zA-Z_ ]*$/,
                        message: "Numbers or special character are not allowed",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your first name" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Middle Initial"
                    name="middleName"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        pattern: /^[a-zA-Z]*$/,
                        message: "Numbers or special character are not allowed",
                      },
                      {
                        max: 2,
                        message:
                          "Middle Initial cannot be more than 2 character",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your middle name" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
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
                        message: "Please input your last name!",
                      },
                      {
                        pattern: /^[a-zA-Z]*$/,
                        message: "Numbers or special character are not allowed",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your last name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Employee ID"
                    name="studentId"
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
                        message: "Please input your employee ID!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your employee ID" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="User Type"
                    name="userType"
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
                        message: "Please input your grade!",
                      },
                    ]}
                  >
                    <Select placeholder="Select your User Type">
                      <Select.Option key={1} value={"Faculty"}>
                        Faculty
                      </Select.Option>
                      <Select.Option key={2} value={"Staff"}>
                        Staff
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={0}>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item
                    label="Sex"
                    name="gender"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please select your gender!",
                      },
                    ]}
                  >
                    <Radio.Group style={{ width: "100%" }}>
                      <Radio value="Male">Male</Radio>
                      <Radio value="Female">Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item
                    label="Profile Picture"
                    name="photo"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please upload an image",
                      },
                    ]}
                  >
                    <Upload
                      {...imgprops}
                      listType="picture-card"
                      maxCount={1}
                      onPreview={onPreview}
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <Form.Item
                    label="Address"
                    name="address"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please enter your address!",
                      },
                    ]}
                  >
                    <Input placeholder="House No./Street Name/Barangay/Municipality/Province" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Email"
                    name="email"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    hasFeedback
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Password"
                    name="password"
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
                        message: "Please input your password!",
                      },
                      { whitespace: true },
                      { min: 8 },
                      { max: 26 },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/,
                        message:
                          "Must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
                      },
                    ]}
                  >
                    <Input.Password placeholder="********" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                      //offset: 2
                    }}
                    hasFeedback
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Confirm Password is required!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject("Passwords does not matched.");
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="********" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <div className="privacy-data">
                    <Text strong>Note: </Text>
                    <Text>
                      Thank you for choosing to sign up for our library system.
                      We value your privacy and want to assure you that we are
                      committed to protecting the personal information you
                      provide.
                    </Text>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
          </Row>
        </Form>
      </Drawer>

      {/* LIBRARIAN ACCOUNT DETAILS */}

      <LibrarianAccountDetailsModal
        viewLDetailsModal={viewLDetailsModal}
        setViewLDetailsModal={setViewLDetailsModal}
        setViewLDetailsData={setViewLDetailsData}
        setViewLDeatailsImg={setViewLDeatailsImg}
        viewLDetailsData={viewLDetailsData}
        viewLDeatailsImg={viewLDeatailsImg}
      />

      {/* ADMIN ACCOUNT DETAILS */}

      <AdminAccountDetailsModal
        viewADetailsModal={viewADetailsModal}
        setViewADetailsModal={setViewADetailsModal}
        setViewADetailsData={setViewADetailsData}
        setViewADeatailsImg={setViewADeatailsImg}
        viewADetailsData={viewADetailsData}
        viewADeatailsImg={viewADeatailsImg}
      />

      {/* OTHER ACCOUNT DETAILS */}

      <OtherAccountDetailsModal
        viewODetailsModal={viewODetailsModal}
        setViewODetailsModal={setViewODetailsModal}
        setViewODetailsData={setViewODetailsData}
        setViewODetailsImg={setViewODetailsImg}
        viewODetailsData={viewODetailsData}
        viewODetailsImg={viewODetailsImg}
      />
    </>
  );
};

export default Settings;
