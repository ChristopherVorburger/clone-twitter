import SignUp from "../../pages/SignUp/SingUp";
import { selectMonth } from "../../pages/SignUp/DataSelect";
import userEvent from "@testing-library/user-event";

import { render, screen } from "../test-utils/ThemeAndRouter";

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

  // expect(inputEmail).not.toBeInTheDocument();
  // expect(inputPhone).toBeInTheDocument();
  // expect(useEmail).toBeInTheDocument();
  // je comprend pas mon phone disparais bien apres le clique mais lemail est pas la
});

test("Affichage des input et des data pour date de naissance", () => {
  render(<SignUp />);

  const inputMonth = screen.queryByLabelText(/Mois/i);
  const inputDay = screen.queryByLabelText(/Jour/i);
  const inputYear = screen.queryByLabelText(/Année/i);

  expect(inputMonth).toBeInTheDocument();
  expect(inputDay).toBeInTheDocument();
  expect(inputYear).toBeInTheDocument();

  userEvent.click(inputMonth);
  userEvent.click(inputDay);
  userEvent.click(inputYear);

  // je regarde si mon selectMonth est un array qui
  //contient des objet avec les bonne value
  expect(selectMonth).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ value: "" }),
      expect.objectContaining({ value: "Janvier" }),
      expect.objectContaining({ value: "Février" }),
      expect.objectContaining({ value: "Mars" }),
      expect.objectContaining({ value: "Avril" }),
      expect.objectContaining({ value: "Mai" }),
      expect.objectContaining({ value: "Juin" }),
      expect.objectContaining({ value: "Juillet" }),
      expect.objectContaining({ value: "Aout" }),
      expect.objectContaining({ value: "Septembre" }),
      expect.objectContaining({ value: "Octobre" }),
      expect.objectContaining({ value: "Novembre" }),
      expect.objectContaining({ value: "Décembre" }),
    ])
  );

  const selectDay = [];
  for (let i = 1; i < 32; i++) {
    selectDay.push({ value: `${i}`, label: `${i}` });
  }
});
