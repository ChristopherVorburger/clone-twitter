// Tous les import que j'ai besoin
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// MUI
import { Box, Button, MenuItem, Typography, TextField } from "@mui/material";

// Components
import CloseButton from "../../components/CloseButton/CloseButton";
import LogoTwitter from "../../components/TwitterLogo/TwitterLogo";

import { selectMonth } from "./DataSelect";

// Firebase
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database } from "../../firebase-config";

// Contexts
import { useAuth } from "../../context/authContext";
import { useGlobal } from "../../context/globalContext";

import useStyles from "./Styles";

// Fonction principale SignUp
function SignUp() {
  // Hooks
  const classes = useStyles();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { dispatchSnackbar, setLoading } = useGlobal();

  // State authentification
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState(false);

  // State firestore
  const [name, setName] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [errorName, setErrorName] = React.useState(false);
  const [errorUserName, setErrorUserName] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [disableButton, setDisableButton] = React.useState(false);

  // Fonction qui crée un user dans l'authentification et le firestore
  const signUpUser = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorName(false);
    setErrorUserName(false);

    if (name === "" || name.lenght > 100) {
      setErrorName(true);
    } else if (username === "" || username.length > 100) {
      setErrorUserName(true);
    } else {
      signUp(email, password)
        .then((cred) => {
          setEmail("");
          setPassword("");
          const userRef = doc(database, "users", cred.user.uid);
          setDoc(userRef, {
            name,
            username,
            created_at: serverTimestamp(),
            phone,
            age: {
              month,
              day,
              year,
            },
            description: "",
            location: "",
            website: "",
            followers: [],
            following: [],
            profile_image_url: "",
            cover_url: "",
            bookmarks: [],
            lists: [],
            pinned_lists: [],
          })
            .then(() => {
              setName("");
              setUserName("");
              navigate("/home");
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              dispatchSnackbar({
                type: "OPEN_ERROR_SNACKBAR",
                payload: {
                  message: `An error occurred while signin up ${err.message}`,
                },
              });
            });
        })
        .catch((err) => {
          setLoading(false);
          dispatchSnackbar({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred while signin up ${err.message}`,
            },
          });
        });
    }
  };

  // Fonction qui réalise le switch entre phone et email lors du click
  const [switchPhoneEmail, setSwitchPhoneEmail] = React.useState("Phone");

  const SwitchPhoneEmail = () => {
    let switchRender;

    if (switchPhoneEmail === "Phone") {
      switchRender = (
        <Typography
          className={classes.switchPhoneEmail}
          onClick={() => setSwitchPhoneEmail("Email")}
          width={140}
        >
          Utiliser un téléphone
        </Typography>
      );
    } else if (switchPhoneEmail === "Email") {
      switchRender = (
        <Typography
          className={classes.switchPhoneEmail}
          onClick={() => setSwitchPhoneEmail("Phone")}
          width={110}
        >
          Utiliser un email
        </Typography>
      );
    }
    return <>{switchRender}</>;
  };

  // State et boucle qui gèrent les select de la date de naissance
  const [month, setMonth] = React.useState("");
  const [day, setDay] = React.useState("");
  const [year, setYear] = React.useState("");

  const selectDay = [];
  for (let i = 1; i < 32; i++) {
    selectDay.push({ value: `${i}`, label: `${i}` });
  }
  const selectYear = [];
  for (let i = 2022; i > 1901; i--) {
    selectYear.push({ value: `${i}`, label: `${i}` });
  }

  // Fonction qui gère les 3 selects de la date de naissance
  const MMDDYYYYInput = () => {
    return (
      <Box className={classes.birthdayContainer}>
        {/* Partie mois */}
        <Box width="48%">
          <TextField
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            label="Mois"
            onChange={(e) => setMonth(e.target.value)}
            required
            select
            value={month}
          >
            {/* Remplissage du select Mois */}
            {selectMonth.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {/* Partie Jour */}
        <Box width="22%">
          <TextField
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            label="Jour"
            onChange={(e) => setDay(e.target.value)}
            required
            select
            value={day}
          >
            {/* Remplissage du select Jour */}
            {selectDay.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {/* Partie Année */}
        <Box width="30%">
          <TextField
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            label="Année"
            onChange={(e) => setYear(e.target.value)}
            required
            select
            value={year}
          >
            {/* Remplissage du select Jour */}
            {selectYear.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    );
  };

  React.useEffect(() => {
    setDisableButton(false);
    if (username?.includes(" ") === true) {
      setDisableButton(true);
    } else if (username.length > 30) {
      setDisableButton(true);
    } else if (name.length > 30) {
      setDisableButton(true);
    }
  }, [username, name]);

  return (
    <Box className={classes.background}>
      <Box className={classes.modal}>
        {/* Le logo et le boutton close */}
        <Box className={classes.closeAndLogo}>
          <Box className={classes.close}>
            <Link to="/">
              <CloseButton />
            </Link>
          </Box>
          <Box className={classes.logo}>
            <LogoTwitter />
          </Box>
        </Box>
        <form className={classes.form} action="submit" onSubmit={signUpUser}>
          <Typography className={classes.accountCreateTitle}>
            Créer votre compte
          </Typography>
          <Box>
            {/* Input des Nom et Prénom */}
            <Box className={classes.allInput}>
              <TextField
                className={classes.allInput}
                autoFocus={true}
                error={errorName ? null : name.length > 30}
                fullWidth={true}
                helperText={
                  errorName === true
                    ? "Quel est votre nom ?"
                    : name.length > 30
                    ? "Vous êtes limité à 30 caractères"
                    : null
                }
                label="Nom et Prénom"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </Box>
            {/* Input UserName */}
            <Box className={classes.allInput}>
              <TextField
                error={
                  errorUserName
                    ? null
                    : username?.includes(" ") || username.length > 30
                }
                fullWidth={true}
                helperText={
                  username?.includes(" ") === true
                    ? "Vous ne pouvez pas mettre d'espaces dans votre nom d'utilisateur."
                    : username.length > 30
                    ? "Vous êtes limité à 30 caractères"
                    : null
                }
                label="Nom d'utilisateur"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                required
              />
            </Box>
            {/* Ternaire qui gère l'affichage entre input phone et email */}
            {switchPhoneEmail === "Email" ? (
              // Input Phone
              <Box className={classes.allInput}>
                <TextField
                  fullWidth={true}
                  label="Phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  type="number"
                />
              </Box>
            ) : switchPhoneEmail === "Phone" ? (
              // Input Email
              <Box className={classes.allInput}>
                <TextField
                  fullWidth={true}
                  label="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  type="email"
                />
              </Box>
            ) : null}
          </Box>
          <SwitchPhoneEmail />
          <Typography className={classes.birthdayPasswordTitle}>
            Créer votre mot de passe
          </Typography>
          {/* Input Password */}
          <TextField
            error={passwordConfirmation}
            fullWidth={true}
            helperText={
              passwordConfirmation ? "Votre mot de passe est trop court" : null
            }
            label="Mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordConfirmation(e.target.value);
              e.target.value.length >= 6
                ? setPasswordConfirmation(false)
                : setPasswordConfirmation(true);
            }}
            required
            type="password"
          />
          {/* Partie date de naissanse */}
          <Box className={classes.birthday}>
            <Typography className={classes.birthdayPasswordTitle}>
              Date de naissance
            </Typography>
            <Typography className={classes.birthdayText}>
              Cette information ne sera pas affichée publiquement. Confirmez
              votre âge, même si ce compte est pour une entreprise, un animal de
              compagnie ou autre chose.
            </Typography>
            <MMDDYYYYInput />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              className={classes.nextButton}
              variant="outlined"
              disabled={disableButton}
              type="submit"
              size="large"
              sx={{
                textTransform: "none",
                borderRadius: "50px",
                fontWeight: "bold",
                width: "50%",
              }}
            >
              Suivant
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default SignUp;
