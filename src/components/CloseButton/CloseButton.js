import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import useStyles from "./Styles";

function CloseButton() {
  const classes = useStyles();
  return (
    <IconButton data-testid="CloseButton">
      <CloseIcon className={classes.buttonSignUp} />
    </IconButton>
  );
}

export default CloseButton;
