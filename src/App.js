import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Prehome from './pages/Prehome';
import SignUp from './pages/SignUp/SingUp';
import Login from './components/Login/Login';
import Home from './pages/Home';
import Exemple from './components/Exemple';
import Message from './components/Message/Message';

export default function App() {
  // Création d'un thème pour changer la couleur principale de MUI
  const theme = createTheme({
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
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Prehome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exemple" element={<Exemple />} />
        <Route path="/messages" element={<Message />} />
      </Routes>
    </ThemeProvider>
  );
}
