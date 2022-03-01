import * as React from "react";
import LeftNavbar from "../../components/LeftNavbar/index";
import { render, screen } from "@testing-library/react";

test("Affichage des éléments de la barre de recherche de gauche", () => {
  render(<LeftNavbar />);

  const buttonElement = screen.getByTestId("CloseButton");

  expect(buttonElement).toBeInTheDocument();
});
