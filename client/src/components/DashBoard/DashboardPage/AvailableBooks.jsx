import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Table,
  Tabs,
  Button,
  Popconfirm,
  message,
  Input,
  Space,
} from "antd";
import {
  SearchOutlined,
  ReadOutlined,
  PlusSquareOutlined,
  UndoOutlined
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { LoginContext } from "../../../Context/Context";
import "./style.css";
import "antd/dist/antd.min.css";
import { AvailableBooksDetailsModal } from "../AntdComponents/Modal/modal";

const AvailableBooks = (props) => {
  const { genre, setCurrentActive, getAddShelfPerStudent } = props;
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

  const onConfirmReserve = async (e, record) => {
    e.defaultPrevented = true;
    record.studentId = loginData.validUser.studentId;
    record.firstName = loginData.validUser.firstName;
    record.middleName = loginData.validUser.middleName;
    record.lastName = loginData.validUser.lastName;
    record.grade = loginData.validUser.grade;
    record.section = loginData.validUser.section;
    record.email = loginData.validUser.email;

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
  };

  const onChange = (key) => {
    setActiveTab(genre[key - 1]);
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
      width: "30%",
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
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      width: "10%",
      ...getColumnSearchProps("genre", "Genre"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
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
            {loginData.validUser.userType === "Student" ? (
              <>
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
    if(loginData){
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
            <span className="las la-bars">Available Books</span>
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
        <div className="card-body">
          <div className="table-responsive">
            <Tabs
              onChange={onChange}
              type="card"
              items={genre.map((bookName, index) => {
                const id = String(index + 1);
                return {
                  label: `${bookName}`,
                  key: id,
                  children: <h1 key={id}>{`${bookName}`}</h1>,
                };
              })}
            />
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
