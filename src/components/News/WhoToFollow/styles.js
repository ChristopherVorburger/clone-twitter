import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    "&:hover": {
      backgroundColor: theme.palette.grey.background__input,
    },
  },
}));
