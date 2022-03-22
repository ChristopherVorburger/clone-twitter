import React from "react";
import { Button, Divider, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { icons } from "../../../constants";
import useStyles from "./styles";

const ChannelAddMessage = ({ handleAddNewMessage }) => {
  const [newMessage, setNewMessage] = React.useState("");

  const classes = useStyles();
  return (
    <>
      <Divider sx={{ borderColor: "background__input" }} />
      <Box
        sx={{
          paddingBottom: "23px",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Box height="50px" flexGrow={1}>
            <TextField
              sx={{
                borderRadius: "50px",
                padding: "0.5em",
                width: "100%",
              }}
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
          </Box>
          <Box>
            <Button
              className={classes.profile_section__icon_more}
              onClick={() => {
                handleAddNewMessage(newMessage);
                setNewMessage("");
              }}
              sx={{
                paddingRight: "1.5em",
              }}
              variant="text"
              disabled={!newMessage}
            >
              <icons.SendIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChannelAddMessage;
