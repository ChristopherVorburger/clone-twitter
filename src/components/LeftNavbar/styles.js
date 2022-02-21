import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  container: {
    marginLeft: "10%!important",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "20%!important",
    },
  },
}));
