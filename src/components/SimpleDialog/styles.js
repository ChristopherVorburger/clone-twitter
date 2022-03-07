import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  dialog__section: {
    minWidth: "300px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "120px",
    },
  },
  dialog__avatar_button: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
  },
  dialog__avatar_texts: {
    [theme.breakpoints.down("lg")]: {
      display: "none!important",
    },
  },
  dialog__sentence: {
    "&:hover": {
      backgroundColor: theme.palette.grey.background__trend,
      cursor: "pointer",
    },
  },
}));
