import { makeStyles } from "@mui/styles";

const drawerWidth = "300px";

export default makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      display: "block!important",
    },
  },
  drawerRoot: {
    width: drawerWidth,
    [theme.breakpoints.down("lg")]: {
      width: "200px!important",
    },
    [theme.breakpoints.down("md")]: {
      width: "200px!important",
    },
    [theme.breakpoints.down("sm")]: {
      width: "0px!important",
    },
  },
  drawerPaper: {
    left: "auto!important",
    borderRight: "none!important",
  },
  icons: {
    [theme.breakpoints.down("lg")]: {
      minWidth: "0px!important",
    },
  },
}));
