import React from "react";
import useStyles from "./Styles";
import CloseButton from "../components/CloseButton/CloseButton";
import LogoTwitter from "../components/TwitterLogo/TwitterLogo";
import { Typography, Input, Button, Stack } from "@mui/material";

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
      <Typography>Créer votre compte</Typography>
    </div>
  );
}

/* font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; */

function InputName() {
  return (
    <div className="inputName">
      <Input /> Nom et prémon
    </div>
  );
}

function InputPhoneEmail() {
  const InputPhone = () => {
    return (
      <div className="inputPhone">
        <Input /> Téléphone
      </div>
    );
  };

  const InputEmail = () => {
    return (
      <div className="inputEmail">
        <Input /> Email
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
  return (
    <div className="switchPhoneEmail">
      <Stack direction="row" spacing={5}>
        <Typography>Utiliser un téléphone</Typography>
        <Typography>Utiliser un email</Typography>
      </Stack>
    </div>
  );
}

function BirthdayTitle() {
  return (
    <div className="birthdayTitle">
      <Typography>Date de naissance</Typography>
    </div>
  );
}

function BirthdayText() {
  return (
    <div className="birthdayText">
      <Typography>
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
        <Input /> Mois
      </div>
    );
  };

  const DayInput = () => {
    return (
      <div className="dayInput">
        <Input /> Jour
      </div>
    );
  };

  const YearInput = () => {
    return (
      <div className="yearInput">
        <Input /> Année
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
