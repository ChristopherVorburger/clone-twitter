import { makeStyles } from "@mui/styles";

const drawerWidth = "250px";

export default makeStyles((theme) => ({
  drawerRoot: {
    width: drawerWidth,
    [theme.breakpoints.down("lg")]: {
      width: "120px!important",
    },
    [theme.breakpoints.down("md")]: {
      width: "120px!important",
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
