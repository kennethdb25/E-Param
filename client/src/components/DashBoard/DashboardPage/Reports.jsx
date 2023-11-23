import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import {
  Col,
  Form,
  Row,
  Select,
  Divider,
  List,
  Skeleton,
  DatePicker,
  Space,
  Button,
  Typography,
  message,
} from "antd";
import { BarChartOutlined, LogoutOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { GiHamburgerMenu } from "react-icons/gi";
import "./style.css";
import "antd/dist/antd.min.css";
import { ReportData } from "../../../Data/Data";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const Reports = (props) => {
  const { handleLogout } = props;
  const [form] = Form.useForm();
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reportDate, setReportDate] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch("/report/get-generated")
      .then((res) => res.json())
      .then((body) => {
        setData([...body.body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async (values) => {
    values.start = reportDate[0];
    values.end = reportDate[1];

    const data = await fetch("/report/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res = await data.json();
    if (res.status === 201) {
      form.resetFields();
      message.success("Reports Successfully Generated and Ready to Download");
      loadMoreData();
    }
  };

  const onFinishFailed = (error) => {
    console.error(error);
  };

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

  const onChange = (value, dateString) => {
    setReportDate(dateString);
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const handleDownload = (filename) => {
    window.open(`/report/download-csv?filename=${filename}`, "_blank");
  };
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
              Reports
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
        <Row>
          <Col span={12}>
            <Form
              form={form}
              labelCol={{
                span: 24,
              }}
              layout="horizontal"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{
                width: "100%",
              }}
            >
              <Col xs={24} md={12} layout="vertical">
                <Form.Item
                  label="Please select a report"
                  name="report"
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
                      message: "Please select a report!",
                    },
                  ]}
                >
                  <Select placeholder="Select a Report">
                    {ReportData.map((value, index) => (
                      <Select.Option key={index} value={value.value}>
                        {value.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} layout="vertical">
                <Form.Item
                  label="Custom Date"
                  name="date"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  hasFeedback
                >
                  <Space direction="vertical" size={12}>
                    <RangePicker
                      showTime={{
                        format: "HH:mm",
                      }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={onChange}
                      onOk={onOk}
                    />
                  </Space>
                </Form.Item>
              </Col>
              <Row
                gutter={12}
                style={{
                  display: "flex",
                  justifyContent: "start",
                  paddingTop: "20px",
                }}
              >
                <Button
                  icon={<BarChartOutlined />}
                  style={{
                    backgroundColor: "purple",
                    border: "1px solid #d9d9d9",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Generate Report
                </Button>
              </Row>
            </Form>
          </Col>
          <Col span={12}>
            <Title level={4}>Recently Generated Report</Title>
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
              <InfiniteScroll
                dataLength={data.length}
                loader={
                  <Skeleton
                    avatar
                    paragraph={{
                      rows: 1,
                    }}
                    active
                  />
                }
                endMessage={<Divider plain>Nothing to follow</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item key={item.filePath}>
                      <List.Item.Meta
                        title={<p>{item.filePath.toUpperCase()}</p>}
                        description={new Date(item.created).toLocaleString()}
                      />
                      <div
                        style={{
                          textDecorationLine: "underline",
                          color: "blue",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleDownload(item.filePath);
                        }}
                      >
                        Download
                      </div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default Reports;
