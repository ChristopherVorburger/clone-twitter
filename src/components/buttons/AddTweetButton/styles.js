import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
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
    color: theme.palette.white.main,
  },
}));
