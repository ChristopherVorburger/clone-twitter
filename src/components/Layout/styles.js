import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  leftNavbar: {
    [theme.breakpoints.down("lg")]: {
      marginLeft: "-780px!important",
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "-480px!important",
    },
  },
  content: {
    [theme.breakpoints.down("lg")]: {
      marginLeft: "250px!important",
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "150px!important",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px!important",
    },
  },
}));
