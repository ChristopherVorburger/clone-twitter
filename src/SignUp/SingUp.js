import React from "react";
import useStyles from "./Styles";
import CloseButton from "../components/CloseButton/CloseButton";
import LogoTwitter from "../components/TwitterLogo/TwitterLogo";
import { Typography, Button, Stack, TextField, Box } from "@mui/material";
import { SelectMois, SelectJours, SelectAnnees } from "./DataSelect";

function ButtonClose() {
  return <CloseButton></CloseButton>;
}

function TwitterLogo() {
  return <LogoTwitter />;
}

function AccountCreateTitle() {
  const classes = useStyles();
  return (
    <div className="accountCreateTitle">
      <Typography className={classes.accountCreateTitle}>
        Créer votre compte
      </Typography>
    </div>
  );
}

function InputName() {
  return (
    <div className="inputName">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
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
            "& > :not(style)": { m: 1, width: "25ch" },
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
      <InputEmail />
    </div>
  );
}

function SwitchPhoneEmail() {
  const classes = useStyles();
  return (
    <div className="switchPhoneEmail">
      <Typography className={classes.switchPhoneEmail}>
        Utiliser un téléphone
      </Typography>
      <Typography className={classes.switchPhoneEmail}>
        Utiliser un email
      </Typography>
    </div>
  );
}

function BirthdayTitle() {
  const classes = useStyles();
  return (
    <div className="birthdayTitle">
      <Typography className={classes.birthdayTitle}>
        Date de naissance
      </Typography>
    </div>
  );
}

function BirthdayText() {
  const classes = useStyles();
  return (
    <div className="birthdayText">
      <Typography className={classes.birthdayText}>
        Cette information ne sera pas affichée publiquement. Confirmez votre
        âge, même si ce compte est pour une entreprise, un animal de compagnie
        ou autre chose.
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
  return (
    <div className="nextButton">
      <Button>Suivant</Button>
    </div>
  );
}

function SingUp() {
  return (
    <div className="signUpContainer">
      <div className="closeAndLogo">
        <ButtonClose />
        <TwitterLogo />
      </div>
      <div className="accountCreate">
        <AccountCreateTitle />
        <InputName />
        <InputPhoneEmail />
        <SwitchPhoneEmail />
      </div>
      <div className="birthday">
        <BirthdayTitle />
        <BirthdayText />
        <MMDDYYYYInput />
      </div>
      <div className="nextButton">
        <NextButton />
      </div>
    </div>
  );
}
export default SingUp;

// info :
//1: couleur : rgba(91, 112, 131, 0.4) (div body); black (div centre); rgb(217, 217, 217) (logo twitter et 2 titres);
//rgb(29, 155, 240) (tout le bleu);#be1a24 (tout le rouge); rgb(47, 51, 54) (tout le gris)
//2: ajout mui : @mui/icons-material
