import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("md")]: {
      display: "none!important",
    },
  },
  input: {
    "&::before": {
      content: "none!important",
    },
  },
}));
