import { render, screen } from "@testing-library/react";
import SignUp from "../../pages/SignUp/SingUp";
import Prehome from "../../pages/Prehome";
import Login from "../../components/Login/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Router, Routes, Route } from "react-router-dom";

test("Affichage", () => {
  const theme = createTheme({});
  render(
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Prehome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );

  expect(screen.getByText("Créer votre compte")).toBeInTheDocument();
  expect(screen.getByText("Créer votre mot de passe")).toBeInTheDocument();
  expect(screen.getByText("Date de naissance")).toBeInTheDocument();
  expect(
    screen.getByText(`Cette information ne sera pas affichée publiquement. Confirmez
  votre âge, même si ce compte est pour une entreprise, un animal de
  compagnie ou autre chose.`)
  ).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByRole("logo")).toBeInTheDocument();
  expect(screen.getByRole("input")).toBeInTheDocument();
});
