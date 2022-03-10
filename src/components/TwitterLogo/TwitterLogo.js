import TwitterIcon from "@mui/icons-material/Twitter";
import useStyles from "./Styles";

function LogoTwitter() {
  const classes = useStyles();
  return (
    <TwitterIcon data-testid="TwitterLogo" className={classes.logoSignUp} />
  );
}

export default LogoTwitter;
