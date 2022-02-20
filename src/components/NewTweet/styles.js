import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  new_tweet: {
    [theme.breakpoints.down("sm")]: {
      display: "none!important",
    },
  },
}));
