import React, { useRef, useContext } from "react";
import useStyles from "./Styles";
import CloseButton from "../../components/CloseButton/CloseButton";
import LogoTwitter from "../../components/TwitterLogo/TwitterLogo";
import { Typography, Button, TextField, Box, Stack } from "@mui/material";
import { SelectMonth, SelectDay, SelectYear } from "./DataSelect";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Alert from "@mui/material/Alert";

function SignUp() {
  const classes = useStyles();
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  const yearRef = useRef();
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [switchPhoneEmail, setSwitchPhoneEmail] = React.useState("Email");
  const [errorCreateAccount, setErrorCreateAccount] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setErrorCreateAccount("");
      setLoading(true);
      await signup(
        nameRef.current[0].value,
        phoneRef.current[1].value || emailRef.current[1].value,
        passwordRef.current[2].value,
        monthRef.current[3].value,
        dayRef.current[4].value,
        yearRef.current[5].value
      );
      navigate("/home");
    } catch {
      setErrorCreateAccount(true);
    }
    setLoading(false);
  }

  const InputName = () => {
    const handleChange = (e) => {};
    return (
      <Box>
        <TextField
          variant="outlined"
          label="Nom et prénom"
          fullWidth={true}
          autoFocus={true}
          onChange={handleChange}
          ref={nameRef}
        />
      </Box>
    );
  };

  function InputPhoneEmail({ switchPhoneEmail }) {
    const InputPhone = () => {
      const handleChange = (e) => {};
      return (
        <Box>
          <TextField
            variant="outlined"
            label="Téléphone"
            fullWidth={true}
            onChange={handleChange}
            ref={phoneRef}
          />
        </Box>
      );
    };

    const InputEmail = () => {
      const handleChange = (e) => {};
      return (
        <Box>
          <TextField
            variant="outlined"
            label="Email"
            fullWidth={true}
            onChange={handleChange}
            ref={emailRef}
          />
        </Box>
      );
    };

    let inputRender;

    if (switchPhoneEmail === "Phone") {
      inputRender = <InputEmail />;
    } else if (switchPhoneEmail === "Email") {
      inputRender = <InputPhone />;
    }

    return <>{inputRender}</>;
  }

  const PasswordInput = () => {
    const handleChange = (e) => {};
    return (
      <Box>
        <TextField
          type="password"
          variant="outlined"
          label="Mot de passe"
          fullWidth={true}
          onChange={handleChange}
          ref={passwordRef}
        />
      </Box>
    );
  };

  const SwitchPhoneEmail = ({ switchPhoneEmail, setSwitchPhoneEmail }) => {
    const classes = useStyles();

    let switchRender;

    if (switchPhoneEmail === "Phone") {
      switchRender = (
        <Typography
          className={classes.switchPhoneEmail}
          onClick={() => setSwitchPhoneEmail("Email")}
          width={140}
        >
          Utiliser un téléphone
        </Typography>
      );
    } else if (switchPhoneEmail === "Email") {
      switchRender = (
        <Typography
          className={classes.switchPhoneEmail}
          onClick={() => setSwitchPhoneEmail("Phone")}
          width={110}
        >
          Utiliser un email
        </Typography>
      );
    }

    return <>{switchRender}</>;
  };

  function MMDDYYYYInput() {
    const MonthInput = () => {
      return (
        <Box width="48%" ref={monthRef}>
          <SelectMonth />
        </Box>
      );
    };

    const DayInput = () => {
      return (
        <Box width="22%" ref={dayRef}>
          <SelectDay />
        </Box>
      );
    };

    const YearInput = () => {
      return (
        <Box width="30%" ref={yearRef}>
          <SelectYear />
        </Box>
      );
    };

    return (
      <Stack
        className="MM-DD-YYYYInput"
        direction="row"
        marginTop="15px"
        spacing={2}
      >
        <MonthInput />
        <DayInput />
        <YearInput />
      </Stack>
    );
  }

  return (
    <div className={classes.mainContainer}>
      <Stack
        className={("box", classes.box)}
        heigth="100vh"
        width="83%"
        margin="0 auto"
        spacing={2.5}
      >
        <Stack className="logoAndClose" direction="row" alignItems="center">
          <Link to="/">
            <CloseButton />
          </Link>
          <Stack className={classes.logo}>
            <LogoTwitter />
          </Stack>
        </Stack>
        {errorCreateAccount && (
          <Alert severity="error">La création du compte à échoué</Alert>
        )}
        <form name="formSignup" onSubmit={handleSubmit}>
          <Stack
            className={classes.signupContainer}
            width="100%"
            justifyContent="center"
            spacing={2}
          >
            <Stack className="accountCreate" spacing={4}>
              <Typography className={classes.accountCreateTitle}>
                Créer votre compte
              </Typography>
              <Stack className="input" spacing={4}>
                <InputName />
                <InputPhoneEmail switchPhoneEmail={switchPhoneEmail} />
              </Stack>
              <SwitchPhoneEmail
                switchPhoneEmail={switchPhoneEmail}
                setSwitchPhoneEmail={setSwitchPhoneEmail}
              />
            </Stack>
            <Typography className={classes.birthdayPasswordTitle}>
              Créer votre mot de passe
            </Typography>
            <PasswordInput />
            <Stack className="birthday">
              <Typography className={classes.birthdayPasswordTitle}>
                Date de naissance
              </Typography>
              <Typography className={classes.birthdayText}>
                Cette information ne sera pas affichée publiquement. Confirmez
                votre âge, même si ce compte est pour une entreprise, un animal
                de compagnie ou autre chose.
              </Typography>
              <MMDDYYYYInput />
            </Stack>
            <Stack className="nextButton" backgroundColor="white">
              <Button
                type="submit"
                className={classes.nextButton}
                size="large"
                disabled={loading}
              >
                Suivant
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </div>
  );
}
export default SignUp;
