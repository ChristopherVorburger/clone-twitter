import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  header__button_profile: {
    [theme.breakpoints.up("sm")]: {
      display: "none!important",
    },
  },
}));
