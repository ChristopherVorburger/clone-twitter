import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      desktop: 705,
    },
  },
});

export default makeStyles({
  logo: {
    marginLeft: "40% ",
  },
  accountCreateTitle: {
    fontWeight: "bold !important",
    fontSize: "23px !important ",
  },
  switchPhoneEmail: {
    fontSize: "15px !important",
    color: "rgb(29, 155, 240)",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  birthdayPasswordTitle: {
    fontSize: "15px !important",
    fontWeight: "bold !important",
  },
  birthdayText: {
    fontSize: "15px !important",
    color: "rgb(83, 100, 113)",
  },
  nextButton: {
    backgroundColor: "#999999 !important",
    textTransform: "none !important",
    textDecoration: "none !important",
    borderRadius: "50px !important",
    fontWeight: "bold !important",
    color: "white !important",
    alignItems: "center !important",
    margin: "0 auto !important",
    width: "100%",
  },
  box: {
    [theme.breakpoints.up("desktop")]: {
      width: "600px !important",
      height: "850px !important",
      borderRadius: "15px",
      backgroundColor: "white",
      margin: "0 !important",
    },
  },
  mainContainer: {
    [theme.breakpoints.up("desktop")]: {
      backgroundColor: "#999999",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  signupContainer: {
    [theme.breakpoints.up("desktop")]: {
      width: "80% !important",
      margin: "0 auto !important",
    },
  },
});
