import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  new_tweet: {
    [theme.breakpoints.down("sm")]: {
      display: "none!important",
    },
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
  },
}));
