import { makeStyles } from "@mui/styles";
import { hover } from "@testing-library/user-event/dist/hover";

export default makeStyles({
  accountCreateTitle: {
    color: "#0F1419",
    fontSize: "22px !important",
    fontWeight: "bold !important ",
  },
  switchPhoneEmail: { color: "rgb(29, 155, 240)", fontSize: "15px !important" },
  birthdayTitle: { fontWeight: "bold !important", fontSize: "15px !important" },
  birthdayText: { color: "rgb(83, 100, 113)", fontSize: "15px !important" },
  nextButton: {
    backgroundColor: "#878a8c !important",
    borderRadius: "20px !important",
    textTransform: "none!important",
    fontWeight: "bold !important",
  },
  signUpContainer: {
    width: "600px",
    height: "650px",
    backgroundColor: "white",
    borderRadius: "15px",
  },
});
