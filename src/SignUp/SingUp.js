import React from "react";
import useStyles from "./Styles";
import CloseButton from "../components/CloseButton/CloseButton";
import LogoTwitter from "../components/TwitterLogo/TwitterLogo";
import { Typography, Button, TextField, Box, Stack } from "@mui/material";
import { SelectMois, SelectJours, SelectAnnees } from "./DataSelect";

function InputName() {
  const classes = useStyles();

  return (
    <Box component="form">
      <TextField
        variant="outlined"
        label="Nom et prénom"
        autoFocus={true}
        className={classes.input}
      />
    </Box>
  );
}

function InputPhoneEmail() {
  const classes = useStyles();
  const InputPhone = () => {
    return (
      <Box component="form">
        <TextField
          variant="outlined"
          label="Téléphone"
          className={classes.input}
        />
      </Box>
    );
  };

  const InputEmail = () => {
    return (
      <Box component="form">
        <TextField variant="outlined" label="Email" className={classes.input} />
      </Box>
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
  const classes = useStyles();
  const MonthInput = () => {
    return (
      <Box component="form" className={classes.inputMonth}>
        <SelectMois />
      </Box>
    );
  };

  const DayInput = () => {
    return (
      <Box component="form" className={classes.inputDay}>
        <SelectJours />
      </Box>
    );
  };

  const YearInput = () => {
    return (
      <Box component="form" className={classes.inputYear}>
        <SelectAnnees />
      </Box>
    );
  };

  return (
    <Stack direction="row" marginTop="25px" spacing={2}>
      <MonthInput />
      <DayInput />
      <YearInput />
    </Stack>
  );
}

function NextButton() {
  const classes = useStyles();
  return (
    <Button className={classes.nextButton} variant="contained" size="large">
      Suivant
    </Button>
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
      className={classes.stackContainer}
    >
      <div className={classes.signUpContainer}>
        <Stack direction="row">
          <CloseButton />
          <Stack justifyContent="center" alignItems="center" width="83%">
            <LogoTwitter />
          </Stack>
        </Stack>
        <Stack margin="15px 32px" spacing="20px">
          <Typography className={classes.accountCreateTitle}>
            Créer votre compte
          </Typography>
          <Stack margin="25px 0 0 0 !important" spacing="25px">
            <InputName />
            <InputPhoneEmail />
          </Stack>
          <SwitchPhoneEmail />
        </Stack>
        <Stack margin="30px">
          <Typography className={classes.birthdayTitle}>
            Date de naissance
          </Typography>
          <Typography className={classes.birthdayText}>
            Cette information ne sera pas affichée publiquement. Confirmez votre
            âge, même si ce compte est pour une entreprise, un animal de
            compagnie ou autre chose.
          </Typography>
          <MMDDYYYYInput />
        </Stack>
        <Stack marginTop="65px" alignItems="center">
          <NextButton />
        </Stack>
      </div>
    </Stack>
  );
}
export default SingUp;
