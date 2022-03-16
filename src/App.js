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

import EditProfileModal from "./components/EditProfileModal";
import Layout from "./components/Layout";
import Exemple from "./components/Exemple";
import Login from "./components/Login/Login";
import CreateListModal from "./components/CreateListModal";
import SuggestedListModal from "./components/SuggestedListModal";
import ListMembersModal from "./components/ListMembersModal";
import EditListModal from "./components/EditListModal";

import { AuthContext } from "./context/authContext";
import { SnackbarsContextProvider } from "./context/snackbarsContext";
import { ListsContextProvider } from "./context/listsContext";

import TweetPage from "./pages/Tweet/TweetPage";
import ScrollToTop from "./components/ScrollToTop";
import Explore from "./pages/Explore/Explore";

export default function App() {
  const auth = React.useContext(AuthContext);
<<<<<<< HEAD

=======
>>>>>>> dev
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
      {!auth.authUser ? (
        <Routes>
          <Route path="/" element={<Prehome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Layout>
          <ListsContextProvider>
            <SnackbarsContextProvider>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/exemple" element={<Exemple />} />
                <Route path="/:username" element={<Profile />} />
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
                <Route path="/:username/followers" element={<Followers />} />
                <Route path="/:username/following" element={<Following />} />
                <Route
                  path="/settings/profile"
                  element={<EditProfileModal />}
                />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/notifications/mentions" element={<Mentions />} />
                <Route path="/status/:id" element={<TweetPage />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </SnackbarsContextProvider>
          </ListsContextProvider>
        </Layout>
      )}
    </ThemeProvider>
  );
}
