import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import "./style.css";
import "antd/dist/antd.min.css";
import { Button, Modal, Table, Form, Row, Col, Image, Typography } from "antd";

const StudentAccounts = (props) => {
  const [form] = Form.useForm();
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [printId, setPrintId] = useState(false);
  const [pedningImg, setPendingImg] = useState();
  const [viewData, setViewData] = useState();
  const [isView, setIsView] = useState(false);
  const { studentAccount } = props;

  const ViewRecord = async (record) => {
    fetch(`/uploads/${record.imgpath}`)
      .then((res) => res.blob())
      .then(
        (result) => {
          setPendingImg(URL.createObjectURL(result));
        },
        (error) => {
          console.log(error);
        }
      );
    setIsView(true);
    setViewData(record);
  };
  const handleCancel = async () => {
    form.resetFields();
    setIsView(false);
  };

  const handlePrint = () => {
    setPrintId(true);
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const onFinish = async (values) => {};

  const onFinishFailed = (error) => {};

  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      width: "10%",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "15%",
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      key: "middleName",
      width: "10%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "10%",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      width: "10%",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
      width: "5%",
    },
    {
      title: "Status",
      dataIndex: "acctStatus",
      key: "acctStatus",
      width: "10%",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "10%",
      render: (record) => (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              key="view"
              onClick={() => {
                ViewRecord(record);
              }}
            >
              View Details
            </Button>
          </div>
        </>
      ),
    },
  ];

  const initialValues = {
    acctStatus: viewData?.acctStatus,
  };

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
            <span className="las la-bars">Student Accounts</span>
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
        <Table columns={columns} dataSource={studentAccount.body} />
      </main>
      <Modal
        title={printId ? "Library Card" : "Account Details"}
        width={1200}
        open={isView}
        onCancel={() => {
          setIsView(false);
        }}
        footer={[
          <>
            {viewData ? (
              <>
                {viewData.acctStatus === "Pending" ? (
                  <Button key="approve">Approve Account</Button>
                ) : null}
              </>
            ) : null}
          </>,
          <Button key="print" onClick={handlePrint}>
            Print Library Card
          </Button>,
          <Button
            key="cancel"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </Button>,
        ]}
      >
        {viewData ? (
          <>
            <Form
              form={form}
              labelCol={{
                span: 24,
              }}
              initialValues={initialValues}
              layout="horizontal"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{
                width: "100%",
                maxHeight: "100vh",
              }}
            >
              <Row
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 40,
                }}
              >
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <Typography.Title
                    level={3}
                    style={{
                      margin: 0,
                      width: "100%",
                    }}
                  >
                    PAMPANGA HIGH SCHOOL LIBRARY
                  </Typography.Title>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 8 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Row gutter={12}>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                      <Form.Item label="ID Picture">
                        <Image width={200} height={200} src={pedningImg} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
                      <Form.Item label="QR Code">
                        <Image width={200} height={200} src={viewData.QRCode} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Row gutter={6}>
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      layout="horizontal"
                    >
                      <Form.Item label="Student ID" name="studentId">
                        <Typography.Title
                          level={5}
                          style={{
                            margin: 0,
                            width: "100%",
                          }}
                        >
                          {viewData.studentId}
                        </Typography.Title>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      layout="horizontal"
                    >
                      <Form.Item label="Name" name="name">
                        <Typography.Title
                          level={5}
                          style={{
                            margin: 0,
                            width: "100%",
                          }}
                        >
                          {`${viewData.lastName}, ${viewData.firstName} ${viewData.middleName}`}
                        </Typography.Title>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      layout="horizontal"
                    >
                      <Form.Item label="Email" name="email">
                        <Typography.Title
                          level={5}
                          style={{
                            margin: 0,
                            width: "100%",
                          }}
                        >
                          {viewData.email}
                        </Typography.Title>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      layout="horizontal"
                    >
                      <Form.Item label="Address" name="address">
                        <Typography.Title
                          level={5}
                          style={{
                            margin: 0,
                            width: "100%",
                          }}
                        >
                          {viewData.address}
                        </Typography.Title>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Row gutter={6}>
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      layout="horizontal"
                    >
                      <Form.Item label="Grade and Section" name="grade&sec">
                        <Typography.Title
                          level={5}
                          style={{
                            margin: 0,
                            width: "100%",
                          }}
                        >
                          {`${viewData.grade} - ${viewData.section}`}
                        </Typography.Title>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      layout="horizontal"
                    >
                      <Form.Item label="Gender" name="gender">
                        <Typography.Title
                          level={5}
                          style={{
                            margin: 0,
                            width: "100%",
                          }}
                        >
                          {viewData.gender}
                        </Typography.Title>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </>
        ) : null}
      </Modal>
    </>
  );
};

export default StudentAccounts;
