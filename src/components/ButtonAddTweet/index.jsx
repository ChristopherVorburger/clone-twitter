import React from "react";
import useStyles from "./styles";

import { Box } from "@mui/material";

import { GiFeather } from "react-icons/gi";

const ButtonAddTweet = () => {
  const classes = useStyles();

  return (
    <Box className={classes.button__feather}>
      <div className={classes.button__feather_plus}>+</div>
      <GiFeather size="1.7rem" color="white" />
    </Box>
  );
};

export default ButtonAddTweet;
