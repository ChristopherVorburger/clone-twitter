import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  bottom_navigation: {
    [theme.breakpoints.up("sm")]: {
      display: "none!important",
    },
  },
}));
