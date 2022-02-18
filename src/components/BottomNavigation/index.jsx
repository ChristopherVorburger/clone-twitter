import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { icons } from "../../constants";

import useStyles from "./styles";

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("home");

  const iconsArray = [
    icons.HomeSharpIcon,
    icons.SearchSharpIcon,
    icons.NotificationsOutlinedIcon,
    icons.EmailOutlinedIcon,
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
        position: "absolute",
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
            showLabel={false}
            icon={icon.type.render()}
            sx={{ transform: "scale(1.3)" }}
          />
        );
      })}
    </BottomNavigation>
  );
}
