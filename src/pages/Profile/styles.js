import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  profile__container: {
    maxWidth: "100%",
  },
  profile__cover: {
    width: "590px",
    height: "200px",
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
  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
    marginTop: "-50%",
    backgroundColor: theme.palette.white.main,
    border: `2px solid ${theme.palette.white.main}`,
  },
  image: {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
  },
}));
