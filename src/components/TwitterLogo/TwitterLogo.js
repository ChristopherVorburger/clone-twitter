import TwitterIcon from "@mui/icons-material/Twitter";
import useStyles from "./Styles";

function LogoTwitter() {
  const classes = useStyles();
  return (
    <div className="twitterLogo">
      <TwitterIcon className={classes.logoSignUp} />
    </div>
  );
}

export default LogoTwitter;
