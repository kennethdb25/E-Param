import React, { useContext, useEffect, useState } from "react";
import { Table, Tabs, Button, Popconfirm, message } from "antd";
import { LoginContext } from "../../../Context/Context";
import "./style.css";
import "antd/dist/antd.min.css";

const AvailableBooks = (props) => {
  const { genre, setCurrentActive, getAddShelfPerStudent } = props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [tabData, setTabData] = useState({});
  const [activeTab, setActiveTab] = useState(genre[0]);

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(record)
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

  const columns = [
    {
      title: "Book Name",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "20%",
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
                 <Button>Add to Shelf</Button>
                </Popconfirm>
              </>
            ) : null}
            <Button>View Details</Button>
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
  });

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
        <Table key="AvailableBook" columns={columns} dataSource={tabData[activeTab]} />
      </main>
    </>
  );
};

export default AvailableBooks;
