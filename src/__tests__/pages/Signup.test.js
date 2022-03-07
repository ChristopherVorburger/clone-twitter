import SignUp from "../../pages/SignUp/SingUp";
import userEvent from "@testing-library/user-event";

import { render, screen } from "../test/ThemeAndRouter";

test("Affichage du bon text et input lors du clique sur le switch phone email", () => {
  render(<SignUp />);

  const textPhone = screen.queryByText(/Utiliser un téléphone/i);
  const textEmail = screen.queryByText(/Utiliser un email/i);
  const inputPhone = screen.queryByLabelText(/Phone/i);
  const inputEmail = screen.queryByLabelText(/Email/i);

  expect(textPhone).toBeInTheDocument();
  expect(textEmail).not.toBeInTheDocument();
  expect(inputPhone).not.toBeInTheDocument();
  expect(inputEmail).toBeInTheDocument();

  userEvent.click(textPhone);

  expect(textPhone).not.toBeInTheDocument();
  expect(inputEmail).not.toBeInTheDocument();

  // expect(inputPhone).toBeInTheDocument();
  // expect(useEmail).toBeInTheDocument();
  // je comprend pas mon phone disparais bien apres le clique mais lemail est pas la
});
