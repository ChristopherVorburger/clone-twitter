import { makeStyles } from "@mui/styles";
import { height } from "@mui/system";

export default makeStyles((theme) => ({
  container: {
    "&:hover": {
      backgroundColor: theme.palette.grey.background__input,
    },
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
  list__avatar: {
    objectFit: "cover",
    width: "50px",
    height: "50px",
    borderRadius: "10px",
  },
  list__avatar_user: {
    objectFit: "cover",
    width: "20px",
    height: "20px",
    borderRadius: "10px",
  },
}));
