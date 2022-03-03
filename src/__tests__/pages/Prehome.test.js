import Prehome from "../../pages/Prehome";

import { render, screen } from "../test/ThemeAndRouter";

test("Affichage des éléments (sauf bouttons) de la page pré-acceuil", () => {
  render(<Prehome />);

  const bacgroundImageElement = screen.queryByTitle(
    "background with the twitter logo"
  );
  const twitterIconElement = screen.queryByTestId("TwitterIcon");
  const happeningTitleElement = screen.queryByText("Happening now");
  const joiningTitleElement = screen.queryByText("Join Twitter today.");
  const orDividerElement = screen.queryByText("or");
  const PrivacyPolicyElement = screen.queryByText(
    "By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use."
  );

  const alreadyAccountElement = screen.queryByText("Already have an account?");
  const copyrightElement = screen.queryByText("© 2022 Twitter, Inc.");

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
  const imageElement = screen.queryByAltText("logo google");
  const textElement = screen.queryByText("Sign up with Google");

  expect(buttonElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
});

test("Affichage boutton SignUp Apple", () => {
  render(<Prehome />);

  const buttonElement = screen.queryByTestId("AppleButton");
  const imageElement = screen.queryByAltText("logo apple");
  const textElement = screen.queryByText("Sign up with Apple");

  expect(buttonElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
});

test("Affichage et link boutton SignUp Phone Email", () => {
  render(<Prehome />);

  const buttonElement = screen.queryByTestId("ClasicButtonSignup");
  const textElement = screen.queryByText("Sign up with phone or email");
  const linkElement = screen.getByRole("link", {
    name: /Sign up with phone or email/i,
  });

  expect(buttonElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
  expect(linkElement).toHaveBeenCalledWith({ to: "/signup" });
});

test("Affichage et link boutton SignIn", () => {
  render(<Prehome />);

  const buttonElement = screen.queryByTestId("SigninButton");
  const textElement = screen.queryByText("Sign in");

  expect(buttonElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
});
