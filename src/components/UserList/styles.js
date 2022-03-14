import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    "&:hover": {
      backgroundColor: theme.palette.grey.background__input,
    },
  },
  button: {
    "&:hover": {
      borderColor: "transparent!important",
    },
  },

  button_black: {
    backgroundColor: "white!important",
  },
  avatar: {
    objectFit: "cover",
    borderRadius: "10px",
  },
  user_list__avatar_user: {
    objectFit: "cover",
    width: "20px",
    height: "20px",
    borderRadius: "10px",
  },
}));
