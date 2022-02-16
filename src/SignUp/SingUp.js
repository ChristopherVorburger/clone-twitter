import React from "react";
import useStyles from "./Styles";
import CloseButton from "../components/CloseButton/CloseButton";
import LogoTwitter from "../components/TwitterLogo/TwitterLogo";
import { Typography, Button, TextField, Box, Stack } from "@mui/material";
import { SelectMois, SelectJours, SelectAnnees } from "./DataSelect";

// ajout mui : @mui/icons-material

function InputName() {
  return (
    <div className="inputName">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
      >
        <TextField variant="outlined" label="Nom et prénom" autoFocus={true} />
      </Box>
    </div>
  );
}

function InputPhoneEmail() {
  const InputPhone = () => {
    return (
      <div className="inputPhone">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
        >
          <TextField variant="outlined" label="Téléphone" />
        </Box>
      </div>
    );
  };

  const InputEmail = () => {
    return (
      <div className="inputEmail">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          <TextField variant="outlined" label="Email" />
        </Box>
      </div>
    );
  };

  return (
    <div className="inputPhoneEmail">
      <InputPhone />
      {/* <InputEmail /> */}
    </div>
  );
}

function SwitchPhoneEmail() {
  const classes = useStyles();
  return (
    <div className="switchPhoneEmail">
      {/* <Typography className={classes.switchPhoneEmail}>
        Utiliser un téléphone
      </Typography> */}
      <Typography className={classes.switchPhoneEmail}>
        Utiliser un email
      </Typography>
    </div>
  );
}

function MMDDYYYYInput() {
  const MonthInput = () => {
    return (
      <div className="monthInput">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100ch" },
          }}
        >
          <SelectMois />
        </Box>
      </div>
    );
  };

  const DayInput = () => {
    return (
      <div className="dayInput">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          <SelectJours />
        </Box>
      </div>
    );
  };

  const YearInput = () => {
    return (
      <div className="yearInput">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          <SelectAnnees />
        </Box>
      </div>
    );
  };

  return (
    <div className="MM-DD-YYYYInput">
      <MonthInput />
      <DayInput />
      <YearInput />
    </div>
  );
}

function NextButton() {
  const classes = useStyles();
  return (
    <div className="nextButton">
      <Button className={classes.nextButton} variant="contained" size="large">
        Suivant
      </Button>
    </div>
  );
}

function SingUp() {
  const classes = useStyles();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.4)"
      height="100vh"
    >
      <div className={classes.signUpContainer}>
        <Stack direction="row" justifyContent="flex-start" spacing="10">
          <CloseButton />
          <LogoTwitter />
        </Stack>
        <Stack margin="25px">
          <div className="accountCreate">
            <Typography className={classes.accountCreateTitle}>
              Créer votre compte
            </Typography>
            <InputName />
            <InputPhoneEmail />
            <SwitchPhoneEmail />
          </div>
          <div className="birthday">
            <Typography className={classes.birthdayTitle}>
              Date de naissance
            </Typography>
            <Typography className={classes.birthdayText}>
              Cette information ne sera pas affichée publiquement. Confirmez
              votre âge, même si ce compte est pour une entreprise, un animal de
              compagnie ou autre chose.
            </Typography>
            <MMDDYYYYInput />
          </div>
          <div className="nextButton">
            <NextButton />
          </div>
        </Stack>
      </div>
    </Stack>
  );
}
export default SingUp;
