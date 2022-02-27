import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  profile__container: {
    [theme.breakpoints.down("sm")]: {},
  },
  profile__cover: {
    objectFit: "cover",
  },
  button: {
    borderRadius: "20px!important",
    borderColor: `${theme.palette.grey.button}!important`,
    textTransform: "none!important",
    height: "2.5rem",
    padding: "2px 10px!important",
  },
}));
