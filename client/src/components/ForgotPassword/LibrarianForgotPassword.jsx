import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Row, Col } from "antd";
import { Typography, Box, Button } from "@mui/material";
import emailjs from "@emailjs/browser";
import useStyles from "./style";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.min.css";

const LibrarianForgotPassword = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondtStep] = useState(false);
  const [thirdStep, setThirdStep] = useState(false);
  const [fourthStep, setFourthStep] = useState(false);
  const [sendButtonLabel, setSendButtonLabel] = useState("Send");

  const classes = useStyles();
  const history = useNavigate();

  const onStepOne = async (values) => {
    const data = await fetch(`/librarian/forgot-password/${values.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (res.status === 200) {
      toast.success(res.body, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setEmail(values.email);
      setFirstStep(false);
      setSecondtStep(true);
      setOTP(Math.floor(100000 + Math.random() * 900000));
    } else {
      toast.error(res.body, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    }
  };

  const onStepOneFailed = (error) => {
    toast.error("Something went wrong, please try again later", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
  };

  const sendOTP = () => {
    setSendButtonLabel("Resend");
    emailjs.send(
      "service_in36rqr",
      "template_x4esevh",
      {
        otp: OTP,
        email: email,
      },
      "dDsfpQqNAM0v0YbNC"
    );
  };

  const onStepTwo = (values) => {
    // eslint-disable-next-line eqeqeq
    if (values.code == OTP) {
      toast.success("OTP VERIFIED", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setSecondtStep(false);
      setThirdStep(true);
      setSendButtonLabel("Send");
    } else {
      toast.error("INVALID OTP", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const onStepTwoFailed = (error) => {
    toast.error("Something went wrong, please try again later", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
  };

  const onStepThird = async (values) => {
    console.log(values);
    const data = await fetch(`/librarian/forgot-password/${values.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res = await data.json();
    if (res.status === 200) {
      toast.success(res.body, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setThirdStep(false);
      setFourthStep(true);
      form.resetFields();
    }
  };

  const onStepThirdFailed = (error) => {};

  const backToLogin = () => {
    setFourthStep(false);
    setFirstStep(true);
    history("/librarian-login");
  };

  return (
    <Box className={classes.forgotPassContainer}>
      <Box className={classes.forgotPassCard}>
        <Box paddingTop="20px">
          <Typography fontSize="28px">Forgot your Password?</Typography>
        </Box>
        {firstStep ? (
          <>
            <Typography fontSize="16px" paddingTop="20px">
              Please input your email
            </Typography>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{
                remember: true,
              }}
              onFinish={onStepOne}
              onFinishFailed={onStepOneFailed}
              style={{ width: "80%" }}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your email!",
                  },
                  { whitespace: true },
                ]}
                hasFeedback
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Row
                gutter={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Row>
            </Form>
          </>
        ) : null}
        {secondStep ? (
          <>
            <Typography fontSize="16px" paddingTop="20px">
              Please verify the 6 digits OTP sent in your email
            </Typography>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{
                remember: true,
              }}
              onFinish={onStepTwo}
              onFinishFailed={onStepTwoFailed}
              autoComplete="off"
              className={classes.Form}
            >
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input your OTP!",
                  },

                  { min: 6 },
                  { max: 6 },
                ]}
                hasFeedback
              >
                <Input placeholder="6-digits code" />
              </Form.Item>

              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Button variant="contained" onClick={sendOTP}>
              {sendButtonLabel}
            </Button>
          </>
        ) : null}
        {thirdStep ? (
          <>
            <Typography fontSize="16px" paddingTop="20px">
              You can now reset your password
            </Typography>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onStepThird}
              onFinishFailed={onStepThirdFailed}
              autoComplete="off"
              className={classes.Form}
              initialValues={{ email: email }}
            >
              <Form.Item hidden label="Email" name="email">
                <Input value={email} />
              </Form.Item>
              <Row gutter={12}>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item
                    label="Password"
                    name="password"
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
                        message: "Please input your password!",
                      },
                      { whitespace: true },
                      { min: 8 },
                      { max: 26 },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/,
                        message:
                          "Must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    labelCol={{
                      span: 24,
                      //offset: 2
                    }}
                    wrapperCol={{
                      span: 24,
                      //offset: 2
                    }}
                    hasFeedback
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject("Passwords does not matched.");
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Confirm Password" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : null}
        {fourthStep ? (
          <>
            <Typography fontSize="16px" paddingTop="20px">
              Recovery of password has been successfully done!
            </Typography>
            <Button
              variant="contained"
              onClick={backToLogin}
              style={{ marginTop: "20px" }}
            >
              Back to Login
            </Button>
          </>
        ) : null}
      </Box>
    </Box>
  );
}

export default LibrarianForgotPassword