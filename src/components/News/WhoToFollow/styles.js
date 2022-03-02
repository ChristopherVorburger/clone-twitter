import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    "&:hover": {
      backgroundColor: theme.palette.grey.background__input,
    },
  },
  button: {
    "&:hover": {
      backgroundColor: "#fdc9ce!important",
      borderColor: "#f4212e!important",
      color: "#f4212e!important",
    },
  },
}));
