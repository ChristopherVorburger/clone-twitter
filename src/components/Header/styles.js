import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  header__button_profile: {
    [theme.breakpoints.up("sm")]: {
      display: "none!important",
    },
  },
  header__container: {
    width: "100%!important",
    display: "flex!important",
    justifyContent: "flex-start!important",
    [theme.breakpoints.up("lg")]: {
      minWidth: "590px",
    },
  },
}));
