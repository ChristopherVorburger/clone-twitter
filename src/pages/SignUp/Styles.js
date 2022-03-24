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
  accountCreateTitle: {
    fontSize: "23px !important",
    fontWeight: "bold !important",
  },
  allInput: {
    paddingBottom: "20px",
  },
  background: {
    [theme.breakpoints.up("desktop")]: {
      backgroundColor: "#999999",
      height: "100vh",
    },
  },
  birthday: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  birthdayContainer: {
    display: "flex",
    gap: "10px",
  },
  birthdayPasswordTitle: {
    fontSize: "15px !important",
    fontWeight: "bold !important",
  },
  birthdayText: {
    fontSize: "15px !important",
    color: "rgb(83, 100, 113)",
  },
  close: {
    position: "relative",
    left: "-20px",
  },
  closeAndLogo: {
    display: "flex",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  modal: {
    padding: "25px",
    overflowY: "auto",
    [theme.breakpoints.up("desktop")]: {
      backgroundColor: "#fff",
      borderRadius: "15px",
      width: "600px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      minHeight: "400px",
      maxHeight: "100vh",
      overflowY: "auto",
    },
  },
  switchPhoneEmail: {
    fontSize: "15px !important",
    color: "rgb(29, 155, 240)",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
});
