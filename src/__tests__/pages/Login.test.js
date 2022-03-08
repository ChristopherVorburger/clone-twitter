import { render, screen } from "../test-utils/ThemeAndRouter";
import Login from "../../components/Login/Login";

test("Affichage des éléments", () => {
  render(<Login />, { path: "/login" });
});
