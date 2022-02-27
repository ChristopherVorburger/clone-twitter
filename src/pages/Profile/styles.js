import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  profile__container: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
}));
