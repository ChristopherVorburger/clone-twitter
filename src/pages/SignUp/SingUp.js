import React from "react";
import useStyles from "./Styles";
import CloseButton from "../../components/CloseButton/CloseButton";
import LogoTwitter from "../../components/TwitterLogo/TwitterLogo";
import { Typography, Button, TextField, Box, Stack } from "@mui/material";
import { SelectMonth, SelectDay, SelectYear } from "./DataSelect";
import { Link } from "react-router-dom";

function InputName() {
  return (
    <Box component="form">
      <TextField
        variant="outlined"
        label="Nom et prénom"
        autoFocus={true}
        fullWidth={true}
      />
    </Box>
  );
}

function InputPhoneEmail() {
  const InputPhone = () => {
    return (
      <Box component="form">
        <TextField variant="outlined" label="Téléphone" fullWidth={true} />
      </Box>
    );
  };

  const InputEmail = () => {
    return (
      <Box component="form">
        <TextField variant="outlined" label="Email" fullWidth={true} />
      </Box>
    );
  };

  return (
    <>
      {/* <InputPhone /> */}
      <InputEmail />
    </>
  );
}

function SwitchPhoneEmail() {
  const classes = useStyles();
  return (
    <>
      {/* <Typography className={classes.switchPhoneEmail}>
        Utiliser un téléphone
      </Typography> */}
      <Typography className={classes.switchPhoneEmail}>
        Utiliser un email
      </Typography>
    </>
  );
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

function SingUp() {
  const classes = useStyles();
  return (
    <Stack
      className="page"
      heigth="100%"
      width="83%"
      margin="5px auto"
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
      <Stack
        className={classes.signupContainer}
        height="100%"
        width="92%"
        marginLeft="25px !important"
        spacing={2}
      >
        <Stack className="accountCreate" spacing={4}>
          <Typography className={classes.accountCreateTitle}>
            Créer votre compte
          </Typography>
          <Stack className="input" spacing={4}>
            <InputName />
            <InputPhoneEmail />
          </Stack>
          <SwitchPhoneEmail />
        </Stack>
        <Stack className="birthday">
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
      </Stack>
      <Stack className="nextButton">
        <Button className={classes.nextButton} size="large">
          Suivant
        </Button>
      </Stack>
    </Stack>
  );
}
export default SingUp;
