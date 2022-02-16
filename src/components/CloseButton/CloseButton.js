import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import useStyles from "./Styles";

function CloseButton() {
  const classes = useStyles();
  return (
    <div className="closeButton">
      <IconButton>
        <CloseIcon className={classes.buttonSignUp} />
      </IconButton>
    </div>
  );
}

export default CloseButton;
