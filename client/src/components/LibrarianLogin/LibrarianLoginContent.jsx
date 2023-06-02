import React from "react";
import { Box } from "@mui/material";
import useStyles from "./style";
import LibrarianLoginForm from "./LibrarianLoginFrom";

const LibrarianLoginContent = (props) => {
  const classes = useStyles();
  const { LoginValid } = props;

  return (
    <Box className={classes.loginContainer}>
      <LibrarianLoginForm LoginValid={LoginValid}/>
    </Box>
  );
};

export default LibrarianLoginContent;
