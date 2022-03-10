import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    marginLeft: "2rem",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "4rem",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  icon__text: {
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
  add_tweet__button: {
    [theme.breakpoints.up("lg")]: {
      display: "none!important",
    },
  },
  add_tweet__button_large: {
    marginLeft: "1rem!important",
    [theme.breakpoints.down("lg")]: {
      display: "none!important",
    },
  },
  list_item_button: {
    "&:hover": {
      backgroundColor: "transparent!important",
      cursor: "default!important",
    },
  },
}));
