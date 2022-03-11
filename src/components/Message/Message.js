import React, { useState, useEffect, useRef } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirebaseConfig } from '../../firebase-config';
import LeftNavbar from '../../components/LeftNavbar';
import Header from '../../components/Header';
import CircularProgress from '@mui/material/CircularProgress';
import BottomNavigation from '../../components/BottomNavigation';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Icons from '../../constants/icons';

import {
  CardContent,
  CardMedia,
  Container,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Divider,
  Stack,
  Tabs,
  Tab,
  TabContentPanel,
  Alert,
  TextField,
  Button,
} from '@mui/material';
import useStyles from './styles';

firebase.initializeApp(getFirebaseConfig());

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

export default function Messages() {
  // state to set dimension of the screen
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  // function to set the dimension
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  // useEffect to watch the resizing of the screen
  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  // assign a value to the width of the drawer
  const drawerWidth = screenSize.dynamicWidth < 600 ? 0 : 88;

  const classes = useStyles();
  const channelsRef = firestore.collection('channels');
  const messagesRef = firestore.collection('messages');
  // const queryChannel = channelsRef
  //   .orderBy('users', 'array-contains', auth.currentUser.uid)
  //   .onSnapshot((snapshot) => {
  //     return snapshot.docs.map((doc) => doc.data());
  //   });
  // const [channels] = useCollectionData(queryChannel);

  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [channelSelected, setChannelSelected] = useState('');
  const [formValue, setFormValue] = useState('');

  const dummy = useRef();
  console.log('userid => ' + auth.currentUser.uid);

  function getChannesls() {
    channelsRef.onSnapshot((queryQnapshot) => {
      const items = [];
      queryQnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setChannels(items);
    });
  }

  function getMessages(idChannels) {
    messagesRef.onSnapshot((queryQnapshot) => {
      const items = [];
      queryQnapshot.forEach((doc) => {
        if (doc.data().channels_id == idChannels) {
          items.push({ id: doc.id, ...doc.data() });
        }
      });

      setMessages(items);
    });
  }

  function handleDisplayChannelMessage(idChannels) {
    console.log('id channels => ' + idChannels);
    setChannelSelected(idChannels);
    getMessages(idChannels);
  }

  function handleAddNewMessage() {
    const userId = auth.currentUser.uid;
    const todayDate = firebase.firestore.FieldValue.serverTimestamp();
    const messageChannel = messagesRef.add({
      channels_id: channelSelected,
      created_at: todayDate,
      photoUrl: null,
      sender_id: userId,
      senderName: '',
      text: formValue,
    });

    setFormValue('');
  }

  function handleAddNewChannel() {
    const userId = auth.currentUser.uid;
    const todayDate = firebase.firestore.FieldValue.serverTimestamp();
    const messageChannel = channelsRef.add({
      created_at: todayDate,
      updated_at: todayDate,
      photoUrl: null,
      users: [userId, '5UlF2GKEfIW0b3MSi1YrRXb29rA2'],
    });

    setFormValue('');
  }

  useEffect(() => {
    getChannesls();
  }, []);

  return (
    <>
      <Box display="flex">
        <Box
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
          maxWidth="25em"
        >
          <Box display="flex" flexDirection="row">
            <Box>
              <Typography variant="span">Messages</Typography>
            </Box>
            <Box
              justifyContent="flex-end"
              onClick={() => handleAddNewChannel()}
            >
              <Icons.AddCommentIcon />
            </Box>
          </Box>
          <Box>
            <ListeChannels
              channels={channels}
              handleClick={(idChannels) =>
                handleDisplayChannelMessage(idChannels)
              }
            />
          </Box>
        </Box>

        <Box flexDirection="column" height="500px">
          <Box flexGrow={1} minHeight="100px">
            <Typography variant="h6">Header</Typography>
          </Box>
          <Box flexGrow={1} minHeight="50em">
            <Message messages={messages} />
          </Box>
          <Box minHeight="50px">
            <Divider sx={{ borderColor: 'background__input' }} />
            <TextField
              borderRadius="25px"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <Button disabled={!formValue} onClick={() => handleAddNewMessage()}>
              <Icons.SendIcon variant="text" border="none" />
            </Button>
          </Box>
        </Box>
      </Box>
      <span ref={dummy}></span>
    </>
  );
}

function ListeChannels({ channels, handleClick }) {
  if (channels) {
    // console.log('channels => ');
    // console.log(channels);
    // console.log('channel id => ' + channels.id);

    return (
      <Grid container>
        {channels.map((channel, index) => (
          <Grid item key={index} xs={12}>
            <ListItemButton>
              <CardContent onClick={() => handleClick(channel.id)}>
                <Typography variant="h6">Channels</Typography>
              </CardContent>
            </ListItemButton>
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <Typography variant="h6">Pas de conversation!</Typography>;
  }
}

function Message({ messages = [] }) {
  if (messages && messages.length > 0) {
    console.log('messages =>');
    console.log(messages);

    return (
      <Grid container>
        {messages.map((message, index) => (
          <Grid
            item
            key={index}
            xs={12}
            style={{
              marginBottom: '0.2em',
              paddingTop: '0.3em',
              paddingBottom: '0.3em',
              textAlign:
                message.sender_id == auth.currentUser.uid ? 'right' : 'left',
            }}
          >
            <Typography
              variant="span"
              style={{
                backgroundColor:
                  message.sender_id == auth.currentUser.uid
                    ? '#1d9bf0'
                    : '#ECE7E7',
                padding: '0.5em',
                borderRadius: '25px',
                paddingTop: '0.20em',
                paddingBottom: '0.20em',
              }}
            >
              {message.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <Typography variant="h6">Pas de messages sélectionné!</Typography>;
  }
}
