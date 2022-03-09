// Tous les import que j'ai besoin
import React from "react";
import useStyles from "./Styles";
import CloseButton from "../../components/CloseButton/CloseButton";
import LogoTwitter from "../../components/TwitterLogo/TwitterLogo";
import { selectMonth } from "./DataSelect";
import { Box, Button, MenuItem, Typography, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthContext } from "../../context/authContext";

// Firestore
const database = getFirestore();

// Fonction principale SignUp
function SignUp() {
  // Const générales
  const classes = useStyles();
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  // State authentification
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState(false);

  // State firestore
  const [name, setName] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [errorName, setErrorName] = React.useState(false);
  const [errorUserName, setErrorUserName] = React.useState(false);
  const [phone, setPhone] = React.useState(0);

  // Fonction qui crée un user dans l'authentification et le firestore
  const signUp = (e) => {
    e.preventDefault();
    setErrorName(false);
    setErrorUserName(false);

    if (name === "" || name.lenght > 100) {
      setErrorName(true);
    } else if (username === "" || username.length > 100) {
      setErrorUserName(true);
    } else {
      auth
        .signUp(email, password)
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
          })
            .then(() => {
              navigate("/home");
              setName("");
              setUserName("");
              navigate("/home");
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err.message);
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
              <MenuItem
                data-testid="selectMonth"
                key={item.value}
                value={item.value}
              >
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
            {/* Remplissage du select Année */}
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

  return (
    <Box className={classes.background}>
      <Box className={classes.modal}>
        {/* Le logo et le boutton close */}
        <Box className={classes.closeAndLogo}>
          <Box className={classes.close}>
            <Link to="/">
              <CloseButton data-testid="closeButton" />
            </Link>
          </Box>
          <Box className={classes.logo} data-testid="logoTwitter">
            <LogoTwitter />
          </Box>
        </Box>
        <form
          action="submit"
          className={classes.form}
          data-testid="formSubmit"
          onSubmit={signUp}
        >
          <Typography className={classes.accountCreateTitle}>
            Créer votre compte
          </Typography>
          <Box>
            {/* Input des Nom et Prénom */}
            <Box className={classes.allInput}>
              <TextField
                className={classes.allInput}
                autoFocus={true}
                error={errorName}
                fullWidth={true}
                helperText={errorName === true ? "Quel est votre nom ?" : null}
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
                error={errorUserName}
                fullWidth={true}
                helperText={
                  errorUserName === true
                    ? "Choisissez un nom d'utilisateur."
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
              passwordConfirmation ? "Votre mot de passe est trop cours" : null
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
          <Box>
            <Button
              className={classes.nextButton}
              data-testid="nextButton"
              size="large"
              type="submit"
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
