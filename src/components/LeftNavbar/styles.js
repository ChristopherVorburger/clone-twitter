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
      marginLeft: "20%!important",
    },
  },
  icon__profile: {
    "&:hover": {
      backgroundColor: "none!important",
    },
  },
}));
