import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Prehome from "./pages/Prehome";
import SignUp from "./pages/SignUp/SingUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Bookmarks from "./pages/Bookmarks";
import Notifications from "./pages/Notifications";
import Mentions from "./pages/Mentions";
import Lists from "./pages/Lists";
import List from "./pages/Lists/List";
import ForeignProfile from "./pages/ForeignProfile";
import TweetPage from "./pages/Tweet/TweetPage";
import Explore from "./pages/Explore/Explore";

import EditProfileModal from "./components/EditProfileModal";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import CreateListModal from "./components/CreateListModal";
import SuggestedListModal from "./components/SuggestedListModal";
import ListMembersModal from "./components/ListMembersModal";
import EditListModal from "./components/EditListModal";
import ScrollToTop from "./components/ScrollToTop";
import Message from "./components/Message/Message";
import ChannelSearchUser from "./components/Message/ChannelSearchUser/ChannelSearchUser";
import Loader from "./components/Loader";

import { useAuth } from "./context/authContext";
import { useGlobal } from "./context/globalContext";

import { ListsContextProvider } from "./context/listsContext";
import { UsersContextProvider } from "./context/usersContext";
import { TweetsContextProvider } from "./context/tweetContext";

export default function App() {
  const { authUser, userData } = useAuth();
  const { loading } = useGlobal();

  // Création d'un thème pour changer la couleur principale de MUI
  let theme = createTheme({
    palette: {
      primary: {
        main: "#1d9bf0",
      },
      black: {
        main: "#282d31",
        darker: "#0f1419",
      },
      grey: {
        main: "#536471",
        button: "#cfd9de",
        background__input: "#eff3f4",
        background__trend: "#f7f9f9",
      },
      white: {
        main: "#ffffff",
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
      {/* ScrollToTop permet de revenir en haut de la page quand on clique sur un Link */}
      <ScrollToTop />
      {!authUser ? (
        <Routes>
          <Route path="/" element={<Prehome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Layout>
          {loading ? (
            <Loader />
          ) : (
            <UsersContextProvider>
              <TweetsContextProvider>
                <ListsContextProvider>
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route
                      path={`/${userData?.[0]?.username}`}
                      element={<Profile />}
                    />
                    <Route path="/:username" element={<ForeignProfile />} />
                    <Route path="/:username/lists" element={<Lists />} />
                    <Route
                      path="/:username/lists/create"
                      element={<CreateListModal />}
                    />
                    <Route path="/lists/:id" element={<List />} />
                    <Route path="/lists/:id/info" element={<EditListModal />} />
                    <Route
                      path="/lists/:id/members"
                      element={<ListMembersModal />}
                    />
                    <Route
                      path="/lists/:id/members/suggested"
                      element={<SuggestedListModal />}
                    />
                    <Route
                      path="/:username/followers"
                      element={<Followers />}
                    />
                    <Route
                      path="/:username/following"
                      element={<Following />}
                    />
                    <Route
                      path="/settings/profile"
                      element={<EditProfileModal />}
                    />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route
                      path="/notifications/mentions"
                      element={<Mentions />}
                    />
                    <Route path="/status/:id" element={<TweetPage />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                    <Route path="/messages" element={<Message />} />
                    <Route path="/searchUser" element={<ChannelSearchUser />} />
                  </Routes>
                </ListsContextProvider>
              </TweetsContextProvider>
            </UsersContextProvider>
          )}
        </Layout>
      )}
    </ThemeProvider>
  );
}
