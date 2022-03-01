import * as React from "react";
import LogoTwitter from "../../components/TwitterLogo/TwitterLogo";
import { render, screen } from "@testing-library/react";

test("Affichage du logo twitter", () => {
  render(<LogoTwitter />);

  const logoElement = screen.getByTestId("TwitterLogo");

  expect(logoElement).toBeInTheDocument();
});
