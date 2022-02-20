import React, { useState, useContext, useRef, useEffect } from "react";
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
import { AuthContext } from "../../context/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emalValid, setEmalValid] = useState(null);
  const { signIn } = useContext(AuthContext);

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

  const handleSubmit = () => {
    //regex test if email is valid
    let regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email)) {
      setEmalValid(true);
    } else {
      setEmalValid(false);
    }
  };

  //Handle Login
  const handleForm = async () => {
    console.log("ok");
  };

  // const handleFormValidation
  return (
    <Overlay>
      <LoginModalContainer>
        {emalValid ? (
          <LoginModal>
            <Link to='/' style={{ color: "#000" }}>
              <CloseIcon className={classes.iconCross} />
            </Link>
            <IconTwitter src={LogoTwitter} />
            <LoginTitle center>Entrez votre mot de passe</LoginTitle>
            <LoginContent>
              <LoginForm onSubmit={handleForm}>
                <TextField
                  type='email'
                  required
                  fullWidth={true}
                  size='medium'
                  id='email'
                  label='Adresse mail'
                  variant='outlined'
                  style={{ marginBottom: "30px" }}
                  value={email}
                  disabled={true}
                />
                <TextField type='password' required fullWidth={true} size='medium' id='password' label='Mot de passe' variant='outlined' />
                <ButtonLogin bg='black' color='white' borderColor='black' bold mb='25px' mt='25px'>
                  <span>Se connecter</span>
                </ButtonLogin>
              </LoginForm>

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
                <TextField
                  error={emalValid === false ? true : false}
                  helperText={emalValid === false ? "Veuillez entrer un email valide." : ""}
                  type='email'
                  required
                  fullWidth={true}
                  size='medium'
                  id='outlined-basic'
                  label='Adresse mail'
                  variant='outlined'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </LoginForm>
              <ButtonLogin bg='black' color='white' borderColor='black' bold mb='25px' maxWidth='290px' onClick={handleSubmit}>
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
