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
    borderRadius: "16px",
    height: "98vh!important",
    overflowY: "scroll",
    overflowX: "hidden",
    [theme.breakpoints.down("md")]: {
      minWidth: "350px",
    },
  },
  button: {
    textTransform: "none!important",
  },
  cover: {
    objectFit: "cover",
    width: "590px",
    height: "200px",
    opacity: 0.75,
  },
  cover__container: {
    position: "relative",
    backgroundColor: `${theme.palette.grey.main}!important`,
  },
  button__add_cover: {
    position: "absolute!important",
    borderRadius: "50%",
    width: "50px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: `${theme.palette.black.main}!important`,
    color: `${theme.palette.white.main}!important`,
    cursor: "pointer!important",
    padding: "0.5rem",
  },
  field: {
    padding: " 1rem!important",
  },
}));
