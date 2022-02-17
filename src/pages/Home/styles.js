import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  button: {
    borderRadius: "40px!important",
    textTransform: "none!important",
    width: "40%",
    maxWidth: "380px",
    minWidth: "49px!important",
    minHeight: "49px!important",
  },
  button__feather: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    position: "absolute",
    right: "19px",
    bottom: "80px",
    padding: "0.8rem",
  },
  button__feather_plus: {
    position: "absolute",
    right: "35px",
    bottom: "30px",
    color: "white",
  },
}));
