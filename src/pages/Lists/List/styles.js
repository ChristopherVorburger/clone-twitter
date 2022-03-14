import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  profile__cover: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
    width: "590px",
    height: "200px",
    objectFit: "cover",
  },
  user_list__avatar_user: {
    objectFit: "cover",
    width: "20px",
    height: "20px",
    borderRadius: "10px",
  },
  button: {
    textTransform: "none!important",

    "&:hover": {
      backgroundColor: "#fdc9ce!important",
      borderColor: "#f4212e!important",
      color: "#f4212e!important",
    },
  },
  button_black: {
    textTransform: "none!important",
  },
  button__edit: {
    textTransform: "none!important",
    "&:hover": {
      backgroundColor: `${theme.palette.grey.background__input}!important`,
      borderColor: `${theme.palette.grey.main}!important`,
    },
  },
}));
