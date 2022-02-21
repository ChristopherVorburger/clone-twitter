import React, { useState, useContext, useRef } from "react";
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
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emalValid, setEmalValid] = useState(null);
  const [loginError, setLoginError] = useState(false);

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

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

  // Add Input with Ref
  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleEmailAdress = () => {
    //regex test if email is valid
    let regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email)) {
      setEmalValid(true);
    } else {
      setEmalValid(false);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const cred = await signIn(inputs.current[0].value, inputs.current[1].value);
      navigate("/home");
      setLoginError(false);
    } catch (err) {
      console.log(err);
      setLoginError(true);
    }
  };

  // Connexion with Google
  const provider = new GoogleAuthProvider();

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
                  inputRef={addInputs}
                />
                <TextField
                  type='password'
                  required
                  fullWidth={true}
                  size='medium'
                  id='password'
                  label='Mot de passe'
                  variant='outlined'
                  inputRef={addInputs}
                />
                <ButtonLogin bg='black' color='white' borderColor='black' bold margin='25px 0'>
                  <span>Se connecter</span>
                </ButtonLogin>
              </LoginForm>
              {loginError && <Alert severity='error'>Adresse mail ou mot de passe incorrect</Alert>}
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
              <ButtonLogin borderColor='#dadce0' bg='transparent' bgHover='#F7FAFE' borderColorHover='#d2e3fc' margin='0 0 25px 0' maxWidth='290px'>
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
                <ButtonLogin bg='black' color='white' borderColor='black' margin='25px 0 0' maxWidth='290px' onClick={handleEmailAdress}>
                  <span>Suivant</span>
                </ButtonLogin>
              </LoginForm>
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
