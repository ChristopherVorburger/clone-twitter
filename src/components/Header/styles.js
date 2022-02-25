import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  header__button_profile: {
    [theme.breakpoints.up("sm")]: {
      display: "none!important",
    },
  },
  header__container: {
    [theme.breakpoints.up("lg")]: {
      minWidth: "600px",
    },
  },
}));
