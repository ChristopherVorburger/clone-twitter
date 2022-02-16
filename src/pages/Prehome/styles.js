import { makeStyles } from "@mui/styles";

import { images } from "../../constants";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  },

  container__text: {
    margin: "2rem",
  },

  image: {
    backgroundImage: `url(${images.homeImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "94vh",
    maxWidth: "60%",
    marginBottom: "1rem",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      height: "50vh",
    },
  },
  logo: {
    margin: "1rem 0",
    fontSize: "3rem!important",
  },
  title: {
    marginBottom: "2rem!important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.6rem!important",
    },
  },
  subtitle: {
    marginBottom: "2rem!important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem!important",
    },
  },
  texts: {
    width: "300px",
  },
  button: {
    borderRadius: "20px!important",
    borderColor: "#d0dadf!important",
    textTransform: "none!important",
    fontWeight: "bold",
    height: "2.5rem",
  },

  button__logo: {
    marginRight: "0.5rem",
  },
  caption: {
    marginBottom: "3rem!important",
  },
}));
