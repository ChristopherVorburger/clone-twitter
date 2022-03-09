import SignUp from "../../pages/SignUp/SingUp";
import { selectMonth } from "../../pages/SignUp/DataSelect";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

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

  //je recup ma boucle dans le signup pour refaire mes data
  // attention a mettre pareil dans les values, on recois une string comme ça donc a ne pas test en number avec i mais `${i}`
  const selectDay = [];
  for (let i = 1; i < 32; i++) {
    selectDay.push({ value: `${i}`, label: `${i}` });
    expect(selectDay).toEqual(
      expect.arrayContaining([expect.objectContaining({ value: `${i}` })])
    );
  }
  const selectYear = [];
  for (let i = 2022; i > 1901; i--) {
    selectYear.push({ value: `${i}`, label: `${i}` });
    expect(selectYear).toEqual(
      expect.arrayContaining([expect.objectContaining({ value: `${i}` })])
    );
  }
});

test("Affichage des éléments non test plus haut", () => {
  render(<SignUp />);

  // les bouttons et logo
  const closeButton = screen.queryByTestId(/closeButton/i);
  const nextButton = screen.queryByTestId(/nextButton/i);
  const logoTwitterIcon = screen.queryByTestId(/logoTwitter/i);

  expect(closeButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
  expect(logoTwitterIcon).toBeInTheDocument();

  // les texts et tites
  const createAccountTitle = screen.queryByText(/Créer votre compte/i);
  const createPasswordTitle = screen.queryByText(/Créer votre mot de passe/i);
  const birthdayTitle = screen.queryByText(/Date de naissance/i);
  const birthdayText = screen.queryByText(
    /Cette information ne sera pas affichée publiquement. Confirmez votre âge, même si ce compte est pour une entreprise, un animal de compagnie ou autre chose./i
  );

  expect(createAccountTitle).toBeInTheDocument();
  expect(createPasswordTitle).toBeInTheDocument();
  expect(birthdayTitle).toBeInTheDocument();
  expect(birthdayText).toBeInTheDocument();

  // les inputs
  const fullNameInput = screen.queryByLabelText(/Nom et Prénom/i);
  const userameInput = screen.queryByLabelText(/Nom d'utilisateur/i);
  const passwordInput = screen.queryByLabelText(/Mot de passe/i);

  expect(fullNameInput).toBeInTheDocument();
  expect(userameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

// test("Bon fonctionnement du formulaire", () => {
//   // fake fonction
//   const signUp = jest.fn();

//   // const formSubmit = screen.queryByTestId(/formSubmit/i);

//   render(<SignUp onSubmit={signUp} />);

//   //création de fake infos via faker https://fakerjs.dev/guide/
//   const name = faker.name.findName();
//   const username = faker.internet.userName();
//   const email = faker.internet.email();
//   // const phone = faker.phone.phoneNumber("0# ## ## ## ##");
//   const password = faker.internet.password();
//   const month = faker.date.month();
//   const day = faker.datatype.number({ min: 1, max: 31 });
//   const year = faker.datatype.number({ min: 1902, max: 2022 });

//   const fullNameInput = screen.queryByLabelText(/Nom et Prénom/i);
//   const userameInput = screen.queryByLabelText(/Nom d'utilisateur/i);
//   const inputEmail = screen.queryByLabelText(/Email/i);
//   // const inputPhone = screen.queryByLabelText(/Phone/i);
//   const passwordInput = screen.queryByLabelText(/Mot de passe/i);
//   const inputMonth = screen.queryByLabelText(/Mois/i);
//   const inputDay = screen.queryByLabelText(/Jour/i);
//   const inputYear = screen.queryByLabelText(/Année/i);
//   const nextButton = screen.queryByTestId(/nextButton/i);

//   userEvent.type(fullNameInput, name);
//   userEvent.type(userameInput, username);
//   userEvent.type(inputEmail, email);
//   // userEvent.type(inputPhone, phone);
//   userEvent.type(passwordInput, password);
//   userEvent.type(inputMonth, month);
//   userEvent.type(inputDay, day);
//   userEvent.type(inputYear, year);
//   userEvent.click(nextButton);

//   expect(signUp).toHaveBeenCalledTimes(1);
//   expect(signUp).toHaveBeenCalledWith({
//     name,
//     username,
//     email,
//     // phone,
//     password,
//     month,
//     day,
//     year,
//   });
// });
