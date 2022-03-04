import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const ClassicButton = ({ text, path }) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.classic_button}
      variant="contained"
      component={Link}
      to={`${path}`}
      sx={{
        borderRadius: "50px",
        fontSize: "17px",
        fontWeight: "mainBold",
      }}
    >
      {text}
    </Button>
  );
};

export default ClassicButton;
