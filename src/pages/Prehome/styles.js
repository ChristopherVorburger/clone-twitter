import { makeStyles } from "@mui/styles";

import { images } from "../../constants";

export default makeStyles({
  container: {
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
  },
  logo: {
    margin: "3rem 0",
  },
  title: {
    marginBottom: "2rem!important",
  },
  texts: {
    width: "300px",
  },
  button: {
    borderRadius: "20px!important",
    borderColor: "#d0dadf!important",
    textTransform: "none!important",
    fontWeight: "bold",
    marginBottom: "1rem!important",
    height: "2.5rem",
  },

  button__logo: {
    marginRight: "0.5rem",
  },
  caption: {
    marginBottom: "3rem!important",
  },
});
