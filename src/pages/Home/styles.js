import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  button: {
    borderRadius: "40px!important",
    textTransform: "none!important",
    width: "40%",
    maxWidth: "120px",
    minWidth: "49px!important",
    minHeight: "49px!important",
  },
  button__add_tweet: {
    [theme.breakpoints.up("sm")]: {
      display: "none!important",
    },
  },
}));
