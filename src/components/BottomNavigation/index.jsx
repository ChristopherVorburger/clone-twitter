import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import useStyles from "./styles";

export default function LabelBottomNavigation() {
  const classes = useStyles();

  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      className={classes.bottom_navigation}
      sx={{
        width: "100%",
        maxWidth: "500px",
        position: "absolute",
        bottom: "0",
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        showLabel="false"
        value="home"
        icon={<HomeSharpIcon sx={{ transform: "scale(1.3)" }} />}
      />
      <BottomNavigationAction
        showLabel="false"
        value="favorites"
        icon={<SearchSharpIcon sx={{ transform: "scale(1.3)" }} />}
      />
      <BottomNavigationAction
        showLabel="false"
        value="nearby"
        icon={<NotificationsOutlinedIcon sx={{ transform: "scale(1.3)" }} />}
      />
      <BottomNavigationAction
        showLabel="false"
        value="folder"
        icon={<EmailOutlinedIcon sx={{ transform: "scale(1.3)" }} />}
      />
    </BottomNavigation>
  );
}
