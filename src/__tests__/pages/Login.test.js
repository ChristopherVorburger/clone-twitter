import { render, screen } from "../test/ThemeAndRouter";
import Login from "../../components/Login/Login";

test("Affichage des éléments", () => {
  render(<Login />, { path: "/login" });
});
