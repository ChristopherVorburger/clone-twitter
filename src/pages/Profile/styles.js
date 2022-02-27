import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  profile__container: {
    [theme.breakpoints.down("sm")]: {},
  },
  profile__cover: {
    objectFit: "cover",
  },
}));
