import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  icon__text: {
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
}));
