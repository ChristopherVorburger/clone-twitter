import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import useStyles from "./Styles";

function CloseButton() {
  const classes = useStyles();
  return (
    <IconButton>
      <CloseIcon className={classes.buttonSignUp} />
    </IconButton>
  );
}

export default CloseButton;
