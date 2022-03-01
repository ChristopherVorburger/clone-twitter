import React, { useContext } from "react";
import useStyles from "./styles";
import { Box } from "@mui/material";
import { GiFeather } from "react-icons/gi";
import { ModalContext } from "../../../context/modalContext";

const ButtonAddTweet = () => {
  const classes = useStyles();
  const { showModal, setShowModal } = useContext(ModalContext);

  return (
    <Box className={classes.button__feather} role='button' onClick={() => setShowModal(!showModal)}>
      <div className={classes.button__feather_plus}>+</div>
      <GiFeather size='1.7rem' color='white' />
    </Box>
  );
};

export default ButtonAddTweet;
