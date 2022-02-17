import React, { useState } from "react";
import {
  Overlay,
  LoginModalContainer,
  LoginModal,
  IconTwitter,
  LoginTitle,
  LoginContent,
  ButtonLogin,
  Line,
  LoginForm,
  TxtCreateAcount,
} from "./Login.Style";
import LogoTwitter from "./img/logo-twitter.png";
import LogoGoogle from "./img/logo-google.png";
import LogoApple from "./img/logo-apple.png";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

export default function Login() {
  const [emailValid, setEmailValid] = useState(false);

  //Style cross Icon
  const useStyles = makeStyles(() => ({
    iconCross: {
      position: "absolute",
      left: "20px",
      top: "20px",
      cursor: "pointer",
    },
  }));

  const classes = useStyles();

  return (
    <Overlay>
      <LoginModalContainer>
        {emailValid ? (
          <LoginModal>
            <Link to='/' style={{ color: "#000" }}>
              <CloseIcon className={classes.iconCross} />
            </Link>
            <IconTwitter src={LogoTwitter} />
            <LoginTitle center>Entrez votre mot de passe</LoginTitle>
            <LoginContent>
              <LoginForm>
                <TextField
                  type='email'
                  required
                  fullWidth={true}
                  size='medium'
                  id='email'
                  label='Adresse mail'
                  variant='outlined'
                  style={{ marginBottom: "30px" }}
                />
                <TextField type='password' required fullWidth={true} size='medium' id='password' label='Mot de passe' variant='outlined' />
              </LoginForm>
              <ButtonLogin bg='black' color='white' borderColor='black' bold mb='25px'>
                <span>Se connecter</span>
              </ButtonLogin>

              <TxtCreateAcount>
                Vous n'avez pas de compte ?<Link to='/signup'>Inscrivez-vous </Link>
              </TxtCreateAcount>
            </LoginContent>
          </LoginModal>
        ) : (
          <LoginModal>
            <Link to='/' style={{ color: "#000" }}>
              <CloseIcon className={classes.iconCross} />
            </Link>
            <IconTwitter src={LogoTwitter} />
            <LoginTitle>Connectez-vous à Twitter</LoginTitle>
            <LoginContent>
              <ButtonLogin borderColor='#dadce0' bg='transparent' bgHover='#F7FAFE' borderColorHover='#d2e3fc' mb='25px' maxWidth='290px'>
                <img src={LogoGoogle} alt='logo de google' />
                <span>Se connecter avec Google</span>
              </ButtonLogin>
              <ButtonLogin bg='transparent' bgHover='#E6E6E6' borderColor='#dadce0' maxWidth='290px'>
                <img src={LogoApple} alt="logo d'apple" />
                <span>Se connecter avec Apple</span>
              </ButtonLogin>
              <Line>ou</Line>
              <LoginForm maxWidth='290px'>
                <TextField type='email' required fullWidth={true} size='medium' id='outlined-basic' label='Adresse mail' variant='outlined' />
              </LoginForm>
              <ButtonLogin onClick={() => setEmailValid(true)} bg='black' color='white' borderColor='black' bold mb='25px' maxWidth='290px'>
                <span>Suivant</span>
              </ButtonLogin>
              <ButtonLogin bg='#fff' color='#000' borderColor='#dadce0' maxWidth='290px'>
                <span>Mot de passe oublié ?</span>
              </ButtonLogin>
              <TxtCreateAcount>
                Vous n'avez pas de compte ?<Link to='/signup'>Inscrivez-vous </Link>
              </TxtCreateAcount>
            </LoginContent>
          </LoginModal>
        )}
      </LoginModalContainer>
    </Overlay>
  );
}
