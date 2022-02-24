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
  },
  icon__text: {
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
}));
