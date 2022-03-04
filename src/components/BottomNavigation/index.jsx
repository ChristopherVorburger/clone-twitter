import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { icons } from "../../constants";

import useStyles from "./styles";
import { Link } from "react-router-dom";

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("home");

  const iconsArray = [
    { name: icons.HomeSharpIcon, path: "/home" },
    { name: icons.SearchSharpIcon, path: "/explore" },
    { name: icons.NotificationsOutlinedIcon, path: "/notifications" },
    { name: icons.EmailOutlinedIcon, path: "/messages" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      className={classes.bottom_navigation}
      sx={{
        width: "100%",
        maxWidth: "500px",
        position: "fixed",
        bottom: "0",
      }}
      value={value}
      onChange={handleChange}
    >
      {/* Loop through the 'iconsArray' array and use the render() function to display the component */}
      {iconsArray.map((icon, index) => {
        return (
          <BottomNavigationAction
            key={index}
            component={Link}
            to={icon.path}
            icon={icon.name.type.render()}
            sx={{ transform: "scale(1.3)" }}
            showlabel="false"
          />
        );
      })}
    </BottomNavigation>
  );
}
