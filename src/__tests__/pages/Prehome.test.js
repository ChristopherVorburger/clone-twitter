import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Prehome from "../../pages/Prehome";
import SignUp from "../../pages/SignUp/SingUp";
import Login from "../../components/Login/Login";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { render, screen } from "@testing-library/react";

test("Affiche la page de pré-acceuil hors connexion", () => {
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
  expect(
    screen.getByTitle("background with the twitter logo")
  ).toBeInTheDocument();
  expect(screen.getByText("Happening now")).toBeInTheDocument();
  expect(screen.getByText("Join Twitter today.")).toBeInTheDocument();
  expect(screen.getByAltText("logo google")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Sign up with Google/i })
  ).toBeInTheDocument();
  expect(screen.getByAltText("logo apple")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Sign up with Apple/i })
  ).toBeInTheDocument();
  expect(screen.getByText("Sign up with phone or email")).toBeInTheDocument();
  expect(
    screen.getByText(
      "By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use."
    )
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Sign in/i })).toBeInTheDocument();
  expect(screen.getByText("© 2022 Twitter, Inc.")).toBeInTheDocument();
});
