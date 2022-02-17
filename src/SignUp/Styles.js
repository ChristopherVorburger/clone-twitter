import { makeStyles } from "@mui/styles";
import { hover } from "@testing-library/user-event/dist/hover";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 705,
    },
  },
});

export default makeStyles({
  accountCreateTitle: {
    color: "#0F1419",
    fontSize: "23px !important",
    fontWeight: "bold !important ",
  },
  switchPhoneEmail: { color: "rgb(29, 155, 240)", fontSize: "15px !important" },
  birthdayTitle: { fontWeight: "bold !important", fontSize: "15px !important" },
  birthdayText: { color: "rgb(83, 100, 113)", fontSize: "15px !important" },
  nextButton: {
    backgroundColor: "#878a8c !important",
    borderRadius: "20px !important",
    textTransform: "none!important",
    fontWeight: "bold !important",
    width: "90%",
  },
  input: { width: "100%" },
  inputMonth: { width: "50%" },
  inputDay: { width: "23%" },
  inputYear: { width: "27%" },
  signUpContainer: {
    width: "600px",
    height: "650px",
    backgroundColor: "white",
    borderRadius: "15px",
    [theme.breakpoints.down("mobile")]: {
      height: "100vh",
      width: "90vh",
      borderRadius: "0",
    },
  },
  stackContainer: {
    [theme.breakpoints.down("mobile")]: {
      height: "100vh",
      width: "90vh",
    },
  },
});
