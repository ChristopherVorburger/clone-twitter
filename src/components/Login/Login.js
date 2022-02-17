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

  //Handle Form Login
  const handleForm = (e) => {
    e.preventDefault();
  };

  return (
    <Overlay>
      <LoginModalContainer>
        <LoginModal>
          <Link to='/'>
            <CloseIcon className={classes.iconCross} />
          </Link>
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
              Vous n'avez pas de compte ?<Link to='/signup'>Inscrivez-vous </Link>
            </TxtCreateAcount>
          </LoginContent>
        </LoginModal>
      </LoginModalContainer>
    </Overlay>
  );
}
