import Prehome from "../../pages/Prehome";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { render, screen } from "@testing-library/react";

test("Affiche la page de pré-acceuil hors connexion", () => {
  const theme = createTheme({});
  render(
    <ThemeProvider theme={theme}>
      <Prehome />
    </ThemeProvider>
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
  expect(screen.getByRole("button", { name: /Sign in/i })).toBeInTheDocument();
  expect(screen.getByText("© 2022 Twitter, Inc.")).toBeInTheDocument();
});
