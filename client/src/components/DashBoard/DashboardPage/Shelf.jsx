import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import { Table, Button, Modal, Form } from "antd";
import "./style.css";
import "antd/dist/antd.min.css";

const Shelf = (props) => {
  const { getAddToShelf, paginationStudentShelf } = props;
  const [form] = Form.useForm();
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [processModal, setProcessModal] = useState(false);
  const [recordedData, setRecordedData] = useState();

  const handleProcess = (e, record) => {
    e.defaultPrevented = true;
    setRecordedData(record);
    setProcessModal(true)
    console.log(record);
    console.log(e);
  };

  const onCancelProcess = () => {
    form.resetFields();
    setProcessModal(false);
  }

  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      width: "15%",
      // ...getColumnSearchProps("firstName"),
    },
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
      width: "15%",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: "20%",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
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
            <Button onClick={(e) => handleProcess(e, record)}>Process</Button>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetch(`/uploads/${loginData?.validUser?.imgpath}`)
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
            <span className="las la-bars">Shelf Item(s)</span>
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
        <Table
          key="ShelfBook"
          columns={columns}
          dataSource={getAddToShelf}
          pagination={paginationStudentShelf}
        />
      </main>
      {/* Process Modal */}
      <Modal
        key="ProcessModal"
        title="Processing"
        width={1400}
        open={processModal}
        onCancel={onCancelProcess}
        footer={[
          <Button>Process</Button>,
          <Button onClick={onCancelProcess}>Cancel</Button>,
        ]}
      ></Modal>
    </>
  );
};

export default Shelf;
