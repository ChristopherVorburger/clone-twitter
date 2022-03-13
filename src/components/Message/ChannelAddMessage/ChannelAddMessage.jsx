import React from 'react';

import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { icons, images } from '../../../constants';

import useStyles from './styles';

import { AuthContext } from '../../../context/authContext';

const ChannelAddMessage = ({
  handleAddNewMessage,
  // newMessage,
  // setNewMessage,
}) => {
  const auth = React.useContext(AuthContext);
  const [newMessage, setNewMessage] = React.useState('');

  const classes = useStyles();
  return (
    <Box
      sx={{
        // borderRadius: '50px',
        padding: '12px',
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Box height="50px">
          <TextField
            sx={{
              borderRadius: '50px',
              // padding: '12px',
            }}
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
        </Box>
        <Box>
          <Button
            className={classes.profile_section__icon_more}
            onClick={() => handleAddNewMessage(newMessage)}
          >
            <icons.SendIcon disable={(!newMessage).toString()} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelAddMessage;
