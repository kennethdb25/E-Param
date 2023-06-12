import React, { useState } from "react";
import { Box } from "@mui/material";
import { Space, Drawer } from "antd";
import useStyles from "./style";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";

const LoginContent = (props) => {
  const [visible, setVisible] = useState(false);
  const classes = useStyles();
  const { LoginValid } = props;

  const showSignUpForm = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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
      >
        <SignUp onClose={onClose}/>
      </Drawer>
    </Box>
  );
};

export default LoginContent;
