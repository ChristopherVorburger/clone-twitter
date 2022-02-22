import React from "react";
import { Box, Button, Typography } from "@mui/material";
import useStyles from "./styles";

const WhoToFollow = ({ image, pseudo, name, comment }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container} p="1rem">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between">
          <Box mr="1rem">
            <img src={image} alt={pseudo} width="40px" />
          </Box>
          <Box>
            <Box>
              <Typography fontSize="15px" fontWeight="bold">
                {pseudo}
              </Typography>
            </Box>
            <Box>
              <Typography fontSize="15px" color="grey.main">
                {name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                backgroundColor: "black.main",
                borderRadius: "50px",
              }}
            >
              Follow
            </Button>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography fontSize="15px" color="grey.main">
          {comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default WhoToFollow;
