import { render, screen } from "../test-utils/ThemeAndRouter";
import Login from "../../components/Login/Login";

test("Affichage 1er modale", () => {
  render(<Login />, { path: "/login" });

  const closeButtonModal1 = screen.queryByTestId(/closeButtonModal1/i);
  const twitterIcon1 = screen.queryByTestId(/twitterIcon1/i);
  const connectTitle = screen.queryByText(/Connectez-vous à Twitter/i);
});

test("Affichage boutton SignUp Google", () => {
  render(<Login />, { path: "/login" });

  const buttonElement = screen.queryByTestId(/connectButtonGoogle/i);
  const imageElement = screen.queryByAltText(/logo de google/i);
  const textElement = screen.queryByText(/Se connecter avec Google/i);

  expect(buttonElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
});

test("Affichage boutton SignUp Apple", () => {
  render(<Login />, { path: "/login" });

  const buttonElement = screen.queryByTestId(/connectButtonApple/i);
  const imageElement = screen.queryByAltText(/logo d'apple/i);
  const textElement = screen.queryByText(/Se connecter avec Apple/i);

  expect(buttonElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
});
