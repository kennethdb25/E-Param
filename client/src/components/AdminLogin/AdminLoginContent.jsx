import React, { useState } from "react";
import { Box } from "@mui/material";
import useStyles from "./style";
import AdminLoginForm from "./AdminLoginFrom";

const AdminLoginContent = () => {
  const classes = useStyles();

  return (
    <Box className={classes.loginContainer}>
      <AdminLoginForm />
    </Box>
  );
};

export default AdminLoginContent;
