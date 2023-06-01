import React from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Row, Col } from "antd";
import { Typography, Box, Button, Link } from "@mui/material";
import useStyles from "./style";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.min.css";

const LoginForm = (props) => {
  const classes = useStyles();
  const history = useNavigate();
  const { showSignUpForm } = props;

  const handleLogin = (e) => {
    e.preventDefault();
    history("/dashboard")
  }
  const onFinish = async (values) => {
    console.log(values);
  };
  const onFinishFailed = async (error) => {
    console.log(error);
  };

  const width = window.innerWidth;
  return (
    <Box className={classes.loginCard}>
      <ToastContainer />
      <Box alignItems="center">
        <Typography fontSize="32px">Student Login</Typography>
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
      </Form>
      <Box className={classes.loginDetails}>
        <Row gutter={8}>
          {width >= 450 ? (
            <>
              <Col xs={{ span: 24 }} md={{ span: 24 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Form.Item>
                    <Typography
                      onClick={showSignUpForm}
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      Don't have an account? Sign Up Here!
                    </Typography>
                  </Form.Item>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col xs={{ span: 24 }} md={{ span: 24 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Form.Item>
                    <Typography
                      onClick={showSignUpForm}
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      Don't have an account?
                    </Typography>
                  </Form.Item>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Form.Item>
                    <Typography
                      onClick={showSignUpForm}
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      Sign Up Here!
                    </Typography>
                  </Form.Item>
                </div>
              </Col>
            </>
          )}
        </Row>
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
          <Button type="submit" variant="contained" onClick={handleLogin}>
            LOGIN
          </Button>
        </Form.Item>
      </Box>
    </Box>
  );
};

export default LoginForm;
