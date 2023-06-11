import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  
  loginContainer: {
    backgroundImage: "url(/backgound.png)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    zIndex: -1,
    

    [theme.breakpoints.up("md")]: {
      paddingRight: "100px",
      justifyContent: "end",
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "0px",
      justifyContent: "center",
    },
  },

   loginlogo: {
   backgroundImage: "url(/logo.png)",
   height: "50vh",
   backgroundRepeat: "no-repeat",
   marginLeft:"-41vh",
   marginBlockStart: "-35vh",
   alignItems: "center",
   zIndex: -1,
   
   [theme.breakpoints.up("md")]: {
    width: "400px",
  },
  [theme.breakpoints.down("md")]: {
    width: "80%",
    backgroundImage: "url(/logo.png)",
   height: "50vh",
   opacity: 0.2,
   backgroundRepeat: "no-repeat",
   marginLeft:"73vh",
   marginBlockStart: "-35vh",
   alignItems: "center",
   zIndex: 1,
    
  },
  },
  loginCard: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px", 
    background: "white",
    border: "1px lightgray solid",
    borderRadius: "10px",
    zIndex: 1,

    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
    [theme.breakpoints.down("md")]: {
      width: "80%",

    },
  },

  loginbox:{
    position: "absolute",
    borderRadius: "40px",
    height: "40vh",
    marginBlockEnd: "10vh",
    marginRight:"60vh",
    background: "rgba(236, 234, 219, 0.25)",
    minWidth: "130vh",
    [theme.breakpoints.up("md")]: {
    width: "100px",
    },
    [theme.breakpoints.down("md")]: {
     width: "80vh",
     background: "none",
    },
    },
  line:{
  position: "absolute",
  borderRadius: "12px",
  height: "2vh",
  marginBlockStart: "5vh",
  marginLeft:"40vh",
  background: "yellow",
  minWidth: "80vh",
  zIndex: 1,
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
    [theme.breakpoints.down("md")]: {
      width: "81%",
      background: "none",
      marginLeft:"0vh",
    },
  },

  loginLabel:{
    color: "white",
    fontFamily:"TimesNew Roman",
    position: "absolute",
    borderRadius: "12px",
    height: "2vh",
    marginBlockStart: "40px",
    marginLeft:"5vh",
    fontSize: "45px",
    minWidth: "100vh",
    zIndex: 1,
      [theme.breakpoints.up("md")]: {
        width: "400px",
      },
      [theme.breakpoints.down("md")]: {
        width: "81%",
        background: "none",
        marginLeft:"0vh",
        fontSize: "0px",
      },
    },
    loginLabel1:{
      fontFamily:"TimesNew Roman",
      position: "absolute",
      borderRadius: "12px",
      height: "2vh",
      marginBlockStart: "-1vh",
      marginLeft:"1vh",
      fontSize: "45px",
      minWidth: "100vh",
      zIndex: 1,
        [theme.breakpoints.up("md")]: {
          width: "400px",
        },
        [theme.breakpoints.down("md")]: {
          width: "81%",
          background: "none",
          marginLeft:"0vh",
          fontSize: "0px",
        },
      },
  line1:{
    position: "absolute",
    borderRadius: "12px",
  height: "2vh",
  marginBlockStart: "30vh",
  marginLeft:"0vh",
  background: "yellow",
  minWidth: "80vh",

  [theme.breakpoints.up("md")]: {
    width: "400px",
  },
  [theme.breakpoints.down("md")]: {
    width: "81%",
    background: "none",
  },
    },
  loginDetails: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    background: "white",

    [theme.breakpoints.up("md")]: {
      width: "360px",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  whoComplaint: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    background: "white",
    border: "1px lightgray solid",
    borderRadius: "10px",

    [theme.breakpoints.up("md")]: {
      width: "120%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  Form: {
    width: "100%",
    paddingTop: "20px",
  },
}));

export default useStyles;
