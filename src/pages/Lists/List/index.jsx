import React from "react";

import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

import { images } from "../../../constants";

import { AuthContext } from "../../../context/authContext";

import { useFirestore } from "../../../utils/useFirestore";

import useStyles from "./styles";

const List = ({ list, author }) => {
  const classes = useStyles();
  const [textButton, setTextButton] = React.useState("Following");

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const auth = React.useContext(AuthContext);

  return (
    <Box p="12px 1rem">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Box pr="1rem">
            <img src={images.user} alt="" width={"50px"} />
          </Box>
          <Box>
            <Typography fontSize="font.main">{list?.name}</Typography>
            <Box display="flex">
              <Box mr="4px">
                <img src={images.user} alt="" width={"20px"} />
              </Box>
              <Typography mr="4px" fontSize="font.small">
                {author?.[0]?.name}
              </Typography>
              <Typography
                mr="4px"
                fontSize="font.small"
                color="grey.main"
              >{`@${author?.[0]?.username}`}</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            onMouseEnter={() => setTextButton("Unfollow")}
            onMouseLeave={() => setTextButton("Following")}
          >
            {auth?.userData?.[0]?.lists?.includes(list?.id) ? (
              <Button
                className={classes.button}
                variant="outlined"
                disableElevation
                sx={{
                  color: "black.main",
                  fontSize: "font.small",
                  fontWeight: "mainBold",
                  backgroundColor: "white.main",
                  borderColor: "grey.button",
                  borderRadius: "50px",
                  textTransform: "none",
                  minWidth: "6rem",
                }}
                onClick={() => {}}
              >
                {textButton}
              </Button>
            ) : (
              <Button
                className={classes.button_black}
                variant="contained"
                sx={{
                  fontSize: "font.small",
                  fontWeight: "mainBold",
                  backgroundColor: "black.main",
                  borderRadius: "50px",
                }}
                onClick={() => {}}
              >
                Follow
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default List;
