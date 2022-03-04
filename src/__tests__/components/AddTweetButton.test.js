import * as React from "react";
import ButtonAddTweet from "../../components/buttons/AddTweetButton/index";
import { ThemeProvider } from "@mui/material/styles";

import { render, screen } from "../test/ThemeOnly";

test("Affichage du bouton d'ajout de Tweet", () => {
  render(<ButtonAddTweet />);

  const buttonElement = screen.queryByTestId("featherIconButton");

  expect(buttonElement).toBeInTheDocument();
});
