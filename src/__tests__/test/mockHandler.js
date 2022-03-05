import { rest } from "msw";
import SignUp from "../../pages/SignUp/SingUp";

const mockHandlers = [
  rest.get("/signup", async (requet, result, context) => {
    return result(<SignUp />);
  }),
];
export default mockHandlers;
