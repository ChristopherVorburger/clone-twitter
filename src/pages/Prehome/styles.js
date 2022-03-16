import { makeStyles } from "@mui/styles";

import { images } from "../../constants";

export default makeStyles((theme) => ({
  box__main: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "flex-end",
    },
  },
  box__text: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  container: {
    margin: "auto!important",
    padding: "20px",
    maxWidth: "600px",
  },
  icon__twitter: {
    paddingBottom: "12px",
    fontSize: "3rem!important",
  },
  title: {
    margin: "2.5rem 0!important",
    [theme.breakpoints.up("md")]: {
      fontSize: "64px!important",
      lineHeight: "84px!important",
      letterSpacing: "-1.2px!important",
    },
  },
  subtitle: {
    margin: "0 0 1rem 0!important",
    [theme.breakpoints.up("md")]: {
      fontSize: "32px!important",
      lineHeight: "84px!important",
      letterSpacing: "-1.2px!important",
    },
  },
  button: {
    borderRadius: "20px!important",
    borderColor: `${theme.palette.grey.button}!important`,
    textTransform: "none!important",
    height: "2.5rem",
    padding: "2px 10px!important",
  },
  button__logo: {
    marginRight: "0.5rem",
  },
  line: {
    width: "100%",
    backgroundColor: theme.palette.grey.background__input,
    height: "1px",
    margin: "0 4px",
  },

  image: {
    backgroundImage: `url(${images.homeImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "45vh",
    [theme.breakpoints.up("md")]: {
      width: "54%",
      height: "94vh",
    },
  },
}));
