import React from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Row, Col, Button } from "antd";
import { Typography, Box, Link } from "@mui/material";
import useStyles from "./style";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.min.css";

const LibrarianLoginForm = (props) => {
  const classes = useStyles();
  const history = useNavigate();
  const { LoginValid } = props;

  const onFinish = async (values) => {
    const data = await fetch("/librarian/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res = await data.json();
    console.log(res);
    if (res.status === 201) {
      LoginValid();
      toast.success("Logged In", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setTimeout(() => {
        let arry = res.result.userEmail.tokens;
        console.log(arry)
        let lastElement = arry[arry.length - 1];
        localStorage.setItem("librarianToken", lastElement.token);
        history("/dashboard");
      }, 3000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };
  const onFinishFailed = async (error) => {
    console.log(error);
  };

  return (
    <Box className={classes.loginCard}>
      <ToastContainer />
      <Box alignItems="center">
        <Typography fontSize="32px">LIBRARIAN LOGIN</Typography>
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
          label="Email"
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
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
      <Box className={classes.loginDetails}>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item>
              <Typography
                component={Link}
                style={{ textDecoration: "none"}}
                href="/forgot-password"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                Forgot Password?
              </Typography>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            LOGIN
          </Button>
        </Form.Item>
      </Box>
      </Form>
    </Box>
  );
};

export default LibrarianLoginForm;
