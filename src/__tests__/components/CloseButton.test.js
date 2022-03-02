import * as React from "react";
import CloseButton from "../../components/CloseButton/CloseButton";
import { render, screen } from "@testing-library/react";

test("Affichage du bouton close", () => {
  render(<CloseButton />);

  const buttonElement = screen.queryByTestId("CloseButton");

  expect(buttonElement).toBeInTheDocument();
});
