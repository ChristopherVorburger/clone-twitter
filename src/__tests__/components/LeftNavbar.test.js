import * as React from "react";
import LeftNavbar from "../../components/LeftNavbar/index";
import { render, screen } from "../test/ThemeAndRouter";

test("Affichage des éléments de la barre de recherche de gauche", () => {
  render(<LeftNavbar />);

  //const buttonHomeElement = screen.queryByRole("button", { name: /Home/i });
  // const buttonExpoleElement = screen.queryByTestId("CloseButton");
  // const buttonNotificationsElement = screen.queryByTestId("CloseButton");
  // const buttonMessagesElement = screen.queryByTestId("CloseButton");
  // const buttonBookmarksElement = screen.queryByTestId("CloseButton");
  // const buttonListsElement = screen.queryByTestId("CloseButton");
  // const buttonProfileElement = screen.queryByTestId("CloseButton");
  // const buttonMoreElement = screen.queryByTestId("CloseButton");
  const TwitterIconElement = screen.queryByTestId("TwitterIcon");

  //expect(buttonHomeElement).toBeInTheDocument();
  // expect(buttonExpoleElement).toBeInTheDocument();
  // expect(buttonNotificationsElement).toBeInTheDocument();
  // expect(buttonMessagesElement).toBeInTheDocument();
  // expect(buttonBookmarksElement).toBeInTheDocument();
  // expect(buttonListsElement).toBeInTheDocument();
  // expect(buttonProfileElement).toBeInTheDocument();
  // expect(buttonMoreElement).toBeInTheDocument();
  expect(TwitterIconElement).toBeInTheDocument();
});
