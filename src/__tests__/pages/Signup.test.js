import { render, screen } from "../test/ThemeAndRouter";
import SignUp from "../../pages/SignUp/SingUp";

test("Affichage", () => {
  render(<SignUp />);
});
