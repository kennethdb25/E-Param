import React, { useState } from "react";
import { Box } from "@mui/material";
import useStyles from "./style";
import LibrarianLoginForm from "./LibrarianLoginFrom";

const LibrarianLoginContent = () => {
  const classes = useStyles();

  return (
    <Box className={classes.loginContainer}>
      <LibrarianLoginForm />
    </Box>
  );
};

export default LibrarianLoginContent;
