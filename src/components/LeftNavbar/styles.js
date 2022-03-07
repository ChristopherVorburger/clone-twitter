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
  profile_section: {
    minWidth: "240px",
    [theme.breakpoints.down("lg")]: {
      minWidth: "120px",
      marginRight: "1rem",
    },
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#0f14191a!important",
    },
  },
  profile_section__avatar_button: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
  },
  profile_section__avatar_texts: {
    [theme.breakpoints.down("lg")]: {
      display: "none!important",
    },
  },
  profile_section__icon_more: {
    justifyContent: "flex-end!important",
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
