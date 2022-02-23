import React, { useState, useEffect } from "react";
import useStyles from "./Styles";
import CloseButton from "../../components/CloseButton/CloseButton";
import LogoTwitter from "../../components/TwitterLogo/TwitterLogo";
import { Typography, Button, TextField, Box, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { selectMonth } from "./DataSelect";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../../context/authContext";

function SignUp() {
  const classes = useStyles();
  const auth = React.useContext(AuthContext);

  const [newName, setNewName] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newEmailSignup, setNewEmailSignup] = React.useState("");
  const [newPhone, setNewPhone] = React.useState("");
  const [newPasswordSignup, setNewPasswordSignup] = React.useState("");
  const [newMonth, setNewMonth] = React.useState("");
  const [newDay, setNewDay] = React.useState(0);
  const [newYear, setNewYear] = React.useState(0);

  // const [users, setUsers] = useState([]);
  // const usersCollectionRef = collection(db, "users");

  const signupForm = document.querySelector("#signup-form");
  console.log(signupForm);
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;

    // sign up the user & add firestore data
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return db.collection("users").doc(cred.user.uid).set({
          bio: signupForm["signup-bio"].value,
        });
      })
      .then(() => {
        signupForm.reset();
      });
  });

  // const createUser = async () => {
  //   await addDoc(usersCollectionRef, {
  //     name: newName,
  //     email: newEmail,
  //     phone: newPhone,
  //     created_at: serverTimestamp(),
  //   });
  // };
  // const auth = React.useContext(AuthContext);
  // const signUp = (e) => {
  //   e.preventDefault();
  //   auth
  //     .signUp(newEmailSignup, newPasswordSignup)
  //     .then((cred) => {
  //       setNewEmailSignup("");
  //       setNewPasswordSignup("");
  //       console.log("user created : ", cred.user);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getUsers();
  // }, []);

  const [switchPhoneEmail, setSwitchPhoneEmail] = React.useState("Email");
  const [errorName, setErrorName] = React.useState(false);
  const [errorPhone, setErrorPhone] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [passwordIsOk, setPasswordIsOk] = React.useState(false);

  function SwitchPhoneEmail() {
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
  }

  const [month, setMonth] = React.useState("");
  const [day, setDay] = React.useState("");
  const selectDay = [];
  for (let i = 1; i < 32; i++) {
    selectDay.push({ value: `${i}`, label: `${i}` });
  }
  const [year, setYear] = React.useState("");
  const selectYear = [];
  for (let i = 2022; i > 1901; i--) {
    selectYear.push({ value: `${i}`, label: `${i}` });
  }

  function MMDDYYYYInput() {
    return (
      <Stack direction="row" marginTop="15px" spacing={2}>
        <Box width="48%">
          <TextField
            select
            label="Mois"
            required
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              setNewMonth(e.target.value);
            }}
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {selectMonth.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box width="22%">
          <TextField
            select
            label="Jour"
            required
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
              setNewDay(e.target.value);
            }}
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {selectDay.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box width="30%">
          <TextField
            select
            label="Année"
            required
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setNewYear(e.target.value);
            }}
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {selectYear.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Stack>
    );
  }

  return (
    <div className={classes.mainContainer}>
      <Stack
        className={classes.box}
        heigth="100vh"
        width="83%"
        margin="0 auto"
        spacing={2.5}
      >
        <Stack direction="row" alignItems="center">
          <Link to="/">
            <CloseButton />
          </Link>
          <Stack className={classes.logo}>
            <LogoTwitter />
          </Stack>
        </Stack>
        <form id="signup-form">
          <Stack
            className={classes.signupContainer}
            width="100%"
            justifyContent="center"
            spacing={2}
          >
            <Stack spacing={4}>
              <Typography className={classes.accountCreateTitle}>
                Créer votre compte
              </Typography>
              <Stack spacing={4}>
                <Box>
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Nom et prénom"
                    required
                    fullWidth={true}
                    autoFocus={true}
                    onChange={(e) => {
                      e.target.value.length >= 2
                        ? setErrorName(false)
                        : setErrorName(true);
                      setNewName(e.target.value);
                    }}
                    error={errorName}
                    helperText={
                      errorName === true ? "Quel est votre nom ?" : null
                    }
                  />
                </Box>
                {switchPhoneEmail === "Phone" ? (
                  <Box>
                    <TextField
                      id="signup-email"
                      type="text"
                      variant="outlined"
                      label="Email"
                      required
                      fullWidth={true}
                      onChange={(e) => {
                        e.target.value.includes("@") &&
                        e.target.value.includes(".")
                          ? setErrorEmail(false)
                          : setErrorEmail(true);
                        setNewEmail(e.target.value);
                        setNewEmailSignup(e.target.value);
                      }}
                      error={errorEmail}
                      helperText={
                        errorEmail === true
                          ? "Veuillez entrer un email valide."
                          : null
                      }
                    />
                  </Box>
                ) : switchPhoneEmail === "Email" ? (
                  <Box>
                    <TextField
                      type="number"
                      variant="outlined"
                      label="Téléphone"
                      required
                      fullWidth={true}
                      onChange={(e) => {
                        e.target.value.length >= 10
                          ? setErrorPhone(false)
                          : setErrorPhone(true);
                        setNewPhone(e.target.value);
                      }}
                      error={errorPhone}
                      helperText={
                        errorPhone === true
                          ? "Veuillez entrer un numéro de téléphone valide."
                          : null
                      }
                    />
                  </Box>
                ) : null}
              </Stack>
              <SwitchPhoneEmail />
            </Stack>
            <Typography className={classes.birthdayPasswordTitle}>
              Créer votre mot de passe
            </Typography>
            <Box>
              <TextField
                id="signup-password"
                type="password"
                variant="outlined"
                label="Mot de passe"
                required
                fullWidth={true}
                onChange={(e) => {
                  e.target.value.length >= 6
                    ? setPasswordIsOk(false)
                    : setPasswordIsOk(true);
                  setNewPasswordSignup(e.target.value);
                }}
                error={passwordIsOk}
                helperText={
                  passwordIsOk === true
                    ? "Votre mot de passe est trop cour"
                    : null
                }
              />
            </Box>
            <Stack>
              <Typography className={classes.birthdayPasswordTitle}>
                Date de naissance
              </Typography>
              <Typography className={classes.birthdayText}>
                Cette information ne sera pas affichée publiquement. Confirmez
                votre âge, même si ce compte est pour une entreprise, un animal
                de compagnie ou autre chose.
              </Typography>
              <MMDDYYYYInput />
            </Stack>
            <Stack backgroundColor="white">
              {/* <Link to={"/home"}> */}
              <Button type="submit" className={classes.nextButton} size="large">
                Suivant
              </Button>
              {/* </Link> */}
            </Stack>
          </Stack>
        </form>
      </Stack>
    </div>
  );
}

export default SignUp;
