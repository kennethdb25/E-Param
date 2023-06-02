import React from "react";
import { Box } from "@mui/material";
import useStyles from "./style";
import AdminLoginForm from "./AdminLoginFrom";

const AdminLoginContent = (props) => {
  const classes = useStyles();
  const { LoginValid } = props;

  return (
    <Box className={classes.loginContainer}>
      <AdminLoginForm LoginValid={LoginValid}/>
    </Box>
  );
};

export default AdminLoginContent;
