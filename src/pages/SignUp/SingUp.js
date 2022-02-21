import React from "react";
import useStyles from "./Styles";
import CloseButton from "../../components/CloseButton/CloseButton";
import LogoTwitter from "../../components/TwitterLogo/TwitterLogo";
import { Typography, Button, TextField, Box, Stack } from "@mui/material";
import { SelectMonth, SelectDay, SelectYear } from "./DataSelect";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

function InputName() {
  const [error, setError] = React.useState(false);
  const handleChange = (e) => {
    e.target.value.length >= 3 && e.target.value.includes(" ")
      ? setError(false)
      : setError(true);
  };
  return (
    <Box component="form">
      <TextField
        variant="outlined"
        label="Nom et prénom"
        fullWidth={true}
        autoFocus={true}
        onChange={handleChange}
        error={error}
        helperText={error === true ? "Quel est votre nom ?" : null}
      />
    </Box>
  );
}

function InputPhoneEmail({ switchPhoneEmail }) {
  const InputPhone = () => {
    const [error, setError] = React.useState(false);
    const handleChange = (e) => {
      console.log(e.target.value);
      typeof parseInt(e.target.value) === "number" &&
      e.target.value.length === 10
        ? setError(false)
        : setError(true);
    };
    return (
      <Box component="form">
        <TextField
          variant="outlined"
          label="Téléphone"
          fullWidth={true}
          onChange={handleChange}
          error={error}
          helperText={
            error === true
              ? "Veuillez entrer un numéro de téléphone valide."
              : null
          }
        />
      </Box>
    );
  };

  const InputEmail = ({ setRegisterEmail }) => {
    const [error, setError] = React.useState(false);

    const handleChange = (e) => {
      console.log(e.target.value);
      e.target.value.includes("@") && e.target.value.includes(".")
        ? setError(false)
        : setError(true);
      setRegisterEmail(e.target.value);
    };
    return (
      <Box>
        <TextField
          variant="outlined"
          label="Email"
          fullWidth={true}
          onChange={handleChange}
          error={error}
          helperText={
            error === true ? "Veuillez entrer un email valide." : null
          }
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

function SwitchPhoneEmail({ switchPhoneEmail, setSwitchPhoneEmail }) {
  const classes = useStyles();

  let switchRender;

  if (switchPhoneEmail === "Phone") {
    switchRender = (
      <Typography
        className={classes.switchPhoneEmail}
        onClick={() => setSwitchPhoneEmail("Email")}
      >
        Utiliser un téléphone
      </Typography>
    );
  } else if (switchPhoneEmail === "Email") {
    switchRender = (
      <Typography
        className={classes.switchPhoneEmail}
        onClick={() => setSwitchPhoneEmail("Phone")}
      >
        Utiliser un email
      </Typography>
    );
  }

  return <>{switchRender}</>;
}

function MMDDYYYYInput() {
  const MonthInput = () => {
    return (
      <Box component="form" width="48%">
        <SelectMonth />
      </Box>
    );
  };

  const DayInput = () => {
    return (
      <Box component="form" width="22%">
        <SelectDay />
      </Box>
    );
  };

  const YearInput = () => {
    return (
      <Box component="form" width="30%">
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

const PasswordInput = ({ setRegisterPassword }) => {
  const [isOk, setIsOk] = React.useState(false);

  const handleChange = (e) => {
    e.target.value.length >= 10 ? setIsOk(false) : setIsOk(true);
    setRegisterPassword(e.target.value);
  };
  return (
    <Box>
      <TextField
        type="password"
        variant="outlined"
        label="Mot de passe"
        fullWidth={true}
        onChange={handleChange}
        error={isOk}
        helperText={isOk === true ? "Votre mot de passe est trop cour" : null}
      />
    </Box>
  );
};

function SignUp() {
  const classes = useStyles();
  const [switchPhoneEmail, setSwitchPhoneEmail] = React.useState("Email");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <Stack
        className={("page", classes.page)}
        heigth="100vh"
        width="83%"
        margin="0 auto"
        spacing={2.5}
      >
        <Stack className="logoAndClose" direction="row" alignItems="center">
          <Link to="/">
            <CloseButton role="button" />
          </Link>
          <Stack className={classes.logo}>
            <LogoTwitter role="logo" />
          </Stack>
        </Stack>
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
              <InputName role="input" />
              <InputPhoneEmail
                switchPhoneEmail={switchPhoneEmail}
                setRegisterEmail={setRegisterEmail}
                role="input"
              />
            </Stack>
            <SwitchPhoneEmail
              switchPhoneEmail={switchPhoneEmail}
              setSwitchPhoneEmail={setSwitchPhoneEmail}
            />
          </Stack>
          <Typography className={classes.birthdayPasswordTitle}>
            Créer votre mot de passe
          </Typography>
          <PasswordInput
            setRegisterPassword={setRegisterPassword}
            role="input"
          />
          <Stack className="birthday">
            <Typography className={classes.birthdayPasswordTitle}>
              Date de naissance
            </Typography>
            <Typography className={classes.birthdayText}>
              Cette information ne sera pas affichée publiquement. Confirmez
              votre âge, même si ce compte est pour une entreprise, un animal de
              compagnie ou autre chose.
            </Typography>
            <MMDDYYYYInput role="input" />
          </Stack>
          <Stack className="nextButton" backgroundColor="white">
            <Button
              className={classes.nextButton}
              size="large"
              onClick={register}
              role="button"
            >
              Suivant
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
export default SignUp;
