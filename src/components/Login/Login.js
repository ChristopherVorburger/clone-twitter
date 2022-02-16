import React from "react";
import {
  Overlay,
  LoginModalContainer,
  LoginModal,
  IconTwitter,
  LoginTitle,
  LoginContent,
  ButtonLogin,
  Line,
<<<<<<< HEAD
=======
  LoginForm,
>>>>>>> eae4aa601a344d25a93ce2edf4eab6cbdb806849
  TxtCreateAcount,
} from "./Login.Style";
import LogoTwitter from "./img/logo-twitter.png";
import LogoGoogle from "./img/logo-google.png";
import LogoApple from "./img/logo-apple.png";
import { TextField } from "@mui/material";
<<<<<<< HEAD
import { makeStyles } from "@mui/styles";

export default function Login() {
  const useStyles = makeStyles(() => ({
    input: {
      maxWidth: "290px!important",
      width: "100%",
      marginBottom: "25px!important",
=======
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

export default function Login() {
  //Style cross Icon
  const useStyles = makeStyles(() => ({
    iconCross: {
      position: "absolute",
      left: "20px",
      top: "20px",
      cursor: "pointer",
>>>>>>> eae4aa601a344d25a93ce2edf4eab6cbdb806849
    },
  }));

  const classes = useStyles();

<<<<<<< HEAD
=======
  //Handle Form Login
  const handleForm = (e) => {
    e.preventDefault();
  };

>>>>>>> eae4aa601a344d25a93ce2edf4eab6cbdb806849
  return (
    <Overlay>
      <LoginModalContainer>
        <LoginModal>
<<<<<<< HEAD
          <div>
            <IconTwitter src={LogoTwitter} />
          </div>
          <LoginTitle>Connectez-vous à Twitter</LoginTitle>

          <ButtonLogin borderColor='#dadce0' bg='transparent' mb='25px'>
            <img src={LogoGoogle} alt='logo de google' />
            <span>Se connecter avec Google</span>
          </ButtonLogin>
          <ButtonLogin bg='transparent' borderColor='#dadce0'>
            <img src={LogoApple} alt="logo d'apple" />
            <span>Se connecter avec Apple</span>
          </ButtonLogin>
          <Line>ou</Line>
          <TextField size='medium' id='outlined-basic' label='Adresse mail' variant='outlined' className={classes.input} />
          <ButtonLogin bg='black' color='white' borderColor='black' bold mb='25px'>
            <span>Suivant</span>
          </ButtonLogin>
          <ButtonLogin bg='#fff' color='#000' borderColor='#dadce0'>
            <span>Mot de passe oublié ?</span>
          </ButtonLogin>
          <TxtCreateAcount>
            Vous n'avez pas de compte ?<a href='/'>Inscrivez-vous</a>
          </TxtCreateAcount>
=======
          <CloseIcon className={classes.iconCross} />
          <IconTwitter src={LogoTwitter} />
          <LoginTitle>Connectez-vous à Twitter</LoginTitle>
          <LoginContent>
            <ButtonLogin borderColor='#dadce0' bg='transparent' bgHover='#F7FAFE' borderColorHover='#d2e3fc' mb='25px'>
              <img src={LogoGoogle} alt='logo de google' />
              <span>Se connecter avec Google</span>
            </ButtonLogin>
            <ButtonLogin bg='transparent' bgHover='#E6E6E6' borderColor='#dadce0'>
              <img src={LogoApple} alt="logo d'apple" />
              <span>Se connecter avec Apple</span>
            </ButtonLogin>
            <Line>ou</Line>
            <LoginForm onSubmit={handleForm}>
              <TextField fullWidth={true} size='medium' id='outlined-basic' label='Adresse mail' variant='outlined' />
            </LoginForm>
            <ButtonLogin bg='black' color='white' borderColor='black' bold mb='25px' onClick={handleForm}>
              <span>Suivant</span>
            </ButtonLogin>
            <ButtonLogin bg='#fff' color='#000' borderColor='#dadce0'>
              <span>Mot de passe oublié ?</span>
            </ButtonLogin>
            <TxtCreateAcount>
              Vous n'avez pas de compte ?<a href='/'>Inscrivez-vous</a>
            </TxtCreateAcount>
          </LoginContent>
>>>>>>> eae4aa601a344d25a93ce2edf4eab6cbdb806849
        </LoginModal>
      </LoginModalContainer>
    </Overlay>
  );
}
