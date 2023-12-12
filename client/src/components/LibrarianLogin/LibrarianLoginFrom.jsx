import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Row, Col, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Box, Link } from "@mui/material";
import useStyles from "./style";
import "antd/dist/antd.min.css";

const { Title } = Typography;

const LibrarianLoginForm = (props) => {
  const classes = useStyles();
  const history = useNavigate();
  const { LoginValid } = props;

  const onFinish = async (values) => {
    const currentDate = new Date().getTime();
    const currentDate1 = new Date().toISOString();
    const split = currentDate1.split("T");
    const startingPoint = new Date(`${split[0]}T00:00:00.000Z`).getTime();
    const endingPoint = new Date(`${split[0]}T09:00:00.000Z`).getTime();
    const currentDay = new Date().getDay();
    if (
      currentDate >= startingPoint &&
      currentDate <= endingPoint &&
      currentDay < 6
    ) {
      const data = await fetch("/librarian/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const res = await data.json();
      if (res.status === 201) {
        LoginValid();
        message.success("Logged In");
        setTimeout(() => {
          let arry = res.result.userEmail.tokens;
          let lastElement = arry[arry.length - 1];
          localStorage.setItem("librarianToken", lastElement.token);
          window.location.reload();
          setTimeout(() => {
            history("/dashboard");
          }, 1000);
        }, 3000);
      } else {
        message.error(res.message);
      }
    } else {
      message.error(
        "Please login during working days and hours( Mon to Fri, 08:00am to 05:00pm)"
      );
    }
  };
  const onFinishFailed = async (error) => {
    console.log(error);
  };

  return (
    <Box className={classes.loginCard}>
      <Box alignItems="center">
        <Title level={2}>LIBRARIAN LOGIN</Title>
      </Box>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={classes.Form}
      >
        <Form.Item
          name="email"
          rules={[
            {
              message: "Email is required",
              required: true,
            },
            { whitespace: true },
            { type: "email", message: "Please enter a valid email" },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined style={{ marginRight: "10px" }} />}
            placeholder="Please enter your email address"
            style={{ borderRadius: "10px" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ marginRight: "10px" }} />}
            placeholder="Please enter your password"
            style={{ borderRadius: "10px" }}
          />
        </Form.Item>
        <Box className={classes.loginDetails}>
          <Row gutter={8}>
            <Col span={24}>
              <Form.Item>
                <Typography
                  component={Link}
                  style={{ textDecoration: "none", color: "gray" }}
                  href="/librarian-forgot-password"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  FORGOT YOUR PASSWORD?
                </Typography>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                backgroundColor: "#FFC000",
                border: "1px solid #d9d9d9",
              }}
            >
              <span style={{ fontSize: "16px" }}>LOGIN</span>
            </Button>
          </Form.Item>
        </Box>
      </Form>
    </Box>
  );
};

export default LibrarianLoginForm;
