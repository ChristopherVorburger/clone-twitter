import * as React from "react";
import ButtonAddTweet from "../../components/buttons/AddTweetButton/index";
import useStyles from "../../components/buttons/AddTweetButton/styles";
import { render, screen } from "@testing-library/react";

test("Affichage du bouton d'ajout de Tweet", () => {
  const theme = useStyles();
  render(<ButtonAddTweet />);

  const buttonElement = screen.getByTestId("featherIconButton");

  expect(buttonElement).toBeInTheDocument();
});
