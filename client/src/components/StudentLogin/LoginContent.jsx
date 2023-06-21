import React, { useState } from "react";
import { Box } from "@mui/material";
import { Space, Drawer, Button, Form } from "antd";
import useStyles from "./style";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";

const LoginContent = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const classes = useStyles();
  const { LoginValid } = props;

  const showSignUpForm = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    const newdata = new FormData();
		newdata.append("photo", values.photo.file.originFileObj);
		newdata.append("address", values.address);
		newdata.append("confirmPassword", values.confirmPassword);
		newdata.append("email", values.email);
		newdata.append("firstName", values.firstName);
		newdata.append("gender", values.gender);
		newdata.append("lastName", values.lastName);
		newdata.append("grade", values.grade);
		newdata.append("middleName", values.middleName);
		newdata.append("password", values.password);
		newdata.append("section", values.section);
		newdata.append("studentId", values.studentId);

    const res = await fetch("/student/register", {
      method: "POST",
      body: newdata
    });
    if (res.status === 201) {
      toast.success("Registered Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
      onClose();
      form.resetFields();
    }else {
      toast.error("ID already exists!", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
    }
  };

  return (
    <Box className={classes.loginContainer}>
      <LoginForm showSignUpForm={showSignUpForm} LoginValid={LoginValid}/>
      <Drawer
        title="Sign Up"
        placement="left"
        onClose={onClose}
        open={visible}
        height="100%"
        width={900}
        style={{ display: "flex", justifyContent: "center" }}
        extra={<Space></Space>}
        footer={[
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <Button type="primary" onClick={() => form.submit()}>
              Confirm Registration
            </Button>
          </div>
        ]}
      >
        <SignUp form={form} onFinish={onFinish}/>
      </Drawer>
    </Box>
  );
};

export default LoginContent;
