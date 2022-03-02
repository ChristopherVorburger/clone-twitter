import * as React from "react";
import ProfileButton from "../../components/buttons/ProfileButton/index";
import { render, screen } from "@testing-library/react";

test("Affichage du button profile", () => {
  render(<ProfileButton />);

  const buttonElement = screen.queryByTestId("profileButton");

  expect(buttonElement).toBeInTheDocument();
});
