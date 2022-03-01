import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  profile__container: {
    [theme.breakpoints.down("sm")]: {},
  },
  profile__cover: {
    objectFit: "cover",
  },
  profile__button: {
    borderRadius: "20px!important",
    borderColor: `${theme.palette.grey.button}!important`,
    textTransform: "none!important",
    height: "2.5rem",
    padding: "2px 10px!important",
  },
  profile__link: {
    textDecoration: "none!important",
  },
  profile__link_nav: {
    textTransform: "none!important",
    padding: "0 2rem!important",
    minHeight: "53px!important",
  },
}));
