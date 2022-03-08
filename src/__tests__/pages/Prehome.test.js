import Prehome from "../../pages/Prehome";

import { render, screen } from "../test-utils/ThemeAndRouter";

test("Affichage des éléments (sauf bouttons) de la page pré-acceuil", () => {
  render(<Prehome />);

  const bacgroundImageElement = screen.queryByTitle(
    /background with the twitter logo/i
  );
  const twitterIconElement = screen.queryByTestId("TwitterIcon");
  const happeningTitleElement = screen.queryByText(/Happening now/i);
  const joiningTitleElement = screen.queryByText(/Join Twitter today./i);
  const orDividerElement = screen.queryByTestId("or");
  const PrivacyPolicyElement = screen.queryByText(
    /By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use./i
  );

  const alreadyAccountElement = screen.queryByText(/Already have an account?/i);
  const copyrightElement = screen.queryByText(/© 2022 Twitter, Inc./i);

  expect(bacgroundImageElement).toBeInTheDocument();
  expect(twitterIconElement).toBeInTheDocument();
  expect(happeningTitleElement).toBeInTheDocument();
  expect(joiningTitleElement).toBeInTheDocument();
  expect(orDividerElement).toBeInTheDocument();
  expect(PrivacyPolicyElement).toBeInTheDocument();
  expect(alreadyAccountElement).toBeInTheDocument();
  expect(copyrightElement).toBeInTheDocument();
});

test("Affichage boutton SignUp Google", () => {
  render(<Prehome />);

  const buttonElement = screen.queryByTestId("GoogleButton");
  const imageElement = screen.queryByAltText(/logo google/i);
  const textElement = screen.queryByText(/Sign up with Google/i);

  expect(buttonElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
});

test("Affichage boutton SignUp Apple", () => {
  render(<Prehome />);

  const buttonElement = screen.queryByTestId(/AppleButton/i);
  const imageElement = screen.queryByAltText(/logo apple/i);
  const textElement = screen.queryByText(/Sign up with Apple/i);

  expect(buttonElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
});

test("Affichage et link boutton SignUp Phone Email", async () => {
  render(<Prehome />);

  const buttonElement = screen.getByTestId(/ClassicButtonSignup/i);
  const textElement = screen.queryByText(/Sign up with phone or email/i);

  expect(buttonElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();

  //manque partie link
});

test("Affichage et link boutton SignIn", () => {
  render(<Prehome />);

  const buttonElement = screen.queryByTestId(/SigninButton/i);
  const textElement = screen.queryByText(/Sign in/i);

  expect(buttonElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();

  //manque partie link
});
