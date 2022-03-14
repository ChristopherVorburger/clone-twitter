import Login from "../../components/Login/Login";
import { render, screen } from "../test-utils/ThemeAndRouter";
import AuthContextProvider from "../../context/authContext";

test("affichage des éléments du login", () => {
  render(<Login path="/login" />);
});
