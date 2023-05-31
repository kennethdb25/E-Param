import React, { useState } from "react";
import { Box } from "@mui/material";
import { Space, Drawer } from "antd";
import useStyles from "./style";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";

const LoginContent = () => {
  const [visible, setVisible] = useState(false);
  const classes = useStyles();

  const showSignUpForm = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Box className={classes.loginContainer}>
      <LoginForm showSignUpForm={showSignUpForm} />
      <Drawer
        title="Sign Up"
        placement="left"
        onClose={onClose}
        open={visible}
        height={600}
        width={900}
        style={{ display: "flex", justifyContent: "center" }}
        extra={<Space></Space>}
      >
        <SignUp onClose={onClose}/>
      </Drawer>
    </Box>
  );
};

export default LoginContent;
