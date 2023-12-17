import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Table,
  Typography,
  Button,
  Popconfirm,
  message,
  Input,
  Space,
  Divider,
  Select,
} from "antd";
import {
  SearchOutlined,
  ReadOutlined,
  PlusSquareOutlined,
  UndoOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { LoginContext } from "../../../Context/Context";
import { GiHamburgerMenu } from "react-icons/gi";
import "./style.css";
import "antd/dist/antd.min.css";
import { AvailableBooksDetailsModal } from "../AntdComponents/Modal/modal";

const { Title } = Typography;

const AvailableBooks = (props) => {
  const {
    genre,
    setCurrentActive,
    getAddShelfPerStudent,
    getAddToShelf,
    handleLogout,
  } = props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [viewDeatailsImg, setViewDeatailsImg] = useState();
  const [viewDetailsData, setViewDetailsData] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [tabData, setTabData] = useState({});
  const [activeTab, setActiveTab] = useState(genre[0]);

  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const addToShelfText = "Are you sure to reserve this Book?";
  // console.log(getAddToShelf.length)
  const onConfirmReserve = async (e, record) => {
    e.defaultPrevented = true;
    record.studentId = loginData.validUser.studentId;
    record.firstName = loginData.validUser.firstName;
    record.middleName = loginData.validUser.middleName;
    record.userType = loginData.validUser.userType;
    record.lastName = loginData.validUser.lastName;
    record.grade = loginData.validUser.grade;
    record.section = loginData.validUser.section;
    record.email = loginData.validUser.email;
    record.libraryCardNum = loginData.validUser.libraryCardNum;

    if (
      getAddToShelf &&
      getAddToShelf.length <= 4 &&
      loginData.validUser.userType === "Student"
    ) {
      const data = await fetch("/book/add-shelf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
      const res = await data.json();
      if (res.status === 201) {
        getAddShelfPerStudent();
        message.success("Reservation Added to Shelf");
        setCurrentActive(4);
      }
    } else if (loginData.validUser.userType !== "Student") {
      const data = await fetch("/book/add-shelf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
      const res = await data.json();
      if (res.status === 201) {
        getAddShelfPerStudent();
        message.success("Reservation Added to Shelf");
        setCurrentActive(4);
      }
    } else {
      message.warn(
        "You've reached the maximum reservation count, please remove other books from reservation or proceed to Library to complete the process"
      );
    }
  };

  const onViewDetails = async (record, e) => {
    e.defaultPrevented = true;
    setViewDetailsData(record);
    fetch(`/uploads/${record?.imgpath}`)
      .then((res) => res.blob())
      .then(
        (result) => {
          setViewDeatailsImg(URL.createObjectURL(result));
        },
        (error) => {
          console.log(error);
        }
      );
    setViewDetailsModal(true);
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
          placeholder={`Search ${colName}`}
          prefix={<SearchOutlined style={{ marginRight: "10px" }} />}
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

  const columns = [
    {
      title: "Book Name",
      dataIndex: "title",
      key: "title",
      width: "25%",
      ...getColumnSearchProps("title", "Book Name"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
      ...getColumnSearchProps("author", "Author"),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "20%",
      ...getColumnSearchProps("isbn", "ISBN"),
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
      width: "5%",
    },
    {
      title: "Bldg. Loc.",
      dataIndex: "bldgStock",
      key: "bldgStock",
      width: "10%",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (record) => record === 'Reserved' ? 'Out of Stock' : record
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "20%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            {loginData.validUser.userType !== "Super Admin" &&
            loginData.validUser.userType !== "Librarian" ? (
              <>
              {record.qty > 0 ? (
                <Popconfirm
                placement="top"
                title={addToShelfText}
                onConfirm={(e) => onConfirmReserve(e, record)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<PlusSquareOutlined />}
                  style={{
                    backgroundColor: "#000080",
                    border: "1px solid #d9d9d9",
                  }}
                  type="primary"
                >
                  Add to Shelf
                </Button>
              </Popconfirm>
              ) : null}
              </>
            ) : null}
            <Button
              icon={<ReadOutlined />}
              type="primary"
              onClick={(e) => {
                onViewDetails(record, e);
              }}
              style={{ backgroundColor: "purple", border: "1px solid #d9d9d9" }}
            >
              Book Details
            </Button>
          </div>
        </>
      ),
    },
  ];

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setActiveTab(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const options = genre.map((bookName) => ({
    value: bookName,
    label: bookName,
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab && !tabData[activeTab]) {
        try {
          const response = await fetch(
            `/book/get-all-book-per-genre?genre=${activeTab}`
          );
          const data = await response.json();
          setTabData((prevData) => ({
            ...prevData,
            [activeTab]: data,
          }));
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    };
    fetchData();
  }, [activeTab, tabData]);

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

  const width = window.innerWidth;

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
              {width >= 450 ? "Available Book" : "Available"}
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
        <div className="card-body">
          <div className="table-responsive">
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Title
                level={5}
                style={{
                  marginTop: "10px",
                }}
              >
                Search Book Genre Here:
              </Title>
              <Select
                style={{ width: "40%" }}
                showSearch
                placeholder="Search Book Genre"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={options}
              />
            </div>
            <Divider orientation="left" orientationMargin="0">
              <h1 key={activeTab}>{`${activeTab}`}</h1>
            </Divider>
            <Table
              key="AvailableBook"
              columns={columns}
              dataSource={tabData[activeTab]}
            />
            {/* ViewDetails Modal */}
            <AvailableBooksDetailsModal
              viewDetailsModal={viewDetailsModal}
              setViewDetailsModal={setViewDetailsModal}
              setViewDetailsData={setViewDetailsData}
              setViewDeatailsImg={setViewDeatailsImg}
              viewDetailsData={viewDetailsData}
              viewDeatailsImg={viewDeatailsImg}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default AvailableBooks;
