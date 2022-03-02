import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  modal: {
    backgroundColor: "background.paper",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "400px",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.white.main,
    minWidth: "600px",
    maxWidth: "80vw",
    minHeight: "400px",
    maxHeight: "90vh",
    borderRadius: "16px",
  },
  button: {
    textTransform: "none!important",
  },
}));
