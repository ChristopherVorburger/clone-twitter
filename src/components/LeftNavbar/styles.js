import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  container: {
    marginLeft: "5%!important",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "15%!important",
    },
  },
  icon__text: {
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
}));
