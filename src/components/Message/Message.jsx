import React, { useState, useEffect, useRef } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirebaseConfig } from '../../firebase-config';
import LeftNavbar from '../LeftNavbar';
import Header from '../Header';
import CircularProgress from '@mui/material/CircularProgress';
import BottomNavigation from '../BottomNavigation';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Icons from '../../constants/icons';
import ChannelItem from './ChannelItem/ChannelItem';
import ChannelAdd from './ChannelAdd/ChannelAdd';

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
  Paper,
  List,
  ListItemIcon,
  ClickAwayListener,
} from '@mui/material';
import useStyles from './styles';
import { orderBy, query, onSnapshot } from 'firebase/firestore';
import NewTweet from '../NewTweet';
import { useFirestoreWithQuery } from '../../utils/useFirestoreWithQuery';
import Welcome from '../Welcome';
import Tweet from '../Tweet/Tweet';
import News from '../News';
import ChannelAddMessage from './ChannelAddMessage/ChannelAddMessage';
import ClassicButton from '../buttons/ClassicButton';
import BottomAvatar from '../LeftNavbar/BottomAvatar';
import SimpleDialog from '../SimpleDialog';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../../constants';
import { useFirestore } from '../../utils/useFirestore';
import ChannelSearchUser from './ChannelSearchUser/ChannelSearchUser';

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
  const usersRef = firestore.collection('users');
  // const queryChannel = channelsRef
  //   .orderBy('users', 'array-contains', auth.currentUser.uid)
  //   .onSnapshot((snapshot) => {
  //     return snapshot.docs.map((doc) => doc.data());
  //   });
  // const [channels] = useCollectionData(queryChannel);

  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [channelSelected, setChannelSelected] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  const dummy = useRef();
  // console.log('userid => ' + auth.currentUser.uid);

  function getChannesls() {
    const queryChannels = channelsRef
      .where('users', 'array-contains', auth.currentUser.uid)
      .orderBy('updated_at', 'desc');

    onSnapshot(queryChannels, (queryQnapshot) => {
      const items = [];
      queryQnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setChannels(items);
    });
  }

  function getUsers() {
    const queryUsers = usersRef.orderBy('name');

    onSnapshot(queryUsers, (queryQnapshot) => {
      const items = [];
      queryQnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setUsers(items);
    });
  }

  function getMessages(idChannels) {
    const queryMessages = messagesRef.orderBy('created_at', 'asc');

    onSnapshot(queryMessages, (queryQnapshot) => {
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
    // console.log('id channels => ' + idChannels);
    setChannelSelected(idChannels);
    getMessages(idChannels);
  }

  function handleAddNewMessage(newMessage) {
    const userId = auth.currentUser.uid;
    const todayDate = firebase.firestore.FieldValue.serverTimestamp();
    const messageChannel = messagesRef.add({
      channels_id: channelSelected,
      created_at: todayDate,
      photoUrl: null,
      sender_id: userId,
      senderName: '',
      text: newMessage,
    });

    // setNewMessage('');
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

    // setNewMessage('');
  }

  useEffect(() => {
    getChannesls();
    getUsers();
  }, []);

  const tweets = useFirestoreWithQuery('tweets');

  const filteredTweets = tweets?.filter((tweet) => {
    return (
      tweet?.author_id === auth?.authUser?.uid ||
      auth?.userData?.[0]?.following?.includes(tweet.author_id)
    );
  });

  return (
    <>
      <Box display="flex" justifyContent="center" width="100%">
        {/* Zone à gauche */}
        <Box
          display="flex"
          flexDirection="column"
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
          minWidth="400px"
          alignContent="center"
          // style={{
          //   maxWidth: '500px',
          // }}
        >
          {/* Entête */}
          <Box
            display="flex"
            flexDirection="row"
            alignContent="center"
            margin="1em"
          >
            <Box
              width="20px"
              height="20px"
              flexGrow={1}
              style={
                {
                  // padding: '1.2rem'
                }
              }
            >
              <Typography fontSize="1.5em">Messages</Typography>
            </Box>

            <Box
              style={{
                // padding: '1.2rem'
                minHeight: '36px',
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate('/searchUser')}
                className={classes.profile__button}
                style={{
                  border: 'none',
                  width: '0.5rem',
                }}
                width="20px"
                height="20px"
              >
                {/* <Icons.AddCommentIcon /> */}

                <svg
                  fontSize="1.5em"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
                >
                  <g>
                    <path d="M23.25 3.25h-2.425V.825c0-.414-.336-.75-.75-.75s-.75.336-.75.75V3.25H16.9c-.414 0-.75.336-.75.75s.336.75.75.75h2.425v2.425c0 .414.336.75.75.75s.75-.336.75-.75V4.75h2.425c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-3.175 6.876c-.414 0-.75.336-.75.75v8.078c0 .414-.337.75-.75.75H4.095c-.412 0-.75-.336-.75-.75V8.298l6.778 4.518c.368.246.79.37 1.213.37.422 0 .844-.124 1.212-.37l4.53-3.013c.336-.223.428-.676.204-1.012-.223-.332-.675-.425-1.012-.2l-4.53 3.014c-.246.162-.563.163-.808 0l-7.586-5.06V5.5c0-.414.337-.75.75-.75h9.094c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H4.096c-1.24 0-2.25 1.01-2.25 2.25v13.455c0 1.24 1.01 2.25 2.25 2.25h14.48c1.24 0 2.25-1.01 2.25-2.25v-8.078c0-.415-.337-.75-.75-.75z"></path>
                  </g>
                </svg>

                {/* <div
                  dir="auto"
                  className="css-901oao r-1awozwy r-18jsvk2 r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0"
                >
                  
                  <span
                    className="css-901oao css-16my406 css-bfa6kz r-poiln3 r-a023e6 r-rjixqe r-bcqeeo r-qvutc0"
                    style="border-bottom: 2px solid rgb(15, 20, 25);"
                  ></span>
                </div> */}
              </Button>
            </Box>
          </Box>

          <Box>
            {/* Champ de text de recherche */}
            {/* <TextField /> */}
            <Divider sx={{ borderColor: 'background__input' }} />
          </Box>

          {/* Affichage de la liste des conversations */}
          <Box
          // display="flex"
          // style={{
          //   maxWidth: '100%',
          // }}
          >
            <ListeChannels
              channels={channels}
              handleDiplayMessages={(idChannels) =>
                handleDisplayChannelMessage(idChannels)
              }
              style={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                // overscrollBehavior: 'none',
                // width: '100%',
              }}
            />
          </Box>
        </Box>

        {/* Zone à droite */}
        <Box display="flex" minWidth="500px" borderRight="1px solid #eff3f4">
          {/* Afficahge des messages */}
          <Message
            messages={messages}
            handleAddNewMessage={handleAddNewMessage}
            // newMessage={newMessage}
            handleTextNewMessage={setNewMessage}
          />
        </Box>
      </Box>
      <BottomNavigation />
      <span ref={dummy}></span>
    </>
  );
}

function ListeChannels({ channels, handleDiplayMessages }) {
  const classes = useStyles();
  const users = useFirestore('users');

  const getUser = (userId) => {
    return users?.filter((user) => {
      return user.id == userId;
    });
  };

  if (channels && channels.length > 0) {
    // console.log('channels => ');
    // console.log(channels);
    // console.log('channel id => ' + channels.id);
    return (
      <Box>
        {channels.map((channel, index) => (
          <Box key={index}>
            <ChannelItem
              user={getUser(
                channel?.users[0] == auth.currentUser.uid
                  ? channel?.users[1]
                  : channel?.users[0]
              )}
              channelID={channel.id}
              handleClick={handleDiplayMessages}
            />
          </Box>
        ))}
      </Box>
    );
  } else {
    return <Typography variant="h6">Pas de conversation!</Typography>;
  }
}

const iconsArray = [
  { name: Icons.HomeSharpIcon, path: '/home', text: 'Home' },
  { name: Icons.SearchSharpIcon, path: '/explore', text: 'Explore' },
  {
    name: Icons.NotificationsOutlinedIcon,
    path: '/notifications',
    text: 'Notifications',
  },
  { name: Icons.EmailOutlinedIcon, path: '/messages', text: 'Messages' },
  { name: Icons.BookmarkBorderIcon, path: '/bookmarks', text: 'Bookmarks' },
  { name: Icons.FeaturedPlayListOutlinedIcon, path: '/', text: 'Lists' },
  {
    name: Icons.PersonOutlineOutlinedIcon,
    path: `/${auth?.userData?.[0]?.username}`,
    text: 'Profile',
  },
  { name: Icons.MoreHorizIcon, path: '', text: 'More' },
];

function Message({
  messages = [],
  handleAddNewMessage,
  newMessage,
  setNewMessage,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // if (messages && messages.length > 0) {
  // console.log('messages =>');
  // console.log(messages);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
      width="100%"
    >
      <Box
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* <Box button display="flex" justifyContent="center" alignItems="center"> */}

        <List>
          {messages.map((message, index) => {
            return (
              // <ListItem
              //   alignItems="flex-start"
              //   key={index}
              //   style={{
              //     textAlign:
              //       message.sender_id == auth.currentUser.uid
              //         ? 'right'
              //         : 'left',
              //     // backgroundColor:
              //     //   message.sender_id == auth.currentUser.uid
              //     //     ? '#1d9bf0'
              //     //     : '#ECE7E7',
              //   }}
              // >
              <ListItemText
                key={index}
                align="left"
                style={{
                  //   textAlign:
                  //     message.sender_id == auth.currentUser.uid
                  //       ? 'right'
                  //       : 'left',
                  backgroundColor:
                    message.sender_id == auth.currentUser.uid
                      ? '#1d9bf0'
                      : '#ECE7E7',
                }}
                sx={{
                  borderRadius: '15px',
                  // marginLeft: '17em',
                  // padding: '0.5em',
                }}
              >
                {message.text}
              </ListItemText>
              // </ListItem>
            );
          })}
        </List>
      </Box>

      <Box>
        <ChannelAddMessage
          handleAddNewMessage={handleAddNewMessage}
          // newMessage={newMessage}
          // setNewMessage={setNewMessage}
        />
      </Box>
    </Box>
  );
  // } else {
  //   return <Typography variant="h6">Pas de messages sélectionné!</Typography>;
  // }
}
