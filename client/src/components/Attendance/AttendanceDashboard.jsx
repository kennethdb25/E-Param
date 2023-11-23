import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Box } from "@mui/material";
import {
  PageHeader,
  Descriptions,
  Row,
  Col,
  Input,
  Image,
  Divider,
} from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  UserOutlined,
  InfoCircleOutlined,
  MailOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "./styles.css";

const AttendanceDashboard = (props) => {
  const { activeAnnouncement } = props;
  let time = new Date().toLocaleTimeString();
  let date = new Date().toDateString();
  const classes = useStyles();
  const [studentInfo, setStudentInfo] = useState("");
  const [attendanceData, setAttendanceData] = useState("");
  const [viewDeatailsImg, setViewDeatailsImg] = useState();
  const [ctime, setCtime] = useState(time);
  const [cdate, setCdate] = useState(date);
  const [totalStudents, seTotalStudents] = useState("");
  const [totalTimeIn, setTotalTimeIn] = useState("");
  const [totalTimeOut, setTotalTimeOut] = useState("");

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    date = new Date().toDateString();
    setCtime(time);
    setCdate(date);
  };

  setInterval(updateTime, 1000);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader-library", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(successReadLibraryCard, errorReadLibraryCard);

    function successReadLibraryCard(result) {
      fetchStudentData(result);
      addAttendanceData(result);
      getAttendaceAnalytics();
      scanner.pause();
      setTimeout(() => {
        scanner.resume();
        setStudentInfo("");
        setViewDeatailsImg();
        getAttendaceAnalytics();
      }, 5000);
      // setScannerOpen(false);
      // setEnableBookScanBtn(false);
      // fetchStudentData(result);
    }

    function errorReadLibraryCard(error) {
      // scanner.clear();
      // console.error(error);
    }
  }, []);

  const fetchStudentData = async (studentId) => {
    const data = await fetch(`/student/get-info?studentId=${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setStudentInfo(res.body);
  };

  const addAttendanceData = async (studentId) => {
    const data = await fetch(`/add-attendance?studentId=${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setAttendanceData(res.body);
  };

  const getAttendaceAnalytics = async () => {
    const data = await fetch("/get-attendance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await data.json();
    seTotalStudents(res.body[0]);
    setTotalTimeIn(res.body[1]);
    setTotalTimeOut(res.body[2]);
  };

  useEffect(() => {
    if (studentInfo) {
      fetch(`/uploads/${studentInfo?.imgpath}`)
        .then((res) => res.blob())
        .then(
          (result) => {
            setViewDeatailsImg(URL.createObjectURL(result));
          },
          (error) => {
            console.log(error);
          }
        );
    }
    getAttendaceAnalytics();
  }, [studentInfo]);

  let studName = studentInfo
    ? `${studentInfo?.lastName}, ${studentInfo?.firstName} ${studentInfo.middleName}`
    : "";
  return (
    <Box className={classes.attendanceContainer}>
      <p className="marquee">
        <span>
          <p
            style={{
              display: "inline-flex",
              marginBottom: "0",
              fontWeight: "bold",
              alignItems: "center",
            }}
          >
            {`Announcement: `}
            {activeAnnouncement
              ? activeAnnouncement.content
              : "NO ANNOUNCEMENT"}
          </p>
        </span>
      </p>
      <PageHeader
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
        ghost={false}
        title="ATTENDANCE LIBRARY"
      >
        <Descriptions title={"ATTENDANCE ANALYSIS"} size="medium" column={3}>
          <Descriptions.Item label="Total Students(Today)">
            {totalStudents}
          </Descriptions.Item>
          <Descriptions.Item label="Total Time-in(Today)">
            {totalTimeIn}
          </Descriptions.Item>
          <Descriptions.Item label="Total Time-out(Today)">
            {totalTimeOut}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          title={
            <Divider>
              <h3>STUDENT DETAILS</h3>
            </Divider>
          }
          size="medium"
          column={2}
        >
          <Descriptions.Item label="ACCOUNT INFO" style={{ margin: 20 }}>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
                  <Input
                    value={studName}
                    prefix={<UserOutlined style={{ marginRight: "10px" }} />}
                    placeholder="Student Name"
                    style={{ borderRadius: "10px", marginTop: "15px" }}
                    readOnly
                  />
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 12 }} layout="vertical">
                  <Input
                    value={studentInfo?.studentId}
                    prefix={<UserOutlined style={{ marginRight: "10px" }} />}
                    placeholder="Student ID"
                    style={{ borderRadius: "10px", marginTop: "15px" }}
                    readOnly
                  />
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 12 }} layout="vertical">
                  <Input
                    value={studentInfo?.email}
                    prefix={<MailOutlined style={{ marginRight: "10px" }} />}
                    placeholder="Email Address"
                    style={{ borderRadius: "10px", marginTop: "15px" }}
                    readOnly
                  />
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 12 }} layout="vertical">
                  <Input
                    value={studentInfo?.grade}
                    prefix={
                      <InfoCircleOutlined style={{ marginRight: "10px" }} />
                    }
                    placeholder="Grade"
                    style={{ borderRadius: "10px", marginTop: "15px" }}
                    readOnly
                  />
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 12 }} layout="vertical">
                  <Input
                    value={studentInfo?.section}
                    prefix={
                      <InfoCircleOutlined style={{ marginRight: "10px" }} />
                    }
                    placeholder="Section"
                    style={{ borderRadius: "10px", marginTop: "15px" }}
                    readOnly
                  />
                </Col>
                {viewDeatailsImg ? (
                  <>
                    <Col xs={{ span: 12 }} md={{ span: 12 }} layout="vertical">
                      <Input
                        value={attendanceData.attendanceStatus}
                        prefix={
                          <UserOutlined style={{ marginRight: "10px" }} />
                        }
                        placeholder="Student ID"
                        style={{ borderRadius: "10px", marginTop: "15px" }}
                        readOnly
                      />
                    </Col>
                    <Col xs={{ span: 12 }} md={{ span: 12 }} layout="vertical">
                      <Input
                        value={new Date(
                          attendanceData.attendanceDate
                        ).toLocaleString()}
                        prefix={
                          <UserOutlined style={{ marginRight: "10px" }} />
                        }
                        placeholder="Student ID"
                        style={{ borderRadius: "10px", marginTop: "15px" }}
                        readOnly
                      />
                    </Col>
                  </>
                ) : null}
                {!viewDeatailsImg ? (
                  <Col
                    xs={{ span: 24 }}
                    md={{ span: 24 }}
                    layout="vertical"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      marginTop: "30px",
                      backgroundColor: "#ffbf00fd",
                      // padding: 10,
                      borderRadius: "10px",
                    }}
                  >
                    <h1
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      <FieldTimeOutlined /> {ctime}
                    </h1>
                    <h1
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      <CalendarOutlined /> {cdate}
                    </h1>
                  </Col>
                ) : null}
              </Row>
              {viewDeatailsImg ? (
                <>
                  <Row
                    gutter={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Col xs={{ span: 24 }} md={{ span: 24 }} layout="vertical">
                      <Image
                        height={300}
                        width={300}
                        src={viewDeatailsImg}
                        alt="Student Image"
                      />
                    </Col>
                  </Row>
                </>
              ) : null}
            </Col>
          </Descriptions.Item>
          <Descriptions.Item label="QR SCANNER">
            <div
              id="reader-library"
              style={{ height: 500, width: 600, margin: 20 }}
            ></div>
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </Box>
  );
};

export default AttendanceDashboard;
