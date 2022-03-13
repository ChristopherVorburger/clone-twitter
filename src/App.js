import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Prehome from './pages/Prehome';
import SignUp from './pages/SignUp/SingUp';
import Login from './components/Login/Login';
import Home from './pages/Home';
import Exemple from './components/Exemple';
import Profile from './pages/Profile';
import Followers from './pages/Followers';
import Following from './pages/Following';
import EditProfileModal from './components/EditProfileModal';
import ChannelSearchUser from './components/Message/ChannelSearchUser/ChannelSearchUser';
import Layout from './components/Layout';
import Bookmarks from './pages/Bookmarks';
import Message from './components/Message/Message';

import { AuthContext } from './context/authContext';
import { SnackbarsContextProvider } from './context/snackbarsContext';

export default function App() {
  const auth = React.useContext(AuthContext);
  console.log('auth', auth);
  // Création d'un thème pour changer la couleur principale de MUI
  let theme = createTheme({
    palette: {
      primary: {
        main: '#1d9bf0',
      },
      black: {
        main: '#282d31',
        darker: '#0f1419',
      },
      grey: {
        main: '#536471',
        button: '#cfd9de',
        background__input: '#eff3f4',
        background__trend: '#f7f9f9',
      },
      white: {
        main: '#ffffff',
      },
    },
    typography: {
      font: {
        small: 13,
        main: 15,
        large: 20,
      },
      lightBold: 400,
      mainBold: 700,
      titleBold: 800,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {!auth.authUser ? (
        <Routes>
          <Route path="/" element={<Prehome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Layout>
          <SnackbarsContextProvider>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/exemple" element={<Exemple />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/:username/followers" element={<Followers />} />
              <Route path="/:username/following" element={<Following />} />
              <Route path="/settings/profile" element={<EditProfileModal />} />
              <Route path="/searchUser" element={<ChannelSearchUser />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/messages" element={<Message />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </SnackbarsContextProvider>
        </Layout>
      )}
    </ThemeProvider>
  );
}
